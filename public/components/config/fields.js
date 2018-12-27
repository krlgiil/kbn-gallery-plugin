import React from "react";
import _ from "lodash";
import {
  EuiFormRow,
  EuiSelect,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui";
import Constants from '../../constants';

export class Fields extends React.Component {
  constructor(props) {
    super(props);
    const { fields, indexValue, imageField, captionField } = this.props;
    console.log(imageField, captionField);
    this.state = {
      fields,
      indexValue,
      imageField,
      captionField,
    }
  }

  componentDidMount() {
    const { httpClient } = this.props;
    const { indexValue } = this.state;
    console.log('component did mount');
    if (indexValue) {
      httpClient.get(`../api/shop_preview/${indexValue}/fields`).then((resp) => {
        const fields = this.getOptions(resp.data.fields);
        this.setState({ fields });
      });
    }
  }

  getOptions(indices) {
    return _.map(indices, ind => ({ value: ind, text: ind }));
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('component did update');
    if (prevState.imageField !== this.props.imageField) {
      const { imageField } = this.props;
      this.setState({ ...this.state, imageField })
    }
    if (prevState.captionField !== this.props.captionField) {
      const { captionField } = this.props;
      this.setState({ ...this.state, captionField })
    }
  }

  render() {
    return (
      <EuiFormRow>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow
              label="Image Field"
              helpText="Select the image field."
              fullWidth
            >
              <EuiSelect
                options={this.state.fields}
                value={this.state.imageField}
                onChange={this.props.onImageFieldChange}
                fullWidth
                aria-label="Use aria labels when no actual label is in use"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow
              label="Caption Field"
              helpText="Select the caption field."
              fullWidth
            >
              <EuiSelect
                options={this.state.fields}
                value={this.state.captionField}
                onChange={this.props.onCaptionFieldChange}
                fullWidth
                aria-label="Use aria labels when no actual label is in use"
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFormRow>
    );
  }
};
