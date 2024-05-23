/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import { ethers } from 'ethers'
import contractABI from '../GiveForeverABI.json';
import {  useState } from 'react';
const { ethereum } = window as never;	

const contractAddress = '0x1A5bd5F009950786c41ce82Bf925F0B026e623dA' // Sepolia
const provider = new ethers.BrowserProvider(ethereum)
let contract = new ethers.Contract(contractAddress, contractABI, provider)
let signer;

function App() {
  const [donated,setDonated] = useState<any>();
  const [lidoBalance,setLidoBalance] = useState<any>();
  const [surplus,setSurplus] = useState<any>();

  const connect = async () => {
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner(); // Await the promise returned by getSigner()
    contract = new ethers.Contract(contractAddress, contractABI, signer as any);
    const userAddress = await signer.getAddress(); // Call getAddress() on the resolved signer object
    // const networkData = await provider.getNetwork();
    // if (networkData.chainId === 1) networkName = 'mainnet';
    // if (networkData.chainId === 5) networkName = 'goerli';

    console.log(userAddress);
    updateBalances();
  }

  const deposit = async () => {
    const userAmount = (document.getElementById('deposit-amount') as HTMLInputElement).value ;
    const weiAmount = ethers.parseEther(userAmount);
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
    setDonated(ethers.formatEther(donated));
    const lidoBalance = await contract.lidoBalance();
    setLidoBalance(ethers.formatEther(lidoBalance));
    const surplus = lidoBalance.sub(donated);
    setSurplus(ethers.formatEther(surplus));
  }

  setTimeout(() => {
    updateBalances();
  }, 1000);

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
            Surplus: {surplus} ETH<br />
          </div>
          <div className="app-box">
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
