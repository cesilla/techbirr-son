import React, { useEffect, useState } from 'react';
import TonConnect, { TonConnectUI, Wallet } from '@tonconnect/sdk';
import './WalletConnector.css';

const WalletConnector = ({ onConnectWallet }) => {
  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState(0);

  const languages = ['Connect Wallet', 'Cüzdanı Bağla', 'Conectar Cartera', 'Connecter le Portefeuille', '接钱包', 'اتصل بالمحفظة'];

  const tonConnect = new TonConnect();
  const tonConnectUI = new TonConnectUI(tonConnect);

  useEffect(() => {
    const storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      const walletData = JSON.parse(storedWallet);
      setWallet(walletData);
      setAddress(walletData.address);
      setBalance(walletData.balance);
    }

    const languageInterval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 3000);

    return () => clearInterval(languageInterval);
  }, [languages.length]); // `languages.length` bağımlılık dizisine eklendi

  const connectWallet = async () => {
    try {
      const wallets = await tonConnect.getWallets();
      if (wallets.length === 0) {
        throw new Error('No wallets found');
      }

      const selectedWallet = wallets[0];

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        window.location.href = selectedWallet.universalLink;
      } else {
        await tonConnectUI.connectWallet({
          jsBridgeKey: selectedWallet.jsBridgeKey,
        });
      }

      const walletState = await tonConnect.getWallet();
      const walletAddress = walletState.account.address;
      const balance = await fetchBalance(walletAddress);

      const walletData = {
        address: walletAddress,
        balance,
      };

      setWallet(walletData);
      setAddress(walletAddress);
      setBalance(balance);

      localStorage.setItem('wallet', JSON.stringify(walletData));
      onConnectWallet(walletData);
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
    try {
      const response = await fetch(`https://tonapi.io/v1/account/getInfo?account=${address}`);
      const data = await response.json();
      return data.balance;
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      return 'N/A';
    }
  };

  return (
    <div className="wallet-connector">
      {wallet ? (
        <div className="wallet-info slide-in">
          <p>Connected wallet address: {address}</p>
          <p>Your balance: {balance}</p>
          <button className="wallet-button" onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      ) : (
        <button className="wallet-button slide-in-bottom" onClick={connectWallet}>
          {languages[currentLanguage]}
        </button>
      )}
    </div>
  );
};

export default WalletConnector;
