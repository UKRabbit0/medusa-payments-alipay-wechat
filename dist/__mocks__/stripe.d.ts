export declare const WRONG_CUSTOMER_EMAIL = "wrong@test.fr";
export declare const EXISTING_CUSTOMER_EMAIL = "right@test.fr";
export declare const STRIPE_ID = "test";
export declare const PARTIALLY_FAIL_INTENT_ID = "partially_unknown";
export declare const FAIL_INTENT_ID = "unknown";
export declare const StripeMock: {
    paymentIntents: {
        retrieve: any;
        update: any;
        create: any;
        cancel: any;
        capture: any;
    };
    refunds: {
        create: any;
    };
    customers: {
        create: any;
    };
};
declare const stripe: any;
export default stripe;
