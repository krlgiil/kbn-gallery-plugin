import React from "react";
import {
  EuiForm,
  EuiFormRow,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui";
import Constants from '../../constants';
import { Fields } from '../config/fields';
import { Indices } from '../config/indices';
import { Preview } from '../config/preview';

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indices: this.props.indices,
      indexValue: Constants.index,
      prefixValue: Constants.prefix,
      imageField: Constants.imgField,
      captionField: Constants.captionField,
    }
  }

  onChange = e => {
    this.setState({
      indexValue: e.target.value,
    }, () => this.updateFields());
    console.log('index changed. ');
  };

  onImageFieldChange = e => {
    this.setState({
      imageField: e.target.value,
    }, () => {
      console.log(this.state);
      return this.updatePreview();
    });
    console.log('field changed.');
  };

  onCaptionFieldChange = e => {
    this.setState({
      captionField: e.target.value,
    });
    console.log('field changed.');
  };

  onPrefixChange = e => {
    this.setState({
      prefixValue: e.target.value,
    }, () => this.updatePrefix());
    console.log('prefix changed.');
  };

  updateFields() {
    const { httpClient } = this.props;
    const { indexValue } = this.state;
    httpClient.get(`../api/shop_preview/${indexValue}/fields`).then((resp) => {
      const fields = this.getOptions(resp.data.fields);
      this.setState({ fields });
    });
  }

  /**
   * Update the preview of the image URL value
   */
  updatePreview() {
    const { httpClient } = this.props;
    const { indexValue, imageField } = this.state;
    httpClient.get(`../api/shop_preview/${indexValue}/${imageField}/preview`).then((resp) => {
      const preview = resp.data.preview;
      this.setState({ refUrl: preview, preview });
    });
  }

  /**
   * Update the prefix of the image URL
   */
  updatePrefix() {
    const { prefixValue } = this.state;
    const preview = prefixValue + this.state.refUrl;
    this.setState({ preview });
  }

  /**
   * Set the images to display in the gallery
   */
  loadGallery() {
    const { httpClient, setImages } = this.props;
    const { indexValue, imageField, prefixValue = '' } = this.state;
    httpClient.get(`../api/shop_preview/${indexValue}/${imageField}/search`).then((resp) => {
      let images = resp.data.images;
      if (prefixValue) {
        images = this.updatePrefix(resp.data.images, prefixValue);
      }
      setImages(images);
    });
  }

  updatePrefix(images, prefix) {
    return _.map(images, (img) => Object.assign(img, { imgUrl: `${prefix}${img.imgUrl}` }));
  }

  render() {
    return (
      <EuiForm>
        <EuiFlexGroup style={{ maxWidth: 600 }}>
          <EuiFlexItem>
            <Indices httpClient={this.props.httpClient}
              indexValue={this.state.indexValue}
              onChange={this.onChange} />
            <Fields httpClient={this.props.httpClient}
              fields={this.state.fields}
              indexValue={this.state.indexValue}
              imageField={this.state.imageField}
              onImageFieldChange={this.onImageFieldChange}
              captionField={this.state.captionField}
              onCaptionFieldChange={this.onCaptionFieldChange} />
            <Preview httpClient={this.props.httpClient}
              indexValue={this.state.indexValue}
              imageField={this.state.imageField}
              preview={this.state.preview}
              onPrefixChange={this.onPrefixChange} />
            <EuiFormRow>
              <EuiButton
                onClick={() => this.loadGallery()}
              >
                Display
              </EuiButton>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiForm>
    );
  }
};
