import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

// Note: Currently, these names are hardcoded in Ethereum contract
const candidates = [0,1,2];
const candidatesNames = ['Alex', 'Nick', 'Jose'];

class App extends Component {
  
  constructor(props) {
    super(props);

    // Change contract address when a new contract is deployed and change abi as well when the interface changed.
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.253:7545"));
    const abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"uint8"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"uint8"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"uint8"}],"name":"uint8ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"uint8"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"uint8[]"}],"payable":false,"type":"constructor"}]');
    const votingContract = this.web3.eth.contract(abi);
    this.contractInstance = votingContract.at('0xBc3495943e8Bc4f95068355fbE5A456ed19e7FcD');
  }

  state = {
    votes: [],
    showTxInfo: false
  }
  
  componentDidMount() {
    this.updateVotes();
  }

  voteForCandidate = (index) => {
    this.transactionHash = this.contractInstance.voteForCandidate(candidates[index], {from: this.web3.eth.accounts[0]});      
    this.lastVotedName = candidatesNames[index];
    this.setState({showTxInfo: true});
  }

  updateVotes = () => {    
    console.log("aaa");
    const votesCand1 = this.contractInstance.totalVotesFor.call(candidates[0]).toString();
    const votesCand2 = this.contractInstance.totalVotesFor.call(candidates[1]).toString();
    const votesCand3 = this.contractInstance.totalVotesFor.call(candidates[2]).toString();    
    this.setState({votes: [votesCand1, votesCand2, votesCand3]});    
  } 

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Voting DApp using Ethereum 'Rinkeby' Testnet</h1>
        </header>
        
        <div style={{margin:'20px', textAlign:'left'}} class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>                   
                  <a href="#" onClick={() => this.voteForCandidate(0)} style={{margin:'0px'}}
                              class="btn btn-primary pull-left"> 
                    Vote Alex
                  </a>                                
                </td>
                <td id="candidate-1"> {this.state.votes[0]} </td>
              </tr>
              <tr>
                <td> 
                  <a href="#" onClick={() => this.voteForCandidate(1)} style={{margin:'0px'}}
                              class="btn btn-primary pull-left"> 
                    Vote Nick
                  </a>                    
                </td>
                <td id="candidate-2"> {this.state.votes[1]} </td>
              </tr>
              <tr>
                <td> 
                  <a href="#" onClick={() => this.voteForCandidate(2)} style={{margin:'0px'}}
                              class="btn btn-primary pull-left"> 
                    Vote Jose
                  </a>                    
                </td>
                <td id="candidate-3"> {this.state.votes[2]} </td>
              </tr>
            </tbody>
          </table>
          {
            this.state.showTxInfo ?
              <p>
                Thanks for voting for {this.lastVotedName}. <br/>
                Your votes has been submitted into Ethereum blockchain. 
                Changes in Ethereum blockchain currently takes ~10-15 seconds to take affect. <br/>
                <b>Transaction Details:</b> {' '}
                  <a href={"https://rinkeby.etherscan.io/tx/" + this.transactionHash}>
                    https://rinkeby.etherscan.io/tx/{this.transactionHash}
                  </a>
              </p>
            : null
          }  
          <div class="btn-group-vertical"  style={{width:'160px'}} >
            <a href="#" onClick={this.updateVotes} style={{margin:'0px', backgroundColor: '#4dd2ff'}}
                        class="btn btn-primary pull-center"> 
              Refresh
            </a>            
          </div>
        </div>
      </div>
    );

  }

}

export default App;

