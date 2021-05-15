import flexibleDeposit from './flexible-deposit';
import fixedDeposit from './fixed-deposit';
import fixedDepositInfo from './get-fixed-deposit-record'
import flexibleDepositInfo from './get-flexible-deposit-record';
import fixedWithdrawal from './fixed-withdrawal';
import flexibleWithdrawal from './flexible-withdrawal';
import XendFinance from '../../init';
import { ChainId } from '../../utils/constants';





export default class Personal extends XendFinance {

  constructor(chainId: ChainId, privateKey: string, options?: Options) {
    super(chainId, privateKey, options);
  }

  //////////////////////////////////////////////////////////////////////

  /**
   * Deposit in Flexible savings
   * @param depositAmount
   */

  async flexibleDeposit(depositAmount: any) {
    return await flexibleDeposit(this.provider, this.privateKey, depositAmount, this.addresses);
  }


  //////////////////////////////////////////////////////////////////////

  /**
   * Deposit in Fixed savings
   * @param args
   */

  async fixedDeposit(args: FixedDepositData) {
    return await fixedDeposit({
      ...args,
      depositDate: args.depositDate,
      depositAmount: args.depositAmount,
      lockPeriod: args.lockPeriod,
      provider: this.provider,
      privateKey: this.privateKey,
    }, this.addresses);
  }

  //////////////////////////////////////////////////////////////////////


  /**
   * Get fixed deposit information for a particular address
   */

  async fixedInfo() {
    return fixedDepositInfo(this.privateKey, this.provider, this.addresses);
  }

  /**
  * Get flexible deposit information for a particular address
  */

  async flexibleInfo() {
    return flexibleDepositInfo(this.privateKey, this.provider, this.addresses);
  }

  /**
   * withdraw from fixed deposit
   */

  //////////////////////////////////////////////////////////////////////

  async withdrawFixed(recordId: number) {
    return fixedWithdrawal(this.privateKey, this.provider, recordId, this.addresses);
  }

  /**
     * withdraw from flexible deposit
     */

  //////////////////////////////////////////////////////////////////////

  async withdrawFlexible(amount: string) {
    return flexibleWithdrawal(this.privateKey, this.provider, amount, this.addresses);
  }
}
