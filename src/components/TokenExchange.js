import React, { Component } from 'react'

class TokenExchange extends Component {

  handleClick = () => {

    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }

    window.ethereum.request({ method: 'eth_requestAccounts' });
  }

    render() {
        return (
          <div className="card mb-4" >
            <div className="card-body">
              <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                var tokenAmount = this.input.value.toString()
                this.props.tokenExchange(tokenAmount)
              }}>

                <div>
                  <label className="float-left"><b>From</b></label>
                </div>

                <div className="input-group mb-4">
                  <input
                    type="text"
                    ref={(input) => { this.input = input }}
                    className="form-control form-control-lg"
                    placeholder="0.0"
                    required />
                </div>

                <div>
                  <label className="float-left"><b>To</b></label>
                </div>

                <div className="input-group mb-4">
                  <input
                    type="text"
                    //ref={(input) => { this.input = input }}
                    className="form-control form-control-lg"
                    placeholder="0.0"
                    disabled
                    //required 
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg">Exchange Token</button>
              </form>
            </div>
          </div>
        )
    }

}

export default TokenExchange