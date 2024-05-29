/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import { ethers } from 'ethers'
import contractABI from '../GiveForeverABI.json';
import {  useState } from 'react';
const { ethereum } = window as never;	

const contractAddress = '0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005' // Sepolia
const provider = new ethers.providers.Web3Provider(ethereum)
let contract = new ethers.Contract(contractAddress, contractABI, provider)
let signer;

function App() {
  const [donated,setDonated] = useState<any>();
  const [lidoBalance,setLidoBalance] = useState<any>();
  const [connectionStatus, setConnectionStatus] = useState<any>('Not Connected');

  const connect = async () => {
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner(); 
    contract = new ethers.Contract(contractAddress, contractABI, signer as any);
    const userAddress = await signer.getAddress();  

    setConnectionStatus(`Connected: ${userAddress}`);
    updateBalances();
  }

  const deposit = async () => {
    const userAmount = (document.getElementById('deposit-amount') as HTMLInputElement).value ;
    const weiAmount = ethers.utils.parseEther(userAmount);
    const tx = await contract.deposit({ value: weiAmount });
    await tx.wait();
    updateBalances();
  }

  const withdraw = async () => {
    await contract.withdraw();
    updateBalances();
  }

  const updateBalances = async () => {
    const donated = await contract.donated();
    setDonated(ethers.utils.formatEther(donated));
    const lidoBalance = await contract.lidoBalance();
    setLidoBalance(ethers.utils.formatEther(lidoBalance));
  }

  setTimeout(() => {
    updateBalances();
  }, 1000);

  console.log(donated)
  console.log(lidoBalance)

  return (
    <>
      <div>
        <header>
          <h1><span className='blue'>Give</span> Forever</h1>
          <p>A perpetual valut for charity donation</p>
        </header>

        <div className='app-body'>
          <div>
            Donated: {donated} ETH<br />
            Balance: {lidoBalance} ETH<br />
          </div>
          <div className="app-box">
            <div className='app-connection'>
              {connectionStatus}
            </div>
            <button id="connect" onClick={connect}>Connect Wallet</button>
          </div>
         
         <div className="app-box">
          <input type="text" id="deposit-amount" placeholder='ETH' />
         
          <button id="deposit" onClick={deposit}>DEPOSIT</button>
         </div>

         <div className="app-box">
          <button id="withdraw" onClick={withdraw}>WITHDRAW</button>
         </div>
        </div>
      </div>
    </>
  )
}

export default App
