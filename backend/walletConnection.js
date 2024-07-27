const TonWeb = require("tonweb");

const tonweb = new TonWeb();
const { mnemonicNew, mnemonicToWalletKey, Wallets } = tonweb;

async function createWallet() {
  const mnemonic = await mnemonicNew();
  const key = await mnemonicToWalletKey(mnemonic);
  const wallet = new Wallets.all.v3R2(tonweb.provider, {
    publicKey: key.publicKey,
    wc: 0
  });
  
  return { mnemonic, wallet };
}

module.exports = { createWallet };
