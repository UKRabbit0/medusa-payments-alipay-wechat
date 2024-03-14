import StripeBase from "../stripe-base";
import { PaymentIntentOptions } from "../../types";
export declare class StripeTest extends StripeBase {
    constructor(_: any, options: any);
    get paymentIntentOptions(): PaymentIntentOptions;
}
