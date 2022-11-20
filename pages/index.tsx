import { useState } from 'react';
import styles from '../styles/Home.module.css'
import AddressForm from './components/AddressForm';
import * as Web3 from '@solana/web3.js'

export default function Home() {

  const [address, setAddress] =useState("");
  const [balance, setBalance] = useState(0);
  const [isExecutable, setIsExecutable] = useState(false);

  const addressSubmittedHandler = (address: string) =>{
    try {
      console.log("address", address)
      setAddress(address);
      const key = new Web3.PublicKey(address);
      const connection= new Web3.Connection(Web3.clusterApiUrl("devnet"));
      connection.getBalance(key).then((balance) =>{
        setBalance(balance / Web3.LAMPORTS_PER_SOL);
      })
      connection.getAccountInfo(key).then(accountInfo =>{
        setIsExecutable(accountInfo?.executable ?? false);
      });
    }catch(e) {
      console.log(e)
      setAddress("");
      setBalance(0);
      setIsExecutable(false);
    }

  }
  
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Is it executable? ${isExecutable ? 'Yep' : 'Nope'}`}</p>
      </header>
    </div>
  )
}
