import abi from "./contracts/chai.json";
import {useState,useEffect} from 'react';
import {ethers} from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import './App.css';

function App() {
  const [state, setState]=useState({
    provider:null,
    signer:null,
    contract:null,
  })

  useEffect(()=>{
    const connectWallet = async ()=>{
      const contractAddress = "0x9a65eB9DE1775C07E80F7d39904d983997BcB2f0";
      const contractABI = abi.abi;
      try{
        const {ethereum} = window;

        if(ethereum){
          const account = await ethereum.request({
            method:"eth_requestAccounts",
          });
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress, 
        contractABI,
        signer
        );
      setState({provider, signer, contract});

    } catch(error){
      console.log(error);
    }
    };
    connectWallet();
  }, []);
  console.log(state);
  return (
    <div className="App"> 
      <Buy state={state}></Buy>
      <Memos state={state}></Memos>
    </div>
  );
}

export default App;

// contract address
// 0x9a65eB9DE1775C07E80F7d39904d983997BcB2f0
