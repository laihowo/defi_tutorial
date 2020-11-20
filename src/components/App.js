import React, { Component } from 'react'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'
import TokenSupply from './TokenSupply'
import AddWallet from './AddWallet'
import TokenExchange from './TokenExchange'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  componentDidMount() {

  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    //(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/55bdf7c244cc4f039690426ace32465d:8545'))

    var web32 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/55bdf7c244cc4f039690426ace32465d"));
    console.log(web32.eth.Contract.name)

    var Web33 = require('web3');

    if (typeof Web33 !== 'undefined') {
        Web33 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        Web33 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/55bdf7c244cc4f039690426ace32465d"));
    }

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      
      let daiTokenName = await daiToken.methods.name().call()
      console.log(daiTokenName)
      
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId]
    if(dappTokenData) {
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      this.setState({ dappToken })
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
      
      this.setState({ dappTokenBalance: dappTokenBalance.toString() })
    } else {
      window.alert('DappToken contract not deployed to detected network.')
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  tokenExchange = (tokenAmount) => {

  }

  tokenSupply = (contractaddress) => {
    //var contractaddress = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
    var apikey ="P1FCIHQ3E8ACSYN6NXH7NDB718ZI3YDE4B"
    fetch("https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress="
      + contractaddress + "&apikey=" + apikey)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      daiToken: {},
      dappToken: {},
      tokenFarm: {},
      daiTokenBalance: '0',
      dappTokenBalance: '0',
      stakingBalance: '0',
      loading: true,

      error: null,
      isLoaded: false,
      items: [],
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        daiTokenBalance={this.state.daiTokenBalance}
        dappTokenBalance={this.state.dappTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    }

    const { error, isLoaded, items } = this.state;
    var tokenSupply;
    if (error) {
      tokenSupply = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      tokenSupply = <div>Please enter the contract address!</div>;
    } else {
      tokenSupply = 
        <ul>
          <li>Token Supply {items.result}</li>
        </ul>;
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content} {tokenSupply}

                <TokenSupply 
                  tokenSupply={this.tokenSupply} 
                />

                <AddWallet></AddWallet>

                <TokenExchange
                  tokenExchange={this.tokenExchange}>
                </TokenExchange>

              </div>
              
            </main>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
