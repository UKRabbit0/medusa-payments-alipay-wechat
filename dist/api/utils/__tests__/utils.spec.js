"use strict";
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
var medusa_1 = require("@medusajs/medusa");
var os_1 = require("os");
var container_1 = require("../__fixtures__/container");
var data_1 = require("../__fixtures__/data");
var utils_1 = require("../utils");
describe("Utils", function () {
    afterEach(function () {
        jest.clearAllMocks();
    });
    describe("isPaymentCollection", function () {
        it("should return return true if starts with paycol otherwise return false", function () {
            var result = (0, utils_1.isPaymentCollection)("paycol_test");
            expect(result).toBeTruthy();
            result = (0, utils_1.isPaymentCollection)("nopaycol_test");
            expect(result).toBeFalsy();
        });
    });
    describe("buildError", function () {
        it("should return the appropriate error message", function () {
            var event = "test_event";
            var error = {
                code: medusa_1.PostgresError.SERIALIZATION_FAILURE,
                detail: "some details",
            };
            var message = (0, utils_1.buildError)(event, error);
            expect(message).toBe("Stripe webhook ".concat(event, " handle failed. This can happen when this webhook is triggered during a cart completion and can be ignored. This event should be retried automatically.").concat(os_1.EOL).concat(error.detail));
            event = "test_event";
            error = {
                code: "409",
                detail: "some details",
            };
            message = (0, utils_1.buildError)(event, error);
            expect(message).toBe("Stripe webhook ".concat(event, " handle failed.").concat(os_1.EOL).concat(error.detail));
            event = "test_event";
            error = {
                code: "",
                detail: "some details",
            };
            message = (0, utils_1.buildError)(event, error);
            expect(message).toBe("Stripe webhook ".concat(event, " handling failed").concat(os_1.EOL).concat(error.detail));
        });
    });
    describe("handlePaymentHook", function () {
        describe("on event type payment_intent.succeeded", function () {
            describe("in a payment context", function () {
                it("should complete the cart on non existing order", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var event, paymentIntent, orderService, cartCompletionStrategy, idempotencyKeyService, cartService;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                event = { id: "event", type: "payment_intent.succeeded" };
                                paymentIntent = {
                                    id: data_1.paymentIntentId,
                                    metadata: { cart_id: data_1.nonExistingCartId },
                                };
                                return [4 /*yield*/, (0, utils_1.handlePaymentHook)({ event: event, container: container_1.container, paymentIntent: paymentIntent })];
                            case 1:
                                _a.sent();
                                orderService = container_1.container.resolve("orderService");
                                cartCompletionStrategy = container_1.container.resolve("cartCompletionStrategy");
                                idempotencyKeyService = container_1.container.resolve("idempotencyKeyService");
                                cartService = container_1.container.resolve("cartService");
                                expect(orderService.retrieveByCartId).toHaveBeenCalled();
                                expect(orderService.retrieveByCartId).toHaveBeenCalledWith(paymentIntent.metadata.cart_id);
                                expect(idempotencyKeyService.retrieve).toHaveBeenCalled();
                                expect(idempotencyKeyService.retrieve).toHaveBeenCalledWith({
                                    request_path: "/stripe/hooks",
                                    idempotency_key: event.id,
                                });
                                expect(idempotencyKeyService.create).toHaveBeenCalled();
                                expect(idempotencyKeyService.create).toHaveBeenCalledWith({
                                    request_path: "/stripe/hooks",
                                    idempotency_key: event.id,
                                });
                                expect(cartService.retrieve).toHaveBeenCalled();
                                expect(cartService.retrieve).toHaveBeenCalledWith(paymentIntent.metadata.cart_id, { select: ["context"] });
                                expect(cartCompletionStrategy.complete).toHaveBeenCalled();
                                expect(cartCompletionStrategy.complete).toHaveBeenCalledWith(paymentIntent.metadata.cart_id, {}, { id: undefined });
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("should not try to complete the cart on existing order", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var event, paymentIntent, orderService, cartCompletionStrategy, idempotencyKeyService, cartService;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                event = { id: "event", type: "payment_intent.succeeded" };
                                paymentIntent = {
                                    id: data_1.paymentIntentId,
                                    metadata: { cart_id: data_1.existingCartId },
                                };
                                return [4 /*yield*/, (0, utils_1.handlePaymentHook)({ event: event, container: container_1.container, paymentIntent: paymentIntent })];
                            case 1:
                                _a.sent();
                                orderService = container_1.container.resolve("orderService");
                                cartCompletionStrategy = container_1.container.resolve("cartCompletionStrategy");
                                idempotencyKeyService = container_1.container.resolve("idempotencyKeyService");
                                cartService = container_1.container.resolve("cartService");
                                expect(orderService.retrieveByCartId).toHaveBeenCalled();
                                expect(orderService.retrieveByCartId).toHaveBeenCalledWith(paymentIntent.metadata.cart_id);
                                expect(idempotencyKeyService.retrieve).not.toHaveBeenCalled();
                                expect(idempotencyKeyService.create).not.toHaveBeenCalled();
                                expect(cartService.retrieve).not.toHaveBeenCalled();
                                expect(cartCompletionStrategy.complete).not.toHaveBeenCalled();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("should capture the payment if not already captured", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var event, paymentIntent, orderService;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                event = { id: "event", type: "payment_intent.succeeded" };
                                paymentIntent = {
                                    id: data_1.paymentIntentId,
                                    metadata: { cart_id: data_1.existingCartId },
                                };
                                return [4 /*yield*/, (0, utils_1.handlePaymentHook)({ event: event, container: container_1.container, paymentIntent: paymentIntent })];
                            case 1:
                                _a.sent();
                                orderService = container_1.container.resolve("orderService");
                                expect(orderService.retrieveByCartId).toHaveBeenCalled();
                                expect(orderService.retrieveByCartId).toHaveBeenCalledWith(paymentIntent.metadata.cart_id);
                                expect(orderService.capturePayment).toHaveBeenCalled();
                                expect(orderService.capturePayment).toHaveBeenCalledWith(data_1.orderIdForExistingCartId);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("should not capture the payment if already captured", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var event, paymentIntent, orderService;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                event = { id: "event", type: "payment_intent.succeeded" };
                                paymentIntent = {
                                    id: data_1.paymentIntentId,
                                    metadata: { cart_id: data_1.existingCartIdWithCapturedStatus },
                                };
                                return [4 /*yield*/, (0, utils_1.handlePaymentHook)({ event: event, container: container_1.container, paymentIntent: paymentIntent })];
                            case 1:
                                _a.sent();
                                orderService = container_1.container.resolve("orderService");
                                expect(orderService.retrieveByCartId).toHaveBeenCalled();
                                expect(orderService.retrieveByCartId).toHaveBeenCalledWith(paymentIntent.metadata.cart_id);
                                expect(orderService.capturePayment).not.toHaveBeenCalled();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe("in a payment collection context", function () {
                it("should capture the payment collection if not already captured", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var event, paymentIntent, paymentCollectionService;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                event = { id: "event", type: "payment_intent.succeeded" };
                                paymentIntent = {
                                    id: data_1.paymentIntentId,
                                    metadata: { resource_id: data_1.existingResourceNotCapturedId },
                                };
                                return [4 /*yield*/, (0, utils_1.handlePaymentHook)({ event: event, container: container_1.container, paymentIntent: paymentIntent })];
                            case 1:
                                _a.sent();
                                paymentCollectionService = container_1.container.resolve("paymentCollectionService");
                                expect(paymentCollectionService.retrieve).toHaveBeenCalled();
                                expect(paymentCollectionService.retrieve).toHaveBeenCalledWith(paymentIntent.metadata.resource_id, { relations: ["payments"] });
                                expect(paymentCollectionService.capture).toHaveBeenCalled();
                                expect(paymentCollectionService.capture).toHaveBeenCalledWith(data_1.paymentId);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("should not capture the payment collection if already captured", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var event, paymentIntent, paymentCollectionService;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                event = { id: "event", type: "payment_intent.succeeded" };
                                paymentIntent = {
                                    id: data_1.paymentIntentId,
                                    metadata: { resource_id: data_1.existingResourceId },
                                };
                                return [4 /*yield*/, (0, utils_1.handlePaymentHook)({ event: event, container: container_1.container, paymentIntent: paymentIntent })];
                            case 1:
                                _a.sent();
                                paymentCollectionService = container_1.container.resolve("paymentCollectionService");
                                expect(paymentCollectionService.retrieve).toHaveBeenCalled();
                                expect(paymentCollectionService.retrieve).toHaveBeenCalledWith(paymentIntent.metadata.resource_id, { relations: ["payments"] });
                                expect(paymentCollectionService.capture).not.toHaveBeenCalled();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe("on event type payment_intent.amount_capturable_updated", function () {
            it("should complete the cart on non existing order", function () { return __awaiter(void 0, void 0, void 0, function () {
                var event, paymentIntent, orderService, cartCompletionStrategy, idempotencyKeyService, cartService;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            event = {
                                id: "event",
                                type: "payment_intent.amount_capturable_updated",
                            };
                            paymentIntent = {
                                id: data_1.paymentIntentId,
                                metadata: { cart_id: data_1.nonExistingCartId },
                            };
                            return [4 /*yield*/, (0, utils_1.handlePaymentHook)({ event: event, container: container_1.container, paymentIntent: paymentIntent })];
                        case 1:
                            _a.sent();
                            orderService = container_1.container.resolve("orderService");
                            cartCompletionStrategy = container_1.container.resolve("cartCompletionStrategy");
                            idempotencyKeyService = container_1.container.resolve("idempotencyKeyService");
                            cartService = container_1.container.resolve("cartService");
                            expect(orderService.retrieveByCartId).toHaveBeenCalled();
                            expect(orderService.retrieveByCartId).toHaveBeenCalledWith(paymentIntent.metadata.cart_id);
                            expect(idempotencyKeyService.retrieve).toHaveBeenCalled();
                            expect(idempotencyKeyService.retrieve).toHaveBeenCalledWith({
                                request_path: "/stripe/hooks",
                                idempotency_key: event.id,
                            });
                            expect(idempotencyKeyService.create).toHaveBeenCalled();
                            expect(idempotencyKeyService.create).toHaveBeenCalledWith({
                                request_path: "/stripe/hooks",
                                idempotency_key: event.id,
                            });
                            expect(cartService.retrieve).toHaveBeenCalled();
                            expect(cartService.retrieve).toHaveBeenCalledWith(paymentIntent.metadata.cart_id, { select: ["context"] });
                            expect(cartCompletionStrategy.complete).toHaveBeenCalled();
                            expect(cartCompletionStrategy.complete).toHaveBeenCalledWith(paymentIntent.metadata.cart_id, {}, { id: undefined });
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should not try to complete the cart on existing order", function () { return __awaiter(void 0, void 0, void 0, function () {
                var event, paymentIntent, orderService, cartCompletionStrategy, idempotencyKeyService, cartService;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            event = {
                                id: "event",
                                type: "payment_intent.amount_capturable_updated",
                            };
                            paymentIntent = {
                                id: data_1.paymentIntentId,
                                metadata: { cart_id: data_1.existingCartId },
                            };
                            return [4 /*yield*/, (0, utils_1.handlePaymentHook)({ event: event, container: container_1.container, paymentIntent: paymentIntent })];
                        case 1:
                            _a.sent();
                            orderService = container_1.container.resolve("orderService");
                            cartCompletionStrategy = container_1.container.resolve("cartCompletionStrategy");
                            idempotencyKeyService = container_1.container.resolve("idempotencyKeyService");
                            cartService = container_1.container.resolve("cartService");
                            expect(orderService.retrieveByCartId).toHaveBeenCalled();
                            expect(orderService.retrieveByCartId).toHaveBeenCalledWith(paymentIntent.metadata.cart_id);
                            expect(idempotencyKeyService.retrieve).not.toHaveBeenCalled();
                            expect(idempotencyKeyService.create).not.toHaveBeenCalled();
                            expect(cartService.retrieve).not.toHaveBeenCalled();
                            expect(cartCompletionStrategy.complete).not.toHaveBeenCalled();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("on event type payment_intent.payment_failed", function () {
            it("should log the error", function () { return __awaiter(void 0, void 0, void 0, function () {
                var event, paymentIntent, logger;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            event = { id: "event", type: "payment_intent.payment_failed" };
                            paymentIntent = {
                                id: data_1.paymentIntentId,
                                metadata: { cart_id: data_1.nonExistingCartId },
                                last_payment_error: { message: "error message" },
                            };
                            return [4 /*yield*/, (0, utils_1.handlePaymentHook)({ event: event, container: container_1.container, paymentIntent: paymentIntent })];
                        case 1:
                            _a.sent();
                            logger = container_1.container.resolve("logger");
                            expect(logger.error).toHaveBeenCalled();
                            expect(logger.error).toHaveBeenCalledWith("The payment of the payment intent ".concat(paymentIntent.id, " has failed").concat(os_1.EOL).concat(paymentIntent.last_payment_error.message));
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvdXRpbHMvX190ZXN0c19fL3V0aWxzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ0Q7QUFDaEQseUJBQXdCO0FBR3hCLHVEQUFxRDtBQUNyRCw2Q0FTNkI7QUFDN0Isa0NBQTZFO0FBRTdFLFFBQVEsQ0FBQyxPQUFPLEVBQUU7SUFDaEIsU0FBUyxDQUFDO1FBQ1IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBRUYsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzlCLEVBQUUsQ0FBQyx3RUFBd0UsRUFBRTtZQUMzRSxJQUFJLE1BQU0sR0FBRyxJQUFBLDJCQUFtQixFQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtZQUUzQixNQUFNLEdBQUcsSUFBQSwyQkFBbUIsRUFBQyxlQUFlLENBQUMsQ0FBQTtZQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDckIsRUFBRSxDQUFDLDZDQUE2QyxFQUFFO1lBQ2hELElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQTtZQUN4QixJQUFJLEtBQUssR0FBRztnQkFDVixJQUFJLEVBQUUsc0JBQWEsQ0FBQyxxQkFBcUI7Z0JBQ3pDLE1BQU0sRUFBRSxjQUFjO2FBQ0UsQ0FBQTtZQUUxQixJQUFJLE9BQU8sR0FBRyxJQUFBLGtCQUFVLEVBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2xCLHlC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