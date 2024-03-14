import StripeBase from "../core/stripe-base";
import { PaymentIntentOptions, PaymentProviderKeys } from "../types";

class WechatProviderService extends StripeBase {
  static identifier = PaymentProviderKeys.WECHAT;

  constructor(_, options) {
    super(_, options);
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {
      payment_method_types: ["wechat_pay"],
      capture_method: "automatic",
    };
  }
}

export default WechatProviderService;
