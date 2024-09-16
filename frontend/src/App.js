import React, { useState } from 'react';
import { callReadOnlyFunction, callPublicFunction } from './services/stacks';
import './index.css';

function App() {
	const [balance, setBalance] = useState(0);
	const [recipient, setRecipient] = useState('');
	const [amount, setAmount] = useState('');

	const getBalance = async () => {
		try {
			const userBalance = await callReadOnlyFunction('get-balance', []);
			setBalance(userBalance);
		} catch (error) {
			console.error('Error fetching balance:', error);
		}
	};

	const transferTokens = async () => {
		try {
			await callPublicFunction('transfer', [recipient, amount]);
			getBalance(); // Refresh balance
		} catch (error) {
			console.error('Error transferring tokens:', error);
		}
	};

	return (
		<div className="App">
			<h1>BitBase Token Dashboard</h1>
			<div>
				<button onClick={getBalance}>Get Balance</button>
				<p>Your Balance: {balance}</p>
			</div>
			<div>
				<input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient Address" />
				<input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
				<button onClick={transferTokens}>Transfer</button>
			</div>
		</div>
	);
}

export default App;