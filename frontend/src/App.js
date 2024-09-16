import React, { useState } from 'react';
import { callReadOnlyFunction } from './services/stacks';

function App() {
	const [balance, setBalance] = useState(0);

	const getBalance = async () => {
		const userBalance = await callReadOnlyFunction('get-balance', []);
		setBalance(userBalance);
	};

	return (
		<div className="App">
			<h1>BitBase Token Dashboard</h1>
			<div>
				<button onClick={getBalance}>Get Balance</button>
				<p>Your Balance: {balance}</p>
			</div>
		</div>
	);
}

export default App;