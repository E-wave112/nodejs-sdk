import Web3 from 'web3';
import { ChainId, PROVIDERS } from './constants'

let provider : string;

/** this functions creates a web3 instance and sets a provider */
const InstantiateWeb3 = (provider: string) => {

    let web3 = new Web3(provider);

    return web3;
}


/**This function creates a wallet and returns an object with address and private key which the end user stores*/

export const CreateWallet = async (chainId: ChainId) => {

    chainId === 1 ? provider = PROVIDERS.MAINENT  ? chainId === 3  ? provider = PROVIDERS.ROPSTEN ? chainId === 4 ? provider = PROVIDERS.RINKEBY : provider = PROVIDERS.LOCALHOST : 

    let web3 = InstantiateWeb3(PROVIDERS.LOCALHOST);

    const wallet = await web3.eth.accounts.create();

    return wallet;

}

/**This function creates a wallet and returns an object with address and private key which the end user stores*/

export const RetrieveWallet = async (chainId: ChainId, privateKey: string) => {

    let web3 = InstantiateWeb3(PROVIDERS.LOCALHOST);

    const wallet = await web3.eth.accounts.privateKeyToAccount(privateKey);

    return wallet;

}