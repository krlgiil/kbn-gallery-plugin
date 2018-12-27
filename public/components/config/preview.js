import React from "react";
import {
  EuiFormRow,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui";
import Constants from "../../constants";

export class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: this.props.preview
    }
  }

  componentDidMount() {
    const { httpClient, indexValue, imageField } = this.props;
    httpClient.get(`../api/shop_preview/${indexValue}/${imageField}/preview`).then((resp) => {
      const preview = resp.data.preview;
      this.setState({ refUrl: preview, preview: `${Constants.prefix}${preview}` });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.preview !== this.props.preview) {
      this.setState({ preview: this.props.preview })
    }
  }

  render() {
    return (
      <EuiFormRow>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow
              label="Prefix"
              helpText="URL prefix of the images."
            >
              <EuiFieldText
                name="prefix"
                onChange={this.props.onPrefixChange}
                defaultValue={Constants.prefix}
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
                value={this.state.preview || ''}
                readOnly
                fullWidth
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFormRow>
    );
  }
};
