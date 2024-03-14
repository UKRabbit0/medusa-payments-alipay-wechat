import StripeBase from "../core/stripe-base";
import { PaymentIntentOptions } from "../types";
declare class WechatProviderService extends StripeBase {
    static identifier: string;
    constructor(_: any, options: any);
    get paymentIntentOptions(): PaymentIntentOptions;
}
export default WechatProviderService;
