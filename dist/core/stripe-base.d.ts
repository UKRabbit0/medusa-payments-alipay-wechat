import { AbstractPaymentProcessor, PaymentProcessorContext, PaymentProcessorError, PaymentProcessorSessionResponse, PaymentSessionStatus } from "@medusajs/medusa";
import Stripe from "stripe";
import { PaymentIntentOptions, StripeOptions } from "../types";
declare abstract class StripeBase extends AbstractPaymentProcessor {
    static identifier: string;
    protected readonly options_: StripeOptions;
    protected stripe_: Stripe;
    protected constructor(_: any, options: any);
    protected init(): void;
    abstract get paymentIntentOptions(): PaymentIntentOptions;
    get options(): StripeOptions;
    getStripe(): Stripe;
    getPaymentIntentOptions(): PaymentIntentOptions;
    getPaymentStatus(paymentSessionData: Record<string, unknown>): Promise<PaymentSessionStatus>;
    initiatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | PaymentProcessorSessionResponse>;
    authorizePayment(paymentSessionData: Record<string, unknown>, context: Record<string, unknown>): Promise<PaymentProcessorError | {
        status: PaymentSessionStatus;
        data: PaymentProcessorSessionResponse["session_data"];
    }>;
    cancelPayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]>;
    capturePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]>;
    deletePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]>;
    refundPayment(paymentSessionData: Record<string, unknown>, refundAmount: number): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]>;
    retrievePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]>;
    updatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | PaymentProcessorSessionResponse | void>;
    updatePaymentData(sessionId: string, data: Record<string, unknown>): Promise<Record<string, unknown> | PaymentProcessorError>;
    /**
     * Constructs Stripe Webhook event
     * @param {object} data - the data of the webhook request: req.body
     * @param {object} signature - the Stripe signature on the event, that
     *    ensures integrity of the webhook event
     * @return {object} Stripe Webhook event
     */
    constructWebhookEvent(data: any, signature: any): Stripe.Event;
    protected buildError(message: string, error: Stripe.StripeRawError | PaymentProcessorError | Error): PaymentProcessorError;
}
export default StripeBase;
