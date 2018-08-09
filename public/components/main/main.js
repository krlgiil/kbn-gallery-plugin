import React, { Fragment } from "react";
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui";
import { Image } from "./image";
import { Settings } from "./settings";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setImages(images) {
    this.setState({ images });
  }

  render() {
    const { title, httpClient } = this.props;

    return (
      <EuiPage>
        <EuiPageHeader>
          <EuiTitle size="l">
            <h1>{title}</h1>
          </EuiTitle>
        </EuiPageHeader>
        <EuiPageBody>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>Configuration</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <Settings
                httpClient={httpClient}
                setImages={this.setImages.bind(this)}
              />
              <EuiSpacer size="m" />
              <EuiTitle>
                <h2>Gallery</h2>
              </EuiTitle>
              <EuiFlexGroup
                justifyContent="spaceBetween"
                alignItems="flexEnd"
                responsive={true}
                wrap={true}
              >
                {!_.isEmpty(this.state.images) ? _.map(this.state.images, img => {
                  return (
                    <EuiFlexItem key={img.id} grow={false}>
                      <Image img={img} />
                    </EuiFlexItem>
                  );
                }) : 'No images.'}
              </EuiFlexGroup>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
};
