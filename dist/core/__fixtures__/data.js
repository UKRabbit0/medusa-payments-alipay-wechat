"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentDataWithoutAmountData = exports.updatePaymentDataWithAmountData = exports.updatePaymentContextFailWithDifferentAmount = exports.updatePaymentContextWithDifferentAmount = exports.updatePaymentContextWithWrongEmail = exports.updatePaymentContextWithExistingCustomerStripeId = exports.updatePaymentContextWithExistingCustomer = exports.retrievePaymentFailData = exports.retrievePaymentSuccessData = exports.refundPaymentFailData = exports.refundPaymentSuccessData = exports.deletePaymentPartiallyFailData = exports.deletePaymentFailData = exports.deletePaymentSuccessData = exports.capturePaymentContextPartiallyFailData = exports.capturePaymentContextFailData = exports.capturePaymentContextSuccessData = exports.cancelPaymentPartiallyFailData = exports.cancelPaymentFailData = exports.cancelPaymentSuccessData = exports.authorizePaymentSuccessData = exports.initiatePaymentContextWithFailIntentCreation = exports.initiatePaymentContextWithWrongEmail = exports.initiatePaymentContextWithExistingCustomerStripeId = exports.initiatePaymentContextWithExistingCustomer = void 0;
var stripe_1 = require("../../__mocks__/stripe");
var data_1 = require("../../__fixtures__/data");
// INITIATE PAYMENT DATA
exports.initiatePaymentContextWithExistingCustomer = {
    email: stripe_1.EXISTING_CUSTOMER_EMAIL,
    currency_code: "usd",
    amount: 1000,
    resource_id: "test",
    customer: {},
    context: {},
    paymentSessionData: {},
};
exports.initiatePaymentContextWithExistingCustomerStripeId = {
    email: stripe_1.EXISTING_CUSTOMER_EMAIL,
    currency_code: "usd",
    amount: 1000,
    resource_id: "test",
    customer: {
        metadata: {
            stripe_id: "test",
        },
    },
    context: {},
    paymentSessionData: {},
};
exports.initiatePaymentContextWithWrongEmail = {
    email: stripe_1.WRONG_CUSTOMER_EMAIL,
    currency_code: "usd",
    amount: 1000,
    resource_id: "test",
    customer: {},
    context: {},
    paymentSessionData: {},
};
exports.initiatePaymentContextWithFailIntentCreation = {
    email: stripe_1.EXISTING_CUSTOMER_EMAIL,
    currency_code: "usd",
    amount: 1000,
    resource_id: "test",
    customer: {},
    context: {
        payment_description: "fail",
    },
    paymentSessionData: {},
};
// AUTHORIZE PAYMENT DATA
exports.authorizePaymentSuccessData = {
    id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
};
// CANCEL PAYMENT DATA
exports.cancelPaymentSuccessData = {
    id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
};
exports.cancelPaymentFailData = {
    id: stripe_1.FAIL_INTENT_ID,
};
exports.cancelPaymentPartiallyFailData = {
    id: stripe_1.PARTIALLY_FAIL_INTENT_ID,
};
// CAPTURE PAYMENT DATA
exports.capturePaymentContextSuccessData = {
    paymentSessionData: {
        id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
    },
};
exports.capturePaymentContextFailData = {
    paymentSessionData: {
        id: stripe_1.FAIL_INTENT_ID,
    },
};
exports.capturePaymentContextPartiallyFailData = {
    paymentSessionData: {
        id: stripe_1.PARTIALLY_FAIL_INTENT_ID,
    },
};
// DELETE PAYMENT DATA
exports.deletePaymentSuccessData = {
    id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
};
exports.deletePaymentFailData = {
    id: stripe_1.FAIL_INTENT_ID,
};
exports.deletePaymentPartiallyFailData = {
    id: stripe_1.PARTIALLY_FAIL_INTENT_ID,
};
// REFUND PAYMENT DATA
exports.refundPaymentSuccessData = {
    id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
};
exports.refundPaymentFailData = {
    id: stripe_1.FAIL_INTENT_ID,
};
// RETRIEVE PAYMENT DATA
exports.retrievePaymentSuccessData = {
    id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
};
exports.retrievePaymentFailData = {
    id: stripe_1.FAIL_INTENT_ID,
};
// UPDATE PAYMENT DATA
exports.updatePaymentContextWithExistingCustomer = {
    email: stripe_1.EXISTING_CUSTOMER_EMAIL,
    currency_code: "usd",
    amount: 1000,
    resource_id: "test",
    customer: {},
    context: {},
    paymentSessionData: {
        customer: "test",
        amount: 1000,
    },
};
exports.updatePaymentContextWithExistingCustomerStripeId = {
    email: stripe_1.EXISTING_CUSTOMER_EMAIL,
    currency_code: "usd",
    amount: 1000,
    resource_id: "test",
    customer: {
        metadata: {
            stripe_id: "test",
        },
    },
    context: {},
    paymentSessionData: {
        customer: "test",
        amount: 1000,
    },
};
exports.updatePaymentContextWithWrongEmail = {
    email: stripe_1.WRONG_CUSTOMER_EMAIL,
    currency_code: "usd",
    amount: 1000,
    resource_id: "test",
    customer: {},
    context: {},
    paymentSessionData: {
        customer: "test",
        amount: 1000,
    },
};
exports.updatePaymentContextWithDifferentAmount = {
    email: stripe_1.WRONG_CUSTOMER_EMAIL,
    currency_code: "usd",
    amount: 2000,
    resource_id: "test",
    customer: {
        metadata: {
            stripe_id: "test",
        },
    },
    context: {},
    paymentSessionData: {
        id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
        customer: "test",
        amount: 1000,
    },
};
exports.updatePaymentContextFailWithDifferentAmount = {
    email: stripe_1.WRONG_CUSTOMER_EMAIL,
    currency_code: "usd",
    amount: 2000,
    resource_id: "test",
    customer: {
        metadata: {
            stripe_id: "test",
        },
    },
    context: {
        metadata: {
            stripe_id: "test",
        },
    },
    paymentSessionData: {
        id: stripe_1.FAIL_INTENT_ID,
        customer: "test",
        amount: 1000,
    },
};
exports.updatePaymentDataWithAmountData = {
    sessionId: stripe_1.STRIPE_ID,
    amount: 2000,
};
exports.updatePaymentDataWithoutAmountData = {
    sessionId: stripe_1.STRIPE_ID,
    customProp: "test",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL19fZml4dHVyZXNfXy9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlEQU0rQjtBQUMvQixnREFBbUU7QUFFbkUsd0JBQXdCO0FBRVgsUUFBQSwwQ0FBMEMsR0FBRztJQUN4RCxLQUFLLEVBQUUsZ0NBQXVCO0lBQzlCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLE1BQU0sRUFBRSxJQUFJO0lBQ1osV0FBVyxFQUFFLE1BQU07SUFDbkIsUUFBUSxFQUFFLEVBQUU7SUFDWixPQUFPLEVBQUUsRUFBRTtJQUNYLGtCQUFrQixFQUFFLEVBQUU7Q0FDdkIsQ0FBQTtBQUVZLFFBQUEsa0RBQWtELEdBQUc7SUFDaEUsS0FBSyxFQUFFLGdDQUF1QjtJQUM5QixhQUFhLEVBQUUsS0FBSztJQUNwQixNQUFNLEVBQUUsSUFBSTtJQUNaLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFFBQVEsRUFBRTtRQUNSLFFBQVEsRUFBRTtZQUNSLFNBQVMsRUFBRSxNQUFNO1NBQ2xCO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsRUFBRTtJQUNYLGtCQUFrQixFQUFFLEVBQUU7Q0FDdkIsQ0FBQTtBQUVZLFFBQUEsb0NBQW9DLEdBQUc7SUFDbEQsS0FBSyxFQUFFLDZCQUFvQjtJQUMzQixhQUFhLEVBQUUsS0FBSztJQUNwQixNQUFNLEVBQUUsSUFBSTtJQUNaLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFFBQVEsRUFBRSxFQUFFO0lBQ1osT0FBTyxFQUFFLEVBQUU7SUFDWCxrQkFBa0IsRUFBRSxFQUFFO0NBQ3ZCLENBQUE7QUFFWSxRQUFBLDRDQUE0QyxHQUFHO0lBQzFELEtBQUssRUFBRSxnQ0FBdUI7SUFDOUIsYUFBYSxFQUFFLEtBQUs7SUFDcEIsTUFBTSxFQUFFLElBQUk7SUFDWixXQUFXLEVBQUUsTUFBTTtJQUNuQixRQUFRLEVBQUUsRUFBRTtJQUNaLE9BQU8sRUFBRTtRQUNQLG1CQUFt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