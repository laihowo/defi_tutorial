import React, { Component } from 'react'

class TokenSupply extends Component {

    render() {
        return (
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                var contractAddress = this.input.value.toString()
                this.props.tokenSupply(contractAddress)
              }}>
                <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="Contract Address"
                  required />
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Get Token Supply</button>
              </form>
        )
    }

}

export default TokenSupply