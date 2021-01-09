import React from "react";

import * as F7 from "framework7-react";

export default class extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  handleClick() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    }

    window.ethereum.request({ method: "eth_requestAccounts" });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Add MetaMask Wallet</button>
        <br /> <br />
      </div>
    );
  }
}
