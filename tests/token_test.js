const { Clarinet, Tx, Chain, Account } = require('@stacks/clarity-cli');

Clarinet.test({
	name: "Test get-balance function",
	async fn(chain, accounts) {
		let userA = accounts.get('wallet_1');

		let block = chain.mineBlock([
			Tx.contractCall("token", "get-balance", [userA.address], userA.address)
		]);

		let [receipt] = block.receipts;
		receipt.result.expectOk().expectUint(0);
	}
});