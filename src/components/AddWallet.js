import React, { Component } from 'react'

class AddWallet extends Component {

  handleClick = () => {

    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }

    window.ethereum.request({ method: 'eth_requestAccounts' });
  }

    render() {
        return (
            <button onClick={this.handleClick}>Add MetaMask Wallet</button>
        )
    }

}

export default AddWallet