import React from "react";

import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Tab,
  Tabs,
  Toolbar,
  Link,
  List,
  ListInput,
  ListItem,
  Icon,
} from "framework7-react";

export default class extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.handleStartChange = this.handleStartChange.bind(this); // Pass the start date and time of the new session to the app component.
  }

  handleStartChange(event) {
    this.props.appCallback(event.target.value);
  }

  render() {
    return (
      <Block>
        <Toolbar tabbar top>
          <Link tabLink="#tab-1" tabLinkActive>
            <Icon slot="media" material="list"></Icon>
          </Link>
          <Link tabLink="#tab-2">
            <Icon slot="media" material="settings"></Icon>
          </Link>
        </Toolbar>
        <Tabs swipeable>
          <Tab id="tab-1" className="page-content" tabActive>
            <Block>
              <BlockTitle>Event Details</BlockTitle>
              <List noHairlines>
                <ListInput
                  label="Start"
                  type="datetime-local"
                  value={this.state.inputStart}
                  onChange={this.handleStartChange}
                  outline
                ></ListInput>

                <ListInput
                  label="End"
                  type="datetime-local"
                  outline
                ></ListInput>

                <ListItem
                  checkbox
                  title="No End (open session)"
                  name="demo-checkbox"
                ></ListItem>

                <ListItem
                  checkbox
                  title="Repeat session"
                  name="demo-checkbox"
                ></ListItem>

                <ListInput
                  label="Early Entry"
                  type="select"
                  defaultValue="15"
                  placeholder="Please choose..."
                  outline
                >
                  <option value="15">15 min before start</option>
                  <option value="30">30 min before start</option>
                </ListInput>
              </List>
            </Block>
          </Tab>
          <Tab id="tab-2" className="page-content">
            <Block>
              <p>Tab 2 content</p>
            </Block>
          </Tab>
        </Tabs>
      </Block>
    );
  }
}
