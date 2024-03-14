import { AwilixContainer } from "awilix";
import Stripe from "stripe";
export declare function constructWebhook({ signature, body, container, }: {
    signature: string | string[] | undefined;
    body: any;
    container: AwilixContainer;
}): Stripe.Event;
export declare function isPaymentCollection(id: any): any;
export declare function buildError(event: string, err: Stripe.StripeRawError): string;
export declare function handlePaymentHook({ event, container, paymentIntent, }: {
    event: Partial<Stripe.Event>;
    container: AwilixContainer;
    paymentIntent: Partial<Stripe.PaymentIntent>;
}): Promise<{
    statusCode: number;
}>;
