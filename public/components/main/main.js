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
  EuiFlexGrid,
  EuiPopover,
  EuiButton,
  EuiCallOut
} from "@elastic/eui";
import { Image } from "./image";
import { Settings } from "./settings";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false,
    };
  }

  setImages(images) {
    this.setState({ images });
  }

  onButtonClick = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  }

  render() {
    const { title, httpClient } = this.props;

    const button = (
      <EuiButton
        iconSide="right"
        fill
        iconType="arrowDown"
        onClick={this.onButtonClick}
      >
        Settings
      </EuiButton>
    );

    const settings = (
      <Settings
        httpClient={httpClient}
        setImages={this.setImages.bind(this)}
      />
    );

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
              <EuiPopover
                id="formPopover"
                ownFocus
                button={button}
                isOpen={this.state.isPopoverOpen}
                closePopover={this.closePopover.bind(this)}
              >
                <div style={{ width: '420px' }}>
                  {settings}
                </div>
              </EuiPopover>
            </EuiPageContentHeader>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>Gallery</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiSpacer size="m" />
            <EuiPageContentBody>
              {
                _.isEmpty(this.state.images) ?
                  <EuiCallOut
                    title="No images to display."
                    iconType="faceSad"
                  /> :
                  <EuiFlexGroup
                    justifyContent="spaceBetween"
                    alignItems="flexEnd"
                    responsive={true}
                    wrap={true}
                  >
                    <EuiFlexGrid columns={4}>
                      {_.map(this.state.images, img => {
                        return (
                          <Image key={img.id} img={img} />
                        );
                      })}
                    </EuiFlexGrid>
                  </EuiFlexGroup>
              }
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
};
