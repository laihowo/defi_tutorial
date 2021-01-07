import React from "react";

import axios from "axios";

import configData from "../config.json";

import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button,
  Icon,
  ListButton,
} from "framework7-react";

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      sessionArr: [], // Store the session list retrieved from the server.
    };
  }

  // Get all of the session data from the server after this component has mounted.
  componentDidMount() {
    axios
      .post(configData.serverURL + "listsession", {
        module_id: "d161cdfc-4a55-49f1-95ff-09b7ce3053d8",
      })
      .then((response) => {
        this.setState({
          sessionArr: response.data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    var newSession = this.props.f7route.route.newSession;
    var sessionElement = "";

    if (newSession) {
      sessionElement = newSession.reverse().map((item) => (
        <ListItem
          link="#"
          key={item.ID}
          title={item.name}
          footer="Unlocked (available)"
        >
          <Icon slot="media" material="today" size="50px"></Icon>
        </ListItem>
      ));
    }

    return (
      <Page name="home">
        {/* Top Navbar */}
        <Navbar themeDark>
          <NavLeft>
            <Link
              iconIos="f7:menu"
              iconAurora="f7:menu"
              iconMd="material:menu"
              panelOpen="left"
            />
          </NavLeft>
          <NavTitle>Sessions</NavTitle>
          <NavRight></NavRight>
        </Navbar>

        {/* Page content */}
        <List>
          <ListItem divider>
            <Button fill raised panelOpen="right">
              Create Session
            </Button>
          </ListItem>

          {sessionElement}

          {this.state.sessionArr.map((item) => (
            <ListItem
              link="#"
              key={item.id}
              title={item.details.name}
              footer="Unlocked (available)"
            >
              <Icon slot="media" material="today" size="50px"></Icon>
            </ListItem>
          ))}
        </List>
      </Page>
    );
  }
}
