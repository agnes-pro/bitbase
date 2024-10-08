import { makeContractCall, callReadOnlyFunction as readContract } from '@stacks/transactions';

const contractAddress = 'SPXXXXX'; // Your contract address here
const contractName = 'token';

export const callReadOnlyFunction = async (functionName, args) => {
	const response = await readContract({
		contractAddress,
		contractName,
		functionName,
		functionArgs: args,
		senderAddress: 'SPYOURADDRESS',
	});
	return response;
};

export const callPublicFunction = async (functionName, args) => {
	const tx = await makeContractCall({
		contractAddress,
		contractName,
		functionName,
		functionArgs: args,
		senderKey: 'your-private-key',
	});
	// Execute the transaction...
};
