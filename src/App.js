
import './App.css';
import Certificate from './component/certificate';
import Idea from './component/idea';

import Web3 from "web3";
import contractABI from "./contracts/certificate.json";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {


  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  const [contract, setContract] = useState(null);

  useEffect(() => {
    loadBlockchainData();

  }, []);


  const loadBlockchainData = async () => {
    if (window.ethereum) {
      try {
        //await window.ethereum.enable();

        //const networkId = await window.ethereum.request({
        //  method: "net_version",
        //});

        //if (networkId !== "100") {
        // Network ID for Sepolia
        //await switchToSepolia();
        //}
        const providerUrl = 'http://localhost:8545';


        // user enables the app to connect to MetaMask
        //const tempWeb3 = new Web3(window.ethereum);
        const tempWeb3 = new Web3(providerUrl);

        const contractInstance = new tempWeb3.eth.Contract(
          contractABI,
          contractAddress
        );


        //var accounts = await tempWeb3.eth.getAccounts();

        setContract(contractInstance);

      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("No web3 provider detected");
    }


  }

  return (
    <div className="App">
      <header className="App-header">

        <Router>
          <Switch>
            <Route path="/certificate" >
            <Certificate contract={contract} account={contractAddress} />
            </Route>
            <Route path="/Idea">
              <Idea />
            </Route>
          </Switch>
        </Router>
        
      </header>
    </div>
  );
}

export default App;
