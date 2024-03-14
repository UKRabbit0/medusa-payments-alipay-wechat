import { Region } from "@medusajs/medusa";
export interface StripeOptions {
    api_key: string;
    webhook_secret: string;
    /**
     * Use this flag to capture payment immediately (default is false)
     */
    capture?: boolean;
    /**
     * set `automatic_payment_methods` to `{ enabled: true }`
     */
    automatic_payment_methods?: boolean;
    /**
     * Set a default description on the intent if the context does not provide one
     */
    payment_description?: string;
    /**
     * The delay in milliseconds before processing the webhook event.
     * @defaultValue 5000
     */
    webhook_delay?: number;
    /**
     * The number of times to retry the webhook event processing in case of an error.
     * @defaultValue 3
     */
    webhook_retries?: number;
}
export interface PaymentIntentOptions {
    capture_method?: "automatic" | "manual";
    setup_future_usage?: "on_session" | "off_session";
    payment_method_types?: string[];
}
export declare const ErrorCodes: {
    PAYMENT_INTENT_UNEXPECTED_STATE: string;
};
export declare const ErrorIntentStatus: {
    SUCCEEDED: string;
    CANCELED: string;
};
export declare const PaymentProviderKeys: {
    STRIPE: string;
    BAN_CONTACT: string;
    BLIK: string;
    GIROPAY: string;
    IDEAL: string;
    PRZELEWY_24: string;
    ALIPAY: string;
    WECHAT: string;
};
export type WidgetPayment = {
    id: string;
    amount: number;
    created: number;
    risk_score: number | null;
    risk_level: string | null;
    region: Region;
    type: "order" | "swap";
};
export type ListStripeIntentRes = {
    payments: WidgetPayment[];
};
