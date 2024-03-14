import StripeBase from "../core/stripe-base";
import { PaymentIntentOptions, PaymentProviderKeys } from "../types";

class AlipayProviderService extends StripeBase {
  static identifier = PaymentProviderKeys.ALIPAY;

  constructor(_, options) {
    super(_, options);
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {
      payment_method_types: ["alipay"],
      capture_method: "automatic",
    };
  }
}

export default AlipayProviderService;
