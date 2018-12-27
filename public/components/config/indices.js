import React from "react";
import {
  EuiFormRow,
  EuiSelect,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui";

export class Indices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indices: this.props.indices,
      indexValue: this.props.indexValue
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

  render() {
    return (
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
                onChange={this.props.onChange}
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
