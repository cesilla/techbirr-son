import React, { useEffect, useState } from 'react';
import { useTonConnectUI, UserActionEvent, SdkActionEvent } from '@tonconnect/ui-react';
import './WalletConnector.css';
import { TonProofDemoApi } from './TonProofDemoApiService';

const WalletConnector = ({ onConnectWallet }) => {
  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState(0);

  const languages = ['Connect Wallet', 'Cüzdanı Bağla', 'Conectar Cartera', 'Connecter le Portefeuille', '接钱包', 'اتصل بالمحفظة'];

  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    const storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      const walletData = JSON.parse(storedWallet);
      setWallet(walletData);
      setAddress(walletData.account.address);
      setBalance(walletData.balance);
    }

    const languageInterval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 3000);

    return () => clearInterval(languageInterval);
  }, []);

  useEffect(() => {
    const logEvent = (scope) => (event) => {
      scope = scope.startsWith('ton-connect-ui-') ? 'TonConnectUI' : 'TonConnect';
  
      return (event) => {
        if (!(event instanceof CustomEvent)) {
          return;
        }
        const detail = event.detail;
        console.log(`${scope} Event: ${detail.type}`, detail);
      };
    };
  
    const tonConnectUiPrefix = 'ton-connect-ui-';
    const tonConnectUiEvents = [
      'request-version',
      'response-version',
      'connection-started',
      'connection-completed',
      'connection-error',
      'connection-restoring-started',
      'connection-restoring-completed',
      'connection-restoring-error',
      'transaction-sent-for-signature',
      'transaction-signed',
      'transaction-signing-failed',
      'disconnection',
    ].map(event => `${tonConnectUiPrefix}${event}`);
  
    const tonConnectPrefix = 'ton-connect-';
    const tonConnectEvents = [
      'request-version',
      'response-version',
      'connection-started',
      'connection-completed',
      'connection-error',
      'connection-restoring-started',
      'connection-restoring-completed',
      'connection-restoring-error',
      'transaction-sent-for-signature',
      'transaction-signed',
      'transaction-signing-failed',
      'disconnection',
    ].map(event => `${tonConnectPrefix}${event}`);
  
    const events = [
      ...tonConnectUiEvents,
      ...tonConnectEvents,
    ];
  
    for (const event of events) {
      try {
        window.addEventListener(event, logEvent(event));
      } catch (e) {
        console.error('Failed to add event listener:', e);
      }
    }
  
    return () => {
      for (const event of events) {
        try {
          window.removeEventListener(event, logEvent(event));
        } catch (e) {
          console.error('Failed to remove event listener:', e);
        }
      }
    };
  }, []);

  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const connectWallet = async () => {
    try {
      if (tonConnectUI.connected) {
        return;
      }

      const connectResult = await tonConnectUI.connectWallet({
        universalLink: isMobile() ? undefined : 'https://tonkeeper.app',
      });

      const walletState = connectResult.wallet;
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
      onConnectWallet(walletData);

      if (connectResult.tonProof) {
        await TonProofDemoApi.checkProof(connectResult.tonProof.proof, connectResult.account);
      }
    } catch (error) {
      console.error('Ton Wallet connection failed:', error);
    }
  };

  const disconnectWallet = () => {
    tonConnectUI.disconnect();
    setWallet(null);
    setAddress('');
    setBalance('');
    localStorage.removeItem('wallet');
    TonProofDemoApi.reset();
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
