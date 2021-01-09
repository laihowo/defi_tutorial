import React from "react";

import axios from "axios";

import routes from "../js/routes";

import configData from "../config.json";

import {
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
  Icon,
  Tab,
  Tabs,
  Row,
  Col,
  Button,
} from "framework7-react";

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      // Framework7 Parameters
      f7params: {
        name: "My App", // App name
        theme: "auto", // Automatic theme detection

        // App routes
        routes: routes,
      },
    };
  }

  render() {
    return (
      <App params={this.state.f7params}>
        {/* Left panel with cover effect when hidden */}
        <Panel left reveal themeDark>
          <View>
            <Page>
              <Navbar title="UI" />

              <List>
                <ListItem link="/" view=".view-main" panelClose title="Staking">
                  <Icon slot="media" material="videocam"></Icon>
                </ListItem>
                <ListItem link="#" title="User Name">
                  <Icon slot="media" material="person"></Icon>
                </ListItem>
                <ListItem link="#" title="Recordings">
                  <Icon slot="media" material="slideshow"></Icon>
                </ListItem>
              </List>
            </Page>
          </View>
        </Panel>

        {/* Right panel with reveal effect*/}
        <Panel right cover>
          <View>
            <Page>
              <Navbar title="">
                <Block>
                  <Row>
                    <Col>
                      <Button fill raised panelClose>
                        X
                      </Button>
                    </Col>
                  </Row>
                </Block>
              </Navbar>
            </Page>
          </View>
        </Panel>

        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />
      </App>
    );
  }
}
