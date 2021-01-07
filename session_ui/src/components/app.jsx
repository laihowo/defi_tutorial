import React from "react";

import axios from "axios";

import routes from "../js/routes";

import configData from "../config.json";

import Itabs from "../pages/itabs";

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
      newSession: [], // Array of the new sessions created after the initialisation.
      inputSessionName: "", // The name of the new session inputted by the user.
      inputStart: "", // The start date and time of the new session inputted by the user.
    };

    this.handleClick = this.handleClick.bind(this); // POST request for creating a new session after the user clicks the create button in the form.
    this.handleChange = this.handleChange.bind(this); // Store the input value of the new session name to the state.
    this.handleCallback = this.handleCallback.bind(this); // Store the start date and time of the new session to the state.
  }

  handleClick() {
    var inputValue = this.state.inputSessionName;
    var startValue = new Date().toISOString();
    // console.log(startValue);

    if (inputValue.length >= 5) {
      axios
        .post(configData.serverURL + "create", {
          details: {
            name: inputValue,
            start: startValue,
            end: "2",
            description: "Default.",
          },
          settings: {
            attendee: "participant",
          },
          module: "d161cdfc-4a55-49f1-95ff-09b7ce3053d8",
        })
        .then((response) => {
          var details = response.data.details;
          // alert(details.end)

          this.setState({
            newSession: this.state.newSession.concat({
              ID: response.data.id,
              name: details.name,
              start: details.start,
            }),
          });
        })
        .catch((error) => {
          console.log(error);
        });

      this.setState({ inputSessionName: "" });
    } else {
      alert("Please enter the session name with at least 5 characters.");
    }
  }

  handleChange(event) {
    this.setState({ inputSessionName: event.target.value });
  }

  handleCallback(startData) {
    this.setState({ inputStart: startData });
  }

  render() {
    this.state.f7params.routes[0].newSession = this.state.newSession;

    return (
      <App params={this.state.f7params}>
        {/* Left panel with cover effect when hidden */}
        <Panel left reveal themeDark>
          <View>
            <Page>
              <Navbar title="Session Collaborate UI" />

              <List>
                <ListItem link="#" title="User Name">
                  <Icon slot="media" material="person"></Icon>
                </ListItem>
                <ListItem
                  link="/"
                  view=".view-main"
                  panelClose
                  title="Sessions"
                >
                  <Icon slot="media" material="videocam"></Icon>
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

              <List noHairlines>
                <ListInput
                  outline
                  type="text"
                  value={this.state.inputSessionName}
                  onChange={this.handleChange}
                  placeholder="New Session"
                  clearButton
                  minlength="5"
                  required
                ></ListInput>
              </List>

              <Itabs appCallback={this.handleCallback}></Itabs>

              <Block>
                <Row>
                  <Col>
                    <Button fill raised panelClose>
                      Cancel
                    </Button>
                  </Col>

                  <Col>
                    <Button fill raised onClick={this.handleClick}>
                      Create
                    </Button>
                  </Col>
                </Row>
              </Block>
            </Page>
          </View>
        </Panel>

        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />
      </App>
    );
  }
}
