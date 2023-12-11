'use client'

import React, {useState} from 'react';

function Explorer() {
    const [blockchainType, setBlockchainType] = useState('');
    const [testnetOrMainnet, setTestnetOrMainnet] = useState('');
    const [transaction, setTransaction] = useState('');
    const [contract, setContract] = useState('');
    const [address, setAddress] = useState('');
    const [internalTransaction, setInternalTransaction] = useState('');

    const handleSubmit = (e: {
        preventDefault: () => void;
    }) => {
        e.preventDefault();
        // Process the form data here
    };

    return (<form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
        <label style={{display: 'block', marginBottom: '10px'}}>
            Blockchain Type:
            <input
                type="text"
                value={blockchainType}
                onChange={(e) => setBlockchainType(e.target.value)}
                style={{marginLeft: '10px'}}
            />
        </label>
        <br/>
        <label style={{display: 'block', marginBottom: '10px'}}>
            Testnet or Mainnet:
            <input
                type="text"
                value={testnetOrMainnet}
                onChange={(e) => setTestnetOrMainnet(e.target.value)}
                style={{marginLeft: '10px'}}
            />
        </label>
        <br/>
        <label style={{display: 'block', marginBottom: '10px'}}>
            Transaction:
            <input
                type="text"
                value={transaction}
                onChange={(e) => setTransaction(e.target.value)}
                style={{marginLeft: '10px'}}
            />
        </label>
        <br/>
        <label style={{display: 'block', marginBottom: '10px'}}>
            Contract:
            <input
                type="text"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                style={{marginLeft: '10px'}}
            />
        </label>
        <br/>
        <label style={{display: 'block', marginBottom: '10px'}}>
            Address:
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{marginLeft: '10px'}}
            />
        </label>
        <br/>
        <label style={{display: 'block', marginBottom: '10px'}}>
            Internal Transaction:
            <input
                type="text"
                value={internalTransaction}
                onChange={(e) => setInternalTransaction(e.target.value)}
                style={{marginLeft: '10px'}}
            />
        </label>
        <br/>
        <button type="submit"
                style={{background: 'blue', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer'}}>Submit
        </button>
    </form>)
}

export default Explorer;
