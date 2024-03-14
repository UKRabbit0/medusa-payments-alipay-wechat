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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeMock = exports.FAIL_INTENT_ID = exports.PARTIALLY_FAIL_INTENT_ID = exports.STRIPE_ID = exports.EXISTING_CUSTOMER_EMAIL = exports.WRONG_CUSTOMER_EMAIL = void 0;
var data_1 = require("../__fixtures__/data");
var stripe_1 = __importDefault(require("stripe"));
var types_1 = require("../types");
exports.WRONG_CUSTOMER_EMAIL = "wrong@test.fr";
exports.EXISTING_CUSTOMER_EMAIL = "right@test.fr";
exports.STRIPE_ID = "test";
exports.PARTIALLY_FAIL_INTENT_ID = "partially_unknown";
exports.FAIL_INTENT_ID = "unknown";
exports.StripeMock = {
    paymentIntents: {
        retrieve: jest.fn().mockImplementation(function (paymentId) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                if (paymentId === exports.FAIL_INTENT_ID) {
                    throw new Error("Error");
                }
                return [2 /*return*/, (_a = Object.values(data_1.PaymentIntentDataByStatus).find(function (value) {
                        return value.id === paymentId;
                    })) !== null && _a !== void 0 ? _a : {}];
            });
        }); }),
        update: jest.fn().mockImplementation(function (paymentId, updateData) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            var _a;
            return __generator(this, function (_b) {
                if (paymentId === exports.FAIL_INTENT_ID) {
                    throw new Error("Error");
                }
                data = (_a = Object.values(data_1.PaymentIntentDataByStatus).find(function (value) {
                    return value.id === paymentId;
                })) !== null && _a !== void 0 ? _a : {};
                return [2 /*return*/, __assign(__assign({}, data), updateData)];
            });
        }); }),
        create: jest.fn().mockImplementation(function (data) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (data.description === "fail") {
                    throw new Error("Error");
                }
                return [2 /*return*/, data];
            });
        }); }),
        cancel: jest.fn().mockImplementation(function (paymentId) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (paymentId === exports.FAIL_INTENT_ID) {
                    throw new Error("Error");
                }
                if (paymentId === exports.PARTIALLY_FAIL_INTENT_ID) {
                    throw new stripe_1.default.errors.StripeError({
                        code: types_1.ErrorCodes.PAYMENT_INTENT_UNEXPECTED_STATE,
                        payment_intent: {
                            id: paymentId,
                            status: types_1.ErrorIntentStatus.CANCELED
                        },
                        type: "invalid_request_error"
                    });
                }
                return [2 /*return*/, { id: paymentId }];
            });
        }); }),
        capture: jest.fn().mockImplementation(function (paymentId) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (paymentId === exports.FAIL_INTENT_ID) {
                    throw new Error("Error");
                }
                if (paymentId === exports.PARTIALLY_FAIL_INTENT_ID) {
                    throw new stripe_1.default.errors.StripeError({
                        code: types_1.ErrorCodes.PAYMENT_INTENT_UNEXPECTED_STATE,
                        payment_intent: {
                            id: paymentId,
                            status: types_1.ErrorIntentStatus.SUCCEEDED
                        },
                        type: "invalid_request_error"
                    });
                }
                return [2 /*return*/, { id: paymentId }];
            });
        }); })
    },
    refunds: {
        create: jest.fn().mockImplementation(function (_a) {
            var paymentId = _a.payment_intent;
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    if (paymentId === exports.FAIL_INTENT_ID) {
                        throw new Error("Error");
                    }
                    return [2 /*return*/, { id: paymentId }];
                });
            });
        })
    },
    customers: {
        create: jest.fn().mockImplementation(function (data) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (data.email === exports.EXISTING_CUSTOMER_EMAIL) {
                    return [2 /*return*/, __assign({ id: exports.STRIPE_ID }, data)];
                }
                throw new Error("Error");
            });
        }); })
    },
};
var stripe = jest.fn(function () { return exports.StripeMock; });
exports.default = stripe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL19fbW9ja3NfXy9zdHJpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBZ0U7QUFDaEUsa0RBQTRCO0FBQzVCLGtDQUF5RDtBQUU1QyxRQUFBLG9CQUFvQixHQUFHLGVBQWUsQ0FBQTtBQUN0QyxRQUFBLHVCQUF1QixHQUFHLGVBQWUsQ0FBQTtBQUN6QyxRQUFBLFNBQVMsR0FBRyxNQUFNLENBQUE7QUFDbEIsUUFBQSx3QkFBd0IsR0FBRyxtQkFBbUIsQ0FBQTtBQUM5QyxRQUFBLGNBQWMsR0FBRyxTQUFTLENBQUE7QUFFMUIsUUFBQSxVQUFVLEdBQUc7SUFDeEIsY0FBYyxFQUFFO1FBQ2QsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFPLFNBQVM7OztnQkFDckQsSUFBSSxTQUFTLEtBQUssc0JBQWMsRUFBRTtvQkFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtpQkFDekI7Z0JBRUQsc0JBQU8sTUFBQSxNQUFNLENBQUMsTUFBTSxDQUFDLGdDQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSzt3QkFDeEQsT0FBTyxLQUFLLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBQTtvQkFDL0IsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsRUFBQTs7YUFDVCxDQUFDO1FBQ0YsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFPLFNBQVMsRUFBRSxVQUFVOzs7O2dCQUMvRCxJQUFJLFNBQVMsS0FBSyxzQkFBYyxFQUFFO29CQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2lCQUN6QjtnQkFFSyxJQUFJLEdBQUcsTUFBQSxNQUFNLENBQUMs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