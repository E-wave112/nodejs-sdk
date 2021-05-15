import createContract from "../create.contract"
import EsusuService from '../abis/EsusuService.json';
import sendSignedTransaction from "../../utils/sendSignedTransaction";

export default async function (esusuId: number, provider: string, privateKey: string, addresses: Addresses) {

  try {

    const contract = await createContract(provider, EsusuService, addresses.ESUSU_SERVICE);

    const data = await contract.methods.WithdrawROIFromEsusuCycle(esusuId).encodeABI();

    const signedTx = await sendSignedTransaction(data, addresses.ESUSU_SERVICE, privateKey, provider);

    return {
      status: true,
      data: signedTx
    }

  } catch (error) {
    console.error(error)
    return {
      status: false,
      data: error
    }
  }
}