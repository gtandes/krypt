import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants.js';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const transactionContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer,
	);
	// console.log({ provider, signer, transactionContract });

	return transactionContract;
};

export const TransactionProvider = ({ children }) => {
	const [currentAccount, setcurrentAccount] = useState('');
	const [isLoading, setisLoading] = useState(false);
	const [transactionCount, settransactionCount] = useState(
		localStorage.getItem('transactionCount'),
	);

	const [formData, setformData] = useState({
		addressTo: '',
		amount: '',
		keyword: '',
		message: '',
	});

	const [transactions, settransactions] = useState([]);

	const handleChange = (e, name) => {
		setformData((prevState) => ({
			...prevState,
			[name]: e.target.value,
		}));
	};

	const getAllTransactions = async () => {
		try {
			if (!ethereum) return alert('Please install Metamask.');
			const transactionContract = getEthereumContract();

			const allTransactions = await transactionContract.getAllTransactions();

			const structuredTransactions = allTransactions.map((transaction) => ({
				addressTo: transaction.receiver,
				addressFrom: transaction.sender,
				timestamp: new Date(
					transaction.timestamp.toNumber() * 1000,
				).toLocaleString(),

				message: transaction.message,
				keyword: transaction.keyword,
				amount: parseInt(transaction.amount._hex) / 10 ** 18,
			}));

			// console.log(structuredTransactions);
			settransactions(structuredTransactions);
		} catch (error) {
			console.log(error);

			throw new Error('No ethereum object detected.');
		}
	};

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return alert('Please install Metamask.');

			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (accounts.length) {
				setcurrentAccount(accounts[0]);
				getAllTransactions();
			} else {
				console.log('No ethereum accounts found.');
			}
			// console.log(accounts);
		} catch (error) {
			console.log(error);

			throw new Error('No ethereum object detected.');
		}
	};

	const checkIfTransactionsExist = async () => {
		try {
			const transactionContract = getEthereumContract();
			const transactionCount = await transactionContract.getTransactionCount();
			window.localStorage.setItem('transactionCount', transactionCount);
		} catch (error) {
			console.log(error);

			throw new Error('No ethereum object detected.');
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
		checkIfTransactionsExist();
	}, []);

	const connectWallet = async () => {
		try {
			if (!ethereum) return alert('Please install Metamask.');

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			setcurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);

			throw new Error('No ethereum object detected.');
		}
	};

	const sendTransaction = async () => {
		try {
			if (!ethereum) return alert('Please install Metamask.');

			const { addressTo, amount, keyword, message } = formData;
			const transactionContract = getEthereumContract();
			const parsedAmount = ethers.utils.parseEther(amount);

			await ethereum.request({
				method: 'eth_sendTransaction',
				params: [
					{
						from: currentAccount,
						to: addressTo,
						gas: '0x5208', //21000GWEI
						// gasPrice: '',
						value: parsedAmount._hex,
					},
				],
			});

			const transactionHash = await transactionContract.addToBlockchain(
				addressTo,
				parsedAmount,
				message,
				keyword,
			);

			setisLoading(true);
			console.log(`Loading - ${transactionHash.hash}`);

			await transactionHash.wait();

			setisLoading(false);
			console.log(`Loading complete - ${transactionHash.hash}`);

			const transactionCount = await transactionContract.getTransactionCount();

			settransactionCount(transactionCount.toNumber());

			window.reload();
		} catch (error) {
			console.log(error);

			throw new Error('No ethereum object detected.');
		}
	};

	return (
		<TransactionContext.Provider
			value={{
				connectWallet,
				currentAccount,
				formData,
				handleChange,
				sendTransaction,
				transactions,
				isLoading,
			}}>
			{children}
		</TransactionContext.Provider>
	);
};
