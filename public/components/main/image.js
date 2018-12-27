import React from "react";
import {
  EuiFlexItem,
  EuiImage,
} from "@elastic/eui";

export class Image extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { img } = this.props;

    return (
      <EuiFlexItem grow={false}>
        <EuiImage
          size="m"
          hasShadow
          caption={img.caption}
          alt={img.caption}
          allowFullScreen
          url={img.imgUrl}
        />
      </EuiFlexItem>
    );
  }
};
