"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var stripe_test_1 = require("../__fixtures__/stripe-test");
var data_1 = require("../../__fixtures__/data");
var medusa_1 = require("@medusajs/medusa");
var data_2 = require("../__fixtures__/data");
var stripe_1 = require("../../__mocks__/stripe");
var types_1 = require("../../types");
var container = {};
describe.skip("StripeTest", function () {
    describe("getPaymentStatus", function () {
        var _this = this;
        var stripeTest;
        beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
            var scopedContainer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scopedContainer = __assign({}, container);
                        stripeTest = new stripe_test_1.StripeTest(scopedContainer, { api_key: "test" });
                        return [4 /*yield*/, stripeTest.init()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        beforeEach(function () {
            jest.clearAllMocks();
        });
        it("should return the correct status", function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.getPaymentStatus({
                            id: data_1.PaymentIntentDataByStatus.REQUIRES_PAYMENT_METHOD.id,
                        })];
                    case 1:
                        status = _a.sent();
                        expect(status).toBe(medusa_1.PaymentSessionStatus.PENDING);
                        return [4 /*yield*/, stripeTest.getPaymentStatus({
                                id: data_1.PaymentIntentDataByStatus.REQUIRES_CONFIRMATION.id,
                            })];
                    case 2:
                        status = _a.sent();
                        expect(status).toBe(medusa_1.PaymentSessionStatus.PENDING);
                        return [4 /*yield*/, stripeTest.getPaymentStatus({
                                id: data_1.PaymentIntentDataByStatus.PROCESSING.id,
                            })];
                    case 3:
                        status = _a.sent();
                        expect(status).toBe(medusa_1.PaymentSessionStatus.PENDING);
                        return [4 /*yield*/, stripeTest.getPaymentStatus({
                                id: data_1.PaymentIntentDataByStatus.REQUIRES_ACTION.id,
                            })];
                    case 4:
                        status = _a.sent();
                        expect(status).toBe(medusa_1.PaymentSessionStatus.REQUIRES_MORE);
                        return [4 /*yield*/, stripeTest.getPaymentStatus({
                                id: data_1.PaymentIntentDataByStatus.CANCELED.id,
                            })];
                    case 5:
                        status = _a.sent();
                        expect(status).toBe(medusa_1.PaymentSessionStatus.CANCELED);
                        return [4 /*yield*/, stripeTest.getPaymentStatus({
                                id: data_1.PaymentIntentDataByStatus.REQUIRES_CAPTURE.id,
                            })];
                    case 6:
                        status = _a.sent();
                        expect(status).toBe(medusa_1.PaymentSessionStatus.AUTHORIZED);
                        return [4 /*yield*/, stripeTest.getPaymentStatus({
                                id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
                            })];
                    case 7:
                        status = _a.sent();
                        expect(status).toBe(medusa_1.PaymentSessionStatus.AUTHORIZED);
                        return [4 /*yield*/, stripeTest.getPaymentStatus({
                                id: "unknown-id",
                            })];
                    case 8:
                        status = _a.sent();
                        expect(status).toBe(medusa_1.PaymentSessionStatus.PENDING);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("initiatePayment", function () {
        var _this = this;
        var stripeTest;
        beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
            var scopedContainer;
            return __generator(this, function (_a) {
                scopedContainer = __assign({}, container);
                stripeTest = new stripe_test_1.StripeTest(scopedContainer, { api_key: "test" });
                return [2 /*return*/];
            });
        }); });
        beforeEach(function () {
            jest.clearAllMocks();
        });
        it("should succeed with an existing customer but no stripe id", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.initiatePayment(data_2.initiatePaymentContextWithExistingCustomer)];
                    case 1:
                        result = _a.sent();
                        expect(stripe_1.StripeMock.customers.create).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.customers.create).toHaveBeenCalledWith({
                            email: data_2.initiatePaymentContextWithExistingCustomer.email,
                        });
                        expect(stripe_1.StripeMock.paymentIntents.create).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.paymentIntents.create).toHaveBeenCalledWith(expect.objectContaining({
                            description: undefined,
                            amount: data_2.initiatePaymentContextWithExistingCustomer.amount,
                            currency: data_2.initiatePaymentContextWithExistingCustomer.currency_code,
                            metadata: {
                                resource_id: data_2.initiatePaymentContextWithExistingCustomer.resource_id,
                            },
                            capture_method: "manual",
                        }));
                        expect(result).toEqual(expect.objectContaining({
                            session_data: expect.any(Object),
                            update_requests: {
                                customer_metadata: {
                                    stripe_id: stripe_1.STRIPE_ID,
                                },
                            },
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it("should succeed with an existing customer with an existing stripe id", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.initiatePayment(data_2.initiatePaymentContextWithExistingCustomerStripeId)];
                    case 1:
                        result = _a.sent();
                        expect(stripe_1.StripeMock.customers.create).not.toHaveBeenCalled();
                        expect(stripe_1.StripeMock.paymentIntents.create).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.paymentIntents.create).toHaveBeenCalledWith(expect.objectContaining({
                            description: undefined,
                            amount: data_2.initiatePaymentContextWithExistingCustomer.amount,
                            currency: data_2.initiatePaymentContextWithExistingCustomer.currency_code,
                            metadata: {
                                resource_id: data_2.initiatePaymentContextWithExistingCustomer.resource_id,
                            },
                            capture_method: "manual",
                        }));
                        expect(result).toEqual(expect.objectContaining({
                            session_data: expect.any(Object),
                            update_requests: undefined,
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail on customer creation", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.initiatePayment(data_2.initiatePaymentContextWithWrongEmail)];
                    case 1:
                        result = _a.sent();
                        expect(stripe_1.StripeMock.customers.create).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.customers.create).toHaveBeenCalledWith({
                            email: data_2.initiatePaymentContextWithWrongEmail.email,
                        });
                        expect(stripe_1.StripeMock.paymentIntents.create).not.toHaveBeenCalled();
                        expect(result).toEqual({
                            error: "An error occurred in initiatePayment when creating a Stripe customer",
                            code: "",
                            detail: "Error",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail on payment intents creation", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.initiatePayment(data_2.initiatePaymentContextWithFailIntentCreation)];
                    case 1:
                        result = _a.sent();
                        expect(stripe_1.StripeMock.customers.create).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.customers.create).toHaveBeenCalledWith({
                            email: data_2.initiatePaymentContextWithFailIntentCreation.email,
                        });
                        expect(stripe_1.StripeMock.paymentIntents.create).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.paymentIntents.create).toHaveBeenCalledWith(expect.objectContaining({
                            description: data_2.initiatePaymentContextWithFailIntentCreation.context
                                .payment_description,
                            amount: data_2.initiatePaymentContextWithFailIntentCreation.amount,
                            currency: data_2.initiatePaymentContextWithFailIntentCreation.currency_code,
                            metadata: {
                                resource_id: data_2.initiatePaymentContextWithFailIntentCreation.resource_id,
                            },
                            capture_method: "manual",
                        }));
                        expect(result).toEqual({
                            error: "An error occurred in InitiatePayment during the creation of the stripe payment intent",
                            code: "",
                            detail: "Error",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("authorizePayment", function () {
        var _this = this;
        var stripeTest;
        beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
            var scopedContainer;
            return __generator(this, function (_a) {
                scopedContainer = __assign({}, container);
                stripeTest = new stripe_test_1.StripeTest(scopedContainer, { api_key: "test" });
                return [2 /*return*/];
            });
        }); });
        beforeEach(function () {
            jest.clearAllMocks();
        });
        it("should succeed", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.authorizePayment(data_2.authorizePaymentSuccessData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            data: data_2.authorizePaymentSuccessData,
                            status: medusa_1.PaymentSessionStatus.AUTHORIZED,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("cancelPayment", function () {
        var _this = this;
        var stripeTest;
        beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
            var scopedContainer;
            return __generator(this, function (_a) {
                scopedContainer = __assign({}, container);
                stripeTest = new stripe_test_1.StripeTest(scopedContainer, { api_key: "test" });
                return [2 /*return*/];
            });
        }); });
        beforeEach(function () {
            jest.clearAllMocks();
        });
        it("should succeed", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.cancelPayment(data_2.cancelPaymentSuccessData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail on intent cancellation but still return the intent", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.cancelPayment(data_2.cancelPaymentPartiallyFailData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: stripe_1.PARTIALLY_FAIL_INTENT_ID,
                            status: types_1.ErrorIntentStatus.CANCELED,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail on intent cancellation", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.cancelPayment(data_2.cancelPaymentFailData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            error: "An error occurred in cancelPayment",
                            code: "",
                            detail: "Error",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("capturePayment", function () {
        var _this = this;
        var stripeTest;
        beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
            var scopedContainer;
            return __generator(this, function (_a) {
                scopedContainer = __assign({}, container);
                stripeTest = new stripe_test_1.StripeTest(scopedContainer, { api_key: "test" });
                return [2 /*return*/];
            });
        }); });
        beforeEach(function () {
            jest.clearAllMocks();
        });
        it("should succeed", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.capturePayment(data_2.capturePaymentContextSuccessData.paymentSessionData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail on intent capture but still return the intent", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.capturePayment(data_2.capturePaymentContextPartiallyFailData.paymentSessionData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: stripe_1.PARTIALLY_FAIL_INTENT_ID,
                            status: types_1.ErrorIntentStatus.SUCCEEDED,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail on intent capture", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.capturePayment(data_2.capturePaymentContextFailData.paymentSessionData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            error: "An error occurred in capturePayment",
                            code: "",
                            detail: "Error",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("deletePayment", function () {
        var _this = this;
        var stripeTest;
        beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
            var scopedContainer;
            return __generator(this, function (_a) {
                scopedContainer = __assign({}, container);
                stripeTest = new stripe_test_1.StripeTest(scopedContainer, { api_key: "test" });
                return [2 /*return*/];
            });
        }); });
        beforeEach(function () {
            jest.clearAllMocks();
        });
        it("should succeed", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.cancelPayment(data_2.deletePaymentSuccessData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail on intent cancellation but still return the intent", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.cancelPayment(data_2.deletePaymentPartiallyFailData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: stripe_1.PARTIALLY_FAIL_INTENT_ID,
                            status: types_1.ErrorIntentStatus.CANCELED,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail on intent cancellation", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.cancelPayment(data_2.deletePaymentFailData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            error: "An error occurred in cancelPayment",
                            code: "",
                            detail: "Error",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("refundPayment", function () {
        var _this = this;
        var stripeTest;
        var refundAmount = 500;
        beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
            var scopedContainer;
            return __generator(this, function (_a) {
                scopedContainer = __assign({}, container);
                stripeTest = new stripe_test_1.StripeTest(scopedContainer, { api_key: "test" });
                return [2 /*return*/];
            });
        }); });
        beforeEach(function () {
            jest.clearAllMocks();
        });
        it("should succeed", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.refundPayment(data_2.refundPaymentSuccessData, refundAmount)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail on refund creation", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.refundPayment(data_2.refundPaymentFailData, refundAmount)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            error: "An error occurred in refundPayment",
                            code: "",
                            detail: "Error",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("retrievePayment", function () {
        var _this = this;
        var stripeTest;
        beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
            var scopedContainer;
            return __generator(this, function (_a) {
                scopedContainer = __assign({}, container);
                stripeTest = new stripe_test_1.StripeTest(scopedContainer, { api_key: "test" });
                return [2 /*return*/];
            });
        }); });
        beforeEach(function () {
            jest.clearAllMocks();
        });
        it("should succeed", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.retrievePayment(data_2.retrievePaymentSuccessData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: data_1.PaymentIntentDataByStatus.SUCCEEDED.id,
                            status: data_1.PaymentIntentDataByStatus.SUCCEEDED.status,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail on refund creation", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.retrievePayment(data_2.retrievePaymentFailData)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            error: "An error occurred in retrievePayment",
                            code: "",
                            detail: "Error",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("updatePayment", function () {
        var _this = this;
        var stripeTest;
        beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
            var scopedContainer;
            return __generator(this, function (_a) {
                scopedContainer = __assign({}, container);
                stripeTest = new stripe_test_1.StripeTest(scopedContainer, { api_key: "test" });
                return [2 /*return*/];
            });
        }); });
        beforeEach(function () {
            jest.clearAllMocks();
        });
        it("should succeed to initiate a payment with an existing customer but no stripe id", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.updatePayment(data_2.updatePaymentContextWithExistingCustomer)];
                    case 1:
                        result = _a.sent();
                        expect(stripe_1.StripeMock.customers.create).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.customers.create).toHaveBeenCalledWith({
                            email: data_2.updatePaymentContextWithExistingCustomer.email,
                        });
                        expect(stripe_1.StripeMock.paymentIntents.create).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.paymentIntents.create).toHaveBeenCalledWith(expect.objectContaining({
                            description: undefined,
                            amount: data_2.updatePaymentContextWithExistingCustomer.amount,
                            currency: data_2.updatePaymentContextWithExistingCustomer.currency_code,
                            metadata: {
                                resource_id: data_2.updatePaymentContextWithExistingCustomer.resource_id,
                            },
                            capture_method: "manual",
                        }));
                        expect(result).toEqual(expect.objectContaining({
                            session_data: expect.any(Object),
                            update_requests: {
                                customer_metadata: {
                                    stripe_id: stripe_1.STRIPE_ID,
                                },
                            },
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail to initiate a payment with an existing customer but no stripe id", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.updatePayment(data_2.updatePaymentContextWithWrongEmail)];
                    case 1:
                        result = _a.sent();
                        expect(stripe_1.StripeMock.customers.create).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.customers.create).toHaveBeenCalledWith({
                            email: data_2.updatePaymentContextWithWrongEmail.email,
                        });
                        expect(stripe_1.StripeMock.paymentIntents.create).not.toHaveBeenCalled();
                        expect(result).toEqual({
                            error: "An error occurred in updatePayment during the initiate of the new payment for the new customer",
                            code: "",
                            detail: "An error occurred in initiatePayment when creating a Stripe customer" +
                                os_1.EOL +
                                "Error",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should succeed but no update occurs when the amount did not changed", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.updatePayment(data_2.updatePaymentContextWithExistingCustomerStripeId)];
                    case 1:
                        result = _a.sent();
                        expect(stripe_1.StripeMock.paymentIntents.update).not.toHaveBeenCalled();
                        expect(result).not.toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should succeed to update the intent with the new amount", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.updatePayment(data_2.updatePaymentContextWithDifferentAmount)];
                    case 1:
                        result = _a.sent();
                        expect(stripe_1.StripeMock.paymentIntents.update).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.paymentIntents.update).toHaveBeenCalledWith(data_2.updatePaymentContextWithDifferentAmount.paymentSessionData.id, {
                            amount: data_2.updatePaymentContextWithDifferentAmount.amount,
                        });
                        expect(result).toEqual({
                            session_data: expect.objectContaining({
                                amount: data_2.updatePaymentContextWithDifferentAmount.amount,
                            }),
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail to update the intent with the new amount", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.updatePayment(data_2.updatePaymentContextFailWithDifferentAmount)];
                    case 1:
                        result = _a.sent();
                        expect(stripe_1.StripeMock.paymentIntents.update).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.paymentIntents.update).toHaveBeenCalledWith(data_2.updatePaymentContextFailWithDifferentAmount.paymentSessionData.id, {
                            amount: data_2.updatePaymentContextFailWithDifferentAmount.amount,
                        });
                        expect(result).toEqual({
                            error: "An error occurred in updatePayment",
                            code: "",
                            detail: "Error",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("updatePaymentData", function () {
        var _this = this;
        var stripeTest;
        beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
            var scopedContainer;
            return __generator(this, function (_a) {
                scopedContainer = __assign({}, container);
                stripeTest = new stripe_test_1.StripeTest(scopedContainer, { api_key: "test" });
                return [2 /*return*/];
            });
        }); });
        beforeEach(function () {
            jest.clearAllMocks();
        });
        it("should succeed to update the payment data", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.updatePaymentData(data_2.updatePaymentDataWithoutAmountData.sessionId, __assign(__assign({}, data_2.updatePaymentDataWithoutAmountData), { sessionId: undefined }))];
                    case 1:
                        result = _a.sent();
                        expect(stripe_1.StripeMock.paymentIntents.update).toHaveBeenCalled();
                        expect(stripe_1.StripeMock.paymentIntents.update).toHaveBeenCalledWith(data_2.updatePaymentDataWithoutAmountData.sessionId, {
                            customProp: data_2.updatePaymentDataWithoutAmountData.customProp,
                        });
                        expect(result).toEqual(expect.objectContaining({
                            customProp: data_2.updatePaymentDataWithoutAmountData.customProp,
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it("should fail to update the payment data if the amount is present", function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stripeTest.updatePaymentData(data_2.updatePaymentDataWithAmountData.sessionId, __assign(__assign({}, data_2.updatePaymentDataWithAmountData), { sessionId: undefined }))];
                    case 1:
                        result = _a.sent();
                        expect(stripe_1.StripeMock.paymentIntents.update).not.toHaveBeenCalled();
                        expect(result).toEqual({
                            error: "An error occurred in updatePaymentData",
                            code: undefined,
                            detail: "Cannot update amount, use updatePayment instead",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWJhc2Uuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL19fdGVzdHNfXy9zdHJpcGUtYmFzZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5QkFBd0I7QUFDeEIsMkRBQXdEO0FBQ3hELGdEQUFtRTtBQUNuRSwyQ0FBdUQ7QUFDdkQsNkNBMEI2QjtBQUM3QixpREFJK0I7QUFDL0IscUNBQStDO0FBRS9DLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQTtBQUVwQixRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtJQUMxQixRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFBQSxpQkF3RDVCO1FBdkRDLElBQUksVUFBVSxDQUFBO1FBRWQsU0FBUyxDQUFDOzs7Ozt3QkFDRixlQUFlLGdCQUFRLFNBQVMsQ0FBRSxDQUFBO3dCQUN4QyxVQUFVLEdBQUcsSUFBSSx3QkFBVSxDQUFDLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO3dCQUNqRSxxQkFBTSxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUF2QixTQUF1QixDQUFBOzs7O2FBQ3hCLENBQUMsQ0FBQTtRQUVGLFVBQVUsQ0FBQztZQUNULElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUN0QixDQUFDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRTs7Ozs0QkFHNUIscUJBQU0sVUFBVSxDQUFDLGdCQUFnQixDQUFDOzRCQUN6QyxFQUFFLEVBQUUsZ0NBQXlCLENBQUMsdUJBQXVCLENBQUMsRUFBRTt5QkFDekQsQ0FBQyxFQUFBOzt3QkFGRixNQUFNLEdBQUcsU0FFUCxDQUFBO3dCQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQW9CLENBQUMsT0FBTyxDQUFD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