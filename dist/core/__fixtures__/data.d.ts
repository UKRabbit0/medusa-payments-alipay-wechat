export declare const initiatePaymentContextWithExistingCustomer: {
    email: string;
    currency_code: string;
    amount: number;
    resource_id: string;
    customer: {};
    context: {};
    paymentSessionData: {};
};
export declare const initiatePaymentContextWithExistingCustomerStripeId: {
    email: string;
    currency_code: string;
    amount: number;
    resource_id: string;
    customer: {
        metadata: {
            stripe_id: string;
        };
    };
    context: {};
    paymentSessionData: {};
};
export declare const initiatePaymentContextWithWrongEmail: {
    email: string;
    currency_code: string;
    amount: number;
    resource_id: string;
    customer: {};
    context: {};
    paymentSessionData: {};
};
export declare const initiatePaymentContextWithFailIntentCreation: {
    email: string;
    currency_code: string;
    amount: number;
    resource_id: string;
    customer: {};
    context: {
        payment_description: string;
    };
    paymentSessionData: {};
};
export declare const authorizePaymentSuccessData: {
    id: string;
};
export declare const cancelPaymentSuccessData: {
    id: string;
};
export declare const cancelPaymentFailData: {
    id: string;
};
export declare const cancelPaymentPartiallyFailData: {
    id: string;
};
export declare const capturePaymentContextSuccessData: {
    paymentSessionData: {
        id: string;
    };
};
export declare const capturePaymentContextFailData: {
    paymentSessionData: {
        id: string;
    };
};
export declare const capturePaymentContextPartiallyFailData: {
    paymentSessionData: {
        id: string;
    };
};
export declare const deletePaymentSuccessData: {
    id: string;
};
export declare const deletePaymentFailData: {
    id: string;
};
export declare const deletePaymentPartiallyFailData: {
    id: string;
};
export declare const refundPaymentSuccessData: {
    id: string;
};
export declare const refundPaymentFailData: {
    id: string;
};
export declare const retrievePaymentSuccessData: {
    id: string;
};
export declare const retrievePaymentFailData: {
    id: string;
};
export declare const updatePaymentContextWithExistingCustomer: {
    email: string;
    currency_code: string;
    amount: number;
    resource_id: string;
    customer: {};
    context: {};
    paymentSessionData: {
        customer: string;
        amount: number;
    };
};
export declare const updatePaymentContextWithExistingCustomerStripeId: {
    email: string;
    currency_code: string;
    amount: number;
    resource_id: string;
    customer: {
        metadata: {
            stripe_id: string;
        };
    };
    context: {};
    paymentSessionData: {
        customer: string;
        amount: number;
    };
};
export declare const updatePaymentContextWithWrongEmail: {
    email: string;
    currency_code: string;
    amount: number;
    resource_id: string;
    customer: {};
    context: {};
    paymentSessionData: {
        customer: string;
        amount: number;
    };
};
export declare const updatePaymentContextWithDifferentAmount: {
    email: string;
    currency_code: string;
    amount: number;
    resource_id: string;
    customer: {
        metadata: {
            stripe_id: string;
        };
    };
    context: {};
    paymentSessionData: {
        id: string;
        customer: string;
        amount: number;
    };
};
export declare const updatePaymentContextFailWithDifferentAmount: {
    email: string;
    currency_code: string;
    amount: number;
    resource_id: string;
    customer: {
        metadata: {
            stripe_id: string;
        };
    };
    context: {
        metadata: {
            stripe_id: string;
        };
    };
    paymentSessionData: {
        id: string;
        customer: string;
        amount: number;
    };
};
export declare const updatePaymentDataWithAmountData: {
    sessionId: string;
    amount: number;
};
export declare const updatePaymentDataWithoutAmountData: {
    sessionId: string;
    customProp: string;
};
