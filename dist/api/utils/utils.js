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
exports.handlePaymentHook = exports.buildError = exports.isPaymentCollection = exports.constructWebhook = void 0;
var medusa_1 = require("@medusajs/medusa");
var utils_1 = require("@medusajs/utils");
var os_1 = require("os");
var PAYMENT_PROVIDER_KEY = "pp_stripe";
function constructWebhook(_a) {
    var signature = _a.signature, body = _a.body, container = _a.container;
    var stripeProviderService = container.resolve(PAYMENT_PROVIDER_KEY);
    return stripeProviderService.constructWebhookEvent(body, signature);
}
exports.constructWebhook = constructWebhook;
function isPaymentCollection(id) {
    return id && id.startsWith("paycol");
}
exports.isPaymentCollection = isPaymentCollection;
function buildError(event, err) {
    var _a, _b, _c;
    var message = "Stripe webhook ".concat(event, " handling failed").concat(os_1.EOL).concat((_a = err === null || err === void 0 ? void 0 : err.detail) !== null && _a !== void 0 ? _a : err === null || err === void 0 ? void 0 : err.message);
    if ((err === null || err === void 0 ? void 0 : err.code) === medusa_1.PostgresError.SERIALIZATION_FAILURE) {
        message = "Stripe webhook ".concat(event, " handle failed. This can happen when this webhook is triggered during a cart completion and can be ignored. This event should be retried automatically.").concat(os_1.EOL).concat((_b = err === null || err === void 0 ? void 0 : err.detail) !== null && _b !== void 0 ? _b : err === null || err === void 0 ? void 0 : err.message);
    }
    if ((err === null || err === void 0 ? void 0 : err.code) === "409") {
        message = "Stripe webhook ".concat(event, " handle failed.").concat(os_1.EOL).concat((_c = err === null || err === void 0 ? void 0 : err.detail) !== null && _c !== void 0 ? _c : err === null || err === void 0 ? void 0 : err.message);
    }
    return message;
}
exports.buildError = buildError;
function handlePaymentHook(_a) {
    var _b, _c, _d, _e;
    var event = _a.event, container = _a.container, paymentIntent = _a.paymentIntent;
    return __awaiter(this, void 0, void 0, function () {
        var logger, cartId, resourceId, _f, err_1, message, err_2, message, message;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    logger = container.resolve("logger");
                    cartId = (_c = (_b = paymentIntent.metadata) === null || _b === void 0 ? void 0 : _b.cart_id) !== null && _c !== void 0 ? _c : (_d = paymentIntent.metadata) === null || _d === void 0 ? void 0 : _d.resource_id // Backward compatibility
                    ;
                    resourceId = (_e = paymentIntent.metadata) === null || _e === void 0 ? void 0 : _e.resource_id;
                    _f = event.type;
                    switch (_f) {
                        case "payment_intent.succeeded": return [3 /*break*/, 1];
                        case "payment_intent.amount_capturable_updated": return [3 /*break*/, 5];
                        case "payment_intent.payment_failed": return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 10];
                case 1:
                    _g.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, onPaymentIntentSucceeded({
                            eventId: event.id,
                            paymentIntent: paymentIntent,
                            cartId: cartId,
                            resourceId: resourceId,
                            isPaymentCollection: isPaymentCollection(resourceId),
                            container: container,
                        })];
                case 2:
                    _g.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _g.sent();
                    message = buildError(event.type, err_1);
                    logger.warn(message);
                    return [2 /*return*/, { statusCode: 409 }];
                case 4: return [3 /*break*/, 11];
                case 5:
                    _g.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, onPaymentAmountCapturableUpdate({
                            eventId: event.id,
                            cartId: cartId,
                            container: container,
                        })];
                case 6:
                    _g.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_2 = _g.sent();
                    message = buildError(event.type, err_2);
                    logger.warn(message);
                    return [2 /*return*/, { statusCode: 409 }];
                case 8: return [3 /*break*/, 11];
                case 9:
                    {
                        message = paymentIntent.last_payment_error &&
                            paymentIntent.last_payment_error.message;
                        logger.error("The payment of the payment intent ".concat(paymentIntent.id, " has failed").concat(os_1.EOL).concat(message));
                        return [3 /*break*/, 11];
                    }
                    _g.label = 10;
                case 10: return [2 /*return*/, { statusCode: 204 }];
                case 11: return [2 /*return*/, { statusCode: 200 }];
            }
        });
    });
}
exports.handlePaymentHook = handlePaymentHook;
function onPaymentIntentSucceeded(_a) {
    var eventId = _a.eventId, paymentIntent = _a.paymentIntent, cartId = _a.cartId, resourceId = _a.resourceId, isPaymentCollection = _a.isPaymentCollection, container = _a.container;
    return __awaiter(this, void 0, void 0, function () {
        var manager;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    manager = container.resolve("manager");
                    return [4 /*yield*/, manager.transaction(function (transactionManager) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!isPaymentCollection) return [3 /*break*/, 2];
                                        return [4 /*yield*/, capturePaymenCollectiontIfNecessary({
                                                paymentIntent: paymentIntent,
                                                resourceId: resourceId,
                                                container: container,
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 2: return [4 /*yield*/, completeCartIfNecessary({
                                            eventId: eventId,
                                            cartId: cartId,
                                            container: container,
                                            transactionManager: transactionManager,
                                        })];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, capturePaymentIfNecessary({
                                                cartId: cartId,
                                                transactionManager: transactionManager,
                                                container: container,
                                            })];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function onPaymentAmountCapturableUpdate(_a) {
    var eventId = _a.eventId, cartId = _a.cartId, container = _a.container;
    return __awaiter(this, void 0, void 0, function () {
        var manager;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    manager = container.resolve("manager");
                    return [4 /*yield*/, manager.transaction(function (transactionManager) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, completeCartIfNecessary({
                                            eventId: eventId,
                                            cartId: cartId,
                                            container: container,
                                            transactionManager: transactionManager,
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function capturePaymenCollectiontIfNecessary(_a) {
    var _b;
    var paymentIntent = _a.paymentIntent, resourceId = _a.resourceId, container = _a.container;
    return __awaiter(this, void 0, void 0, function () {
        var manager, paymentCollectionService, paycol, payment_1;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    manager = container.resolve("manager");
                    paymentCollectionService = container.resolve("paymentCollectionService");
                    return [4 /*yield*/, paymentCollectionService
                            .retrieve(resourceId, { relations: ["payments"] })
                            .catch(function () { return undefined; })];
                case 1:
                    paycol = _c.sent();
                    if (!((_b = paycol === null || paycol === void 0 ? void 0 : paycol.payments) === null || _b === void 0 ? void 0 : _b.length)) return [3 /*break*/, 3];
                    payment_1 = paycol.payments.find(function (pay) { return pay.data.id === paymentIntent.id; });
                    if (!(payment_1 && !payment_1.captured_at)) return [3 /*break*/, 3];
                    return [4 /*yield*/, manager.transaction(function (manager) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, paymentCollectionService
                                            .withTransaction(manager)
                                            .capture(payment_1.id)]; // TODO: revisit - this method doesn't exists ATM
                                    case 1:
                                        _a.sent(); // TODO: revisit - this method doesn't exists ATM
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function capturePaymentIfNecessary(_a) {
    var cartId = _a.cartId, transactionManager = _a.transactionManager, container = _a.container;
    return __awaiter(this, void 0, void 0, function () {
        var orderService, order;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    orderService = container.resolve("orderService");
                    return [4 /*yield*/, orderService
                            .withTransaction(transactionManager)
                            .retrieveByCartId(cartId)
                            .catch(function () { return undefined; })];
                case 1:
                    order = _b.sent();
                    if (!(order && order.payment_status !== "captured")) return [3 /*break*/, 3];
                    return [4 /*yield*/, orderService
                            .withTransaction(transactionManager)
                            .capturePayment(order.id)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function completeCartIfNecessary(_a) {
    var _b;
    var eventId = _a.eventId, cartId = _a.cartId, container = _a.container, transactionManager = _a.transactionManager;
    return __awaiter(this, void 0, void 0, function () {
        var orderService, order, completionStrat, cartService, idempotencyKeyService, idempotencyKeyServiceTx, idempotencyKey, cart, _c, response_code, response_body;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    orderService = container.resolve("orderService");
                    return [4 /*yield*/, orderService
                            .retrieveByCartId(cartId)
                            .catch(function () { return undefined; })];
                case 1:
                    order = _d.sent();
                    if (!!order) return [3 /*break*/, 7];
                    completionStrat = container.resolve("cartCompletionStrategy");
                    cartService = container.resolve("cartService");
                    idempotencyKeyService = container.resolve("idempotencyKeyService");
                    idempotencyKeyServiceTx = idempotencyKeyService.withTransaction(transactionManager);
                    return [4 /*yield*/, idempotencyKeyServiceTx
                            .retrieve({
                            request_path: "/stripe/hooks",
                            idempotency_key: eventId,
                        })
                            .catch(function () { return undefined; })];
                case 2:
                    idempotencyKey = _d.sent();
                    if (!!idempotencyKey) return [3 /*break*/, 4];
                    return [4 /*yield*/, idempotencyKeyService
                            .withTransaction(transactionManager)
                            .create({
                            request_path: "/stripe/hooks",
                            idempotency_key: eventId,
                        })];
                case 3:
                    idempotencyKey = _d.sent();
                    _d.label = 4;
                case 4: return [4 /*yield*/, cartService
                        .withTransaction(transactionManager)
                        .retrieve(cartId, { select: ["context"] })];
                case 5:
                    cart = _d.sent();
                    return [4 /*yield*/, completionStrat
                            .withTransaction(transactionManager)
                            .complete(cartId, idempotencyKey, { ip: (_b = cart.context) === null || _b === void 0 ? void 0 : _b.ip })];
                case 6:
                    _c = _d.sent(), response_code = _c.response_code, response_body = _c.response_body;
                    if (response_code !== 200) {
                        throw new utils_1.MedusaError(utils_1.MedusaError.Types.UNEXPECTED_STATE, response_body["message"], response_body["code"]);
                    }
                    _d.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpL3V0aWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUt5QjtBQUN6Qix5Q0FBNkM7QUFFN0MseUJBQXdCO0FBR3hCLElBQU0sb0JBQW9CLEdBQUcsV0FBVyxDQUFBO0FBRXhDLFNBQWdCLGdCQUFnQixDQUFDLEVBUWhDO1FBUEMsU0FBUyxlQUFBLEVBQ1QsSUFBSSxVQUFBLEVBQ0osU0FBUyxlQUFBO0lBTVQsSUFBTSxxQkFBcUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDckUsT0FBTyxxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDckUsQ0FBQztBQVhELDRDQVdDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUMsRUFBRTtJQUNwQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ3RDLENBQUM7QUFGRCxrREFFQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxLQUFhLEVBQUUsR0FBMEI7O0lBQ2xFLElBQUksT0FBTyxHQUFHLHlCQUFrQixLQUFLLDZCQUFtQixRQUFHLFNBQ3pELE1BQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE1BQU0sbUNBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sQ0FDM0IsQ0FBQTtJQUNGLElBQUksQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsSUFBSSxNQUFLLHNCQUFhLENBQUMscUJBQXFCLEVBQUU7UUFDckQsT0FBTyxHQUFHLHlCQUFrQixLQUFLLG9LQUEwSixRQUFHLFNBQzVMLE1BQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE1BQU0sbUNBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sQ0FDM0IsQ0FBQTtLQUNIO0lBQ0QsSUFBSSxDQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxJQUFJLE1BQUssS0FBSyxFQUFFO1FBQ3ZCLE9BQU8sR0FBRyx5QkFBa0IsS0FBSyw0QkFBa0IsUUFBRyxTQUNwRCxNQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxNQUFNLG1DQUFJLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxPQUFPLENBQzNCLENBQUE7S0FDSDtJQUVELE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUM7QUFoQkQsZ0NBZ0JDO0FBRUQsU0FBc0IsaUJBQWlCLENBQUMsRUFRdkM7O1FBUEMsS0FBSyxXQUFBLEVBQ0wsU0FBUyxlQUFBLEVBQ1QsYUFBYSxtQkFBQTs7Ozs7O29CQU1QLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUVwQyxNQUFNLEdBQ1YsTUFBQSxNQUFBLGFBQWEsQ0FBQyxRQUFRLDBDQUFFLE9BQU8sbUNBQUksTUFBQSxhQUFhLENBQUMsUUFBUSwwQ0FBRSxXQUFXLENBQUMseUJBQXlCO29CQUExQixDQUFBO29CQUNsRSxVQUFVLEdBQUcsTUFBQSxhQUFhLENBQUMsUUFBUSwwQ0FBRSxXQUFXLENBQUE7b0JBRTlDLEtBQUEsS0FBSyxDQUFDLElBQUksQ0FBQTs7NkJBQ1gsMEJBQTBCLENBQUMsQ0FBM0Isd0JBQTBCOzZCQWlCMUIsMENBQTBDLENBQUMsQ0FBM0Msd0JBQTBDOzZCQWMxQywrQkFBK0IsQ0FBQyxDQUFoQyx3QkFBK0I7Ozs7O29CQTdCaEMscUJBQU0sd0JBQXdCLENBQUM7NEJBQzdCLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTs0QkFDakIsYUFBYSxlQUFBOzRCQUNiLE1BQU0sUUFBQTs0QkFDTixVQUFVLFlBQUE7NEJBQ1YsbUJBQW1CLEVBQUUsbUJBQW1CLENBQUMsVUFBVSxDQUFDOzRCQUNwRCxTQUFTLFdBQUE7eUJBQ1YsQ0FBQyxFQUFBOztvQkFQRixTQU9FLENBQUE7Ozs7b0JBRUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxDQUFBO29CQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUNwQixzQkFBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsRUFBQTt3QkFHNUIseUJBQUs7OztvQkFHSCxxQkFBTSwrQkFBK0IsQ0FBQzs0QkFDcEMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFOzRCQUNqQixNQUFNLFFBQUE7NEJBQ04sU0FBUyxXQUFBO3lCQUNWLENBQUMsRUFBQTs7b0JBSkYsU0FJRSxDQUFBOzs7O29CQUVJLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsQ0FBQTtvQkFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDcEIsc0JBQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEVBQUE7d0JBRzVCLHlCQUFLOztvQkFDK0I7d0JBQzlCLE9BQU8sR0FDWCxhQUFhLENBQUMsa0JBQWtCOzRCQUNoQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFBO3dCQUMxQyxNQUFNLENBQUMsS0FBSyxDQUNWLDRDQUFxQyxhQUFhLENBQUMsRUFBRSx3QkFBYyxRQUFHLFNBQUcsT0FBTyxDQUFFLENBQ25GLENBQUE7d0JBQ0QseUJBQUs7cUJBQ047O3lCQUVDLHNCQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxFQUFBO3lCQUc5QixzQkFBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsRUFBQTs7OztDQUMzQjtBQTdERCw4Q0E2REM7QUFFRCxTQUFlLHdCQUF3QixDQUFDLEVBT3ZDO1FBTkMsT0FBTyxhQUFBLEVBQ1AsYUFBYSxtQkFBQSxFQUNiLE1BQU0sWUFBQSxFQUNOLFVBQVUsZ0JBQUEsRUFDVixtQkFBbUIseUJBQUEsRUFDbkIsU0FBUyxlQUFBOzs7Ozs7O29CQUVILE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO29CQUU1QyxxQkFBTSxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQU8sa0JBQWtCOzs7OzZDQUM3QyxtQkFBbUIsRUFBbkIsd0JBQW1CO3dDQUNyQixxQkFBTSxtQ0FBbUMsQ0FBQztnREFDeEMsYUFBYSxlQUFBO2dEQUNiLFVBQVUsWUFBQTtnREFDVixTQUFTLFdBQUE7NkNBQ1YsQ0FBQyxFQUFBOzt3Q0FKRixTQUlFLENBQUE7OzRDQUVGLHFCQUFNLHVCQUF1QixDQUFDOzRDQUM1QixPQUFPLFNBQUE7NENBQ1AsTUFBTSxRQUFBOzRDQUNOLFNBQVMsV0FBQTs0Q0FDVCxrQkFBa0Isb0JBQUE7eUNBQ25CLENBQUMsRUFBQTs7d0NBTEYsU0FLRSxDQUFBO3dDQUVGLHFCQUFNLHlCQUF5QixDQUFDO2dEQUM5QixNQUFNLFFBQUE7Z0RBQ04sa0JBQWtCLG9CQUFBO2dEQUNsQixTQUFTLFdBQUE7NkNBQ1YsQ0FBQyxFQUFBOzt3Q0FKRixTQUlFLENBQUE7Ozs7OzZCQUVMLENBQUMsRUFBQTs7b0JBckJGLFNBcUJFLENBQUE7Ozs7O0NBQ0g7QUFFRCxTQUFlLCtCQUErQixDQUFDLEVBQThCO1FBQTVCLE9BQU8sYUFBQSxFQUFFLE1BQU0sWUFBQSxFQUFFLFNBQVMsZUFBQTs7Ozs7OztvQkFDbkUsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7b0JBRTVDLHFCQUFNLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBTyxrQkFBa0I7Ozs0Q0FDakQscUJBQU0sdUJBQXVCLENBQUM7NENBQzVCLE9BQU8sU0FBQTs0Q0FDUCxNQUFNLFFBQUE7NENBQ04sU0FBUyxXQUFBOzRDQUNULGtCQUFrQixvQkFBQTt5Q0FDbkIsQ0FBQyxFQUFBOzt3Q0FMRixTQUtFLENBQUE7Ozs7NkJBQ0gsQ0FBQyxFQUFBOztvQkFQRixTQU9FLENBQUE7Ozs7O0NBQ0g7QUFFRCxTQUFlLG1DQUFtQyxDQUFDLEVBSWxEOztRQUhDLGFBQWEsbUJBQUEsRUFDYixVQUFVLGdCQUFBLEVBQ1YsU0FBUyxlQUFBOzs7Ozs7O29CQUVILE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO29CQUN0Qyx3QkFBd0IsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUE7b0JBRS9ELHFCQUFNLHdCQUF3Qjs2QkFDMUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7NkJBQ2pELEtBQUssQ0FBQyxjQUFNLE9BQUEsU0FBUyxFQUFULENBQVMsQ0FBQyxFQUFBOztvQkFGbkIsTUFBTSxHQUFHLFNBRVU7eUJBRXJCLENBQUEsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsUUFBUSwwQ0FBRSxNQUFNLENBQUEsRUFBeEIsd0JBQXdCO29CQUNwQixZQUFVLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNsQyxVQUFDLEdBQUcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLGFBQWEsQ0FBQyxFQUFFLEVBQWhDLENBQWdDLENBQzFDLENBQUE7eUJBRUcsQ0FBQSxTQUFPLElBQUksQ0FBQyxTQUFPLENBQUMsV0FBVyxDQUFBLEVBQS9CLHdCQUErQjtvQkFDakMscUJBQU0sT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFPLE9BQU87Ozs0Q0FDdEMscUJBQU0sd0JBQXdCOzZDQUMzQixlQUFlLENBQUMsT0FBTyxDQUFDOzZDQUN4QixPQUFPLENBQUMsU0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFBLENBQUMsaURBQWlEOzt3Q0FGeEUsU0FFc0IsQ0FBQSxDQUFDLGlEQUFpRDs7Ozs2QkFDekUsQ0FBQyxFQUFBOztvQkFKRixTQUlFLENBQUE7Ozs7OztDQUdQO0FBRUQsU0FBZSx5QkFBeUIsQ0FBQyxFQUl4QztRQUhDLE1BQU0sWUFBQSxFQUNOLGtCQUFrQix3QkFBQSxFQUNsQixTQUFTLGVBQUE7Ozs7OztvQkFFSCxZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtvQkFDeEMscUJBQU0sWUFBWTs2QkFDN0IsZUFBZSxDQUFDLGtCQUFrQixDQUFDOzZCQUNuQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7NkJBQ3hCLEtBQUssQ0FBQyxjQUFNLE9BQUEsU0FBUyxFQUFULENBQVMsQ0FBQyxFQUFBOztvQkFIbkIsS0FBSyxHQUFHLFNBR1c7eUJBRXJCLENBQUEsS0FBSyxJQUFJLEtBQUssQ0FBQyxjQUFjLEtBQUssVUFBVSxDQUFBLEVBQTVDLHdCQUE0QztvQkFDOUMscUJBQU0sWUFBWTs2QkFDZixlQUFlLENBQUMsa0JBQWtCLENBQUM7NkJBQ25DLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUE7O29CQUYzQixTQUUyQixDQUFBOzs7Ozs7Q0FFOUI7QUFFRCxTQUFlLHVCQUF1QixDQUFDLEVBS3RDOztRQUpDLE9BQU8sYUFBQSxFQUNQLE1BQU0sWUFBQSxFQUNOLFNBQVMsZUFBQSxFQUNULGtCQUFrQix3QkFBQTs7Ozs7O29CQUVaLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFBO29CQUN4QyxxQkFBTSxZQUFZOzZCQUM3QixnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7NkJBQ3hCLEtBQUssQ0FBQyxjQUFNLE9BQUEsU0FBUyxFQUFULENBQVMsQ0FBQyxFQUFBOztvQkFGbkIsS0FBSyxHQUFHLFNBRVc7eUJBRXJCLENBQUMsS0FBSyxFQUFOLHdCQUFNO29CQUNGLGVBQWUsR0FBbUMsU0FBUyxDQUFDLE9BQU8sQ0FDdkUsd0JBQXdCLENBQ3pCLENBQUE7b0JBQ0ssV0FBVyxHQUFnQixTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO29CQUMzRCxxQkFBcUIsR0FBMEIsU0FBUyxDQUFDLE9BQU8sQ0FDcEUsdUJBQXVCLENBQ3hCLENBQUE7b0JBRUssdUJBQXVCLEdBQzNCLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO29CQUN0QyxxQkFBTSx1QkFBdUI7NkJBQy9DLFFBQVEsQ0FBQzs0QkFDUixZQUFZLEVBQUUsZUFBZTs0QkFDN0IsZUFBZSxFQUFFLE9BQU87eUJBQ3pCLENBQUM7NkJBQ0QsS0FBSyxDQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDLEVBQUE7O29CQUxyQixjQUFjLEdBQUcsU0FLSTt5QkFFckIsQ0FBQyxjQUFjLEVBQWYsd0JBQWU7b0JBQ0EscUJBQU0scUJBQXFCOzZCQUN6QyxlQUFlLENBQUMsa0JBQWtCLENBQUM7NkJBQ25DLE1BQU0sQ0FBQzs0QkFDTixZQUFZLEVBQUUsZUFBZTs0QkFDN0IsZUFBZSxFQUFFLE9BQU87eUJBQ3pCLENBQUMsRUFBQTs7b0JBTEosY0FBYyxHQUFHLFNBS2IsQ0FBQTs7d0JBR08scUJBQU0sV0FBVzt5QkFDM0IsZUFBZSxDQUFDLGtCQUFrQixDQUFDO3lCQUNuQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFBOztvQkFGdEMsSUFBSSxHQUFHLFNBRStCO29CQUVILHFCQUFNLGVBQWU7NkJBQzNELGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQzs2QkFDbkMsUUFBUSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxFQUFZLEVBQUUsQ0FBQyxFQUFBOztvQkFGakUsS0FBbUMsU0FFOEIsRUFGL0QsYUFBYSxtQkFBQSxFQUFFLGFBQWEsbUJBQUE7b0JBSXBDLElBQUksYUFBYSxLQUFLLEdBQUcsRUFBRTt3QkFDekIsTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUNsQyxhQUFhLENBQUMsU0FBUyxDQUFXLEVBQ2xDLGFBQWEsQ0FBQyxNQUFNLENBQVcsQ0FDaEMsQ0FBQTtxQkFDRjs7Ozs7O0NBRUoifQ==