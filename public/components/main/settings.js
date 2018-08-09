import React from "react";
import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiSelect,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui";

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indices: this.props.indices
    }
  }

  componentDidMount() {
    const { httpClient } = this.props;

    httpClient.get("../api/shop_preview/indices").then((resp) => {
      const indices = this.getOptions(resp.data.indices);
      this.setState({ indices });
    });
  }

  getOptions(indices) {
    return _.map(indices, ind => ({ value: ind, text: ind }));
  }
  onChange = e => {
    this.setState({
      indexValue: e.target.value,
    }, () => this.updateFields());
    console.log('index changed. ');
  };

  onFieldChange = e => {
    this.setState({
      fieldValue: e.target.value,
    }, () => this.updatePreview());
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

  updatePreview() {
    const { httpClient } = this.props;
    const { indexValue, fieldValue } = this.state;
    httpClient.get(`../api/shop_preview/${indexValue}/${fieldValue}/preview`).then((resp) => {
      const preview = resp.data.preview;
      this.setState({ refUrl: preview, preview });
    });
  }

  updatePrefix() {
    const { prefixValue } = this.state;
    const preview = prefixValue + this.state.refUrl;
    this.setState({ preview });
  }

  loadGallery() {
    const { httpClient, setImages } = this.props;
    const { indexValue, fieldValue, prefixValue } = this.state;
    httpClient.get(`../api/shop_preview/${indexValue}/${fieldValue}/search`).then((resp) => {
      let images = resp.data.images;
      if (prefixValue) {
        images = _.map(resp.data.images, (img) => {
          return Object.assign(img, { imgUrl: `${prefixValue}${img.imgUrl}` });
        });
      }
      setImages(images);
    });
  }
  render() {
    return (
      <EuiForm>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow
                    label="Indices"
                    helpText="Select your index to display."
                    fullWidth
                  >
                    <EuiSelect
                      options={this.state.indices}
                      value={this.state.indexValue}
                      onChange={this.onChange}
                      fullWidth
                      aria-label="Use aria labels when no actual label is in use"
                    />
                  </EuiFormRow>
                </EuiFlexItem>

                <EuiFlexItem>
                  <EuiFormRow
                    label="Fields"
                    helpText="Select the image field."
                    fullWidth
                  >
                    <EuiSelect
                      options={this.state.fields}
                      value={this.state.fieldValue}
                      onChange={this.onFieldChange}
                      fullWidth
                      aria-label="Use aria labels when no actual label is in use"
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFormRow>

            <EuiFormRow>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow
                    label="Prefix"
                    helpText="URL prefix of the images."
                  >
                    <EuiFieldText
                      name="prefix"
                      onChange={this.onPrefixChange}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow
                    label="Preview"
                    fullWidth
                  >
                    <EuiFieldText
                      placeholder="http://example.com/images/0001.png"
                      value={this.state.preview}
                      readOnly
                      fullWidth
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFormRow>

            <EuiFormRow>
              <EuiButton
                onClick={() => this.loadGallery()}
              >
                Save
              </EuiButton>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiForm>
    );
  }
};
