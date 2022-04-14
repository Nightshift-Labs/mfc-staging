import { showError } from './../utils/helpers';
import { ETHEREUM, SOLANA } from "../utils/constants";

export const getPhantomAddress = async () => {

    if (SOLANA in window) {

        await window[SOLANA].connect();
        return window[SOLANA].publicKey?.toBase58();

    }else {
        showError("Please install Phantom")
        return null;
    }

};   

export const getMetaMaskAddress = async () => {

    if(ETHEREUM in window) {

        await window[ETHEREUM].request({ method: 'eth_requestAccounts' });
        const accounts = await window[ETHEREUM].request({ method: 'eth_accounts' });
        return accounts[0];

    } else {
        showError("Please install MetaMask")
        return null;
    }
}