import React from "react";
import {
  EuiFlexItem,
  EuiImage,
  EuiCard
} from "@elastic/eui";

export class Image extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { img } = this.props;

    return (
      <EuiFlexItem>
        <EuiImage
          size="m"
          hasShadow
          caption=""
          alt=""
          allowFullScreen
          url={img.imgUrl}
        />
      </EuiFlexItem>
    );
  }
};
