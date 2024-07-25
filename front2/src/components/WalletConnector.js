// src/components/WalletConnector.js
import React, { useEffect, useState } from 'react';
import TonConnect from '@tonconnect/sdk';

const WalletConnector = ({ onConnectWallet }) => {
  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  const tonConnect = new TonConnect();

  useEffect(() => {
    // Check if a wallet is already connected
    const storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      const walletData = JSON.parse(storedWallet);
      setWallet(walletData);
      setAddress(walletData.account.address);
      setBalance(walletData.balance);
    }
  }, []);

  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const connectWallet = async () => {
    try {
      const wallets = await tonConnect.getWallets();
      if (wallets.length === 0) {
        throw new Error('No wallets found');
      }

      const selectedWallet = wallets[0]; // Choose the first wallet from the list

      if (isMobile()) {
        // Handle mobile wallet connection
        window.location.href = selectedWallet.universalLink;
      } else {
        // Handle desktop wallet connection
        await tonConnect.connectWallet({
          jsBridgeKey: selectedWallet.jsBridgeKey,
        });
      }

      // Get wallet state
      const walletState = tonConnect.wallet;
      const walletAddress = walletState.account.address;
      const balance = await fetchBalance(walletAddress);

      const walletData = {
        account: { address: walletAddress },
        balance,
      };

      setWallet(walletData);
      setAddress(walletAddress);
      setBalance(balance);

      localStorage.setItem('wallet', JSON.stringify(walletData));
      onConnectWallet();
    } catch (error) {
      console.error('Ton Wallet connection failed:', error);
    }
  };

  const disconnectWallet = () => {
    tonConnect.disconnectWallet();
    setWallet(null);
    setAddress('');
    setBalance('');
    localStorage.removeItem('wallet');
  };

  const fetchBalance = async (address) => {
    // Replace with actual API call to get the balance
    const response = await fetch(`https://tonapi.io/v1/account/getInfo?account=${address}`);
    const data = await response.json();
    return data.balance;
  };

  return (
    <div>
      {wallet ? (
        <div>
          <p>Connected wallet address: {address}</p>
          <p>Your balance: {balance}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect with Ton Wallet</button>
      )}
    </div>
  );
};

export default WalletConnector;
