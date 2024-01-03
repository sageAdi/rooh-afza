const Transaction = () => {
  async function getSigner() {
    const provider: any = 'new BrowserProvider()';
    return provider.getSigner();
  }

  async function getChainId() {
    const provider: any = 'new BrowserProvider()';
    return provider.getChainId();
  }
  async function signRawTransaction(rawTransaction: string) {
    const signer = getSigner();
    const signedTransaction = await signer.signTransaction(rawTransaction);
    if (signedTransaction) {
      return signedTransaction;
    }
    throw new Error('Failed to sign transaction');
  }

  async function signMessage(message: string) {
    const signer = getSigner();
    const signedMessage = await signer.signMessage(message);
    if (signedMessage) {
      return signedMessage;
    }
    throw new Error('Failed to sign message');
  }

  async function sendTransaction(rawTransaction: string) {
    const signer = getSigner();
    const txResponse = await signer.sendTransaction(rawTransaction);
    await txResponse.wait();
    if (txResponse.transactionHash) {
      return txResponse.transactionHash;
    }
    throw new Error('Failed to send transaction');
  }

  async function goToExplorer() {
    const chainId = getChainId();
  }

  function handleSubmit() {}

  return <div>Transaction page</div>;
};
export default Transaction;
