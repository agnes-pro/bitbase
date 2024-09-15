const { Clarinet, Tx, Chain, Account } = require('@stacks/clarity-cli');

// Test case for the 'get-balance' function
Clarinet.test({
	name: "Test get-balance function",
	async fn(chain, accounts) {
		// Retrieve a test account
		let userA = accounts.get('wallet_1');

		// Mine a block with a call to the 'get-balance' function for userA
		let block = chain.mineBlock([
			Tx.contractCall("token", "get-balance", [userA.address], userA.address)
		]);
		// Extract the result from the transaction receipt
		let [receipt] = block.receipts;
		// Assert that the balance returned is 0 (default value for new accounts)
		receipt.result.expectOk().expectUint(0);
	}
});

// Test case for handling insufficient balance in the 'transfer' function
Clarinet.test({
	name: "Test insufficient balance",
	async fn(chain, accounts) {
		// Retrieve two test accounts
		let userA = accounts.get('wallet_1');
		let userB = accounts.get('wallet_2');
		// Mine a block with a call to the 'transfer' function from userA to userB with amount 1000
		let block = chain.mineBlock([
			Tx.contractCall("token", "transfer", [userB.address, 1000], userA.address)
		]);
		// Extract the result from the transaction receipt
		let [receipt] = block.receipts;
		// Assert that the transfer fails with error code 101 (insufficient balance)
		receipt.result.expectErr().expectUint(101);
	}
});