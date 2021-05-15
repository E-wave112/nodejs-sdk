import createContract from "../create.contract";
import web3 from "web3";
import XendFinanceIndividual from '../abis/XendFinanceIndividual_Yearn_V1.json';
import DaiLendingService from '../abis/DaiContract.json'
import privateKeyToAddress from "../../utils/privateKeyToAddress";




export default async function (provider: string, privateKey: string, address: Addresses) {


  try {

    //
    const clientAddress = privateKeyToAddress(provider, privateKey);

    const contract = await createContract(provider, XendFinanceIndividual.abi, address.CLIENT_RECORD);

    const lendingServiceContract = await createContract(provider, DaiLendingService, address.PROTOCOL_ADAPTER);

    let pricePerFullShare = await lendingServiceContract.methods.getPricePerFullShare().call();
    //get the number of record
    const record = await contract.methods.getClientRecord(clientAddress).call();



    let shareBalance = record.derivativeBalance

    let initiaDerivativeBalance = web3.utils.fromWei(shareBalance.toString(), "ether");

    pricePerFullShare = web3.utils.fromWei(pricePerFullShare.toString(), "ether");

    let balance = pricePerFullShare * Number(initiaDerivativeBalance);

    if (record) {


      return { balance, derivativeWithdrawn: record.derivativeTotalWithdrawn, shareBalance }
    }
    else {
      return { balance: 0.00, derivativeWithdrawn: 0.00, shareBalance: 0.00 }

    }

  } catch (err) {

    console.error(err);
    return {}

  }

}