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
exports.container = void 0;
var awilix_1 = require("awilix");
var data_1 = require("./data");
exports.container = (0, awilix_1.createContainer)();
exports.container.register("logger", (0, awilix_1.asValue)({
    warn: jest.fn(),
    error: jest.fn(),
}));
exports.container.register("manager", (0, awilix_1.asValue)({
    transaction: function (cb) {
        return cb(this);
    },
}));
exports.container.register("idempotencyKeyService", (0, awilix_1.asValue)({
    withTransaction: function () {
        return this;
    },
    retrieve: jest.fn().mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, undefined];
    }); }); }),
    create: jest.fn().mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, ({})];
    }); }); }),
}));
exports.container.register("cartCompletionStrategy", (0, awilix_1.asValue)({
    withTransaction: function () {
        return this;
    },
    complete: jest.fn(),
}));
exports.container.register("cartService", (0, awilix_1.asValue)({
    withTransaction: function () {
        return this;
    },
    retrieve: jest.fn().mockReturnValue({ context: {} }),
}));
exports.container.register("orderService", (0, awilix_1.asValue)({
    withTransaction: function () {
        return this;
    },
    retrieveByCartId: jest.fn().mockImplementation(function (cartId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (cartId === data_1.existingCartId) {
                return [2 /*return*/, {
                        id: data_1.orderIdForExistingCartId,
                        payment_status: "pending",
                    }];
            }
            if (cartId === data_1.existingCartIdWithCapturedStatus) {
                return [2 /*return*/, {
                        id: "order-1",
                        payment_status: "captured",
                    }];
            }
            if (cartId === data_1.throwingCartId) {
                throw new Error("Error");
            }
            if (cartId === data_1.nonExistingCartId) {
                return [2 /*return*/, undefined];
            }
            return [2 /*return*/, {}];
        });
    }); }),
    capturePayment: jest.fn(),
}));
exports.container.register("paymentCollectionService", (0, awilix_1.asValue)({
    withTransaction: function () {
        return this;
    },
    retrieve: jest.fn().mockImplementation(function (resourceId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (resourceId === data_1.existingResourceId) {
                return [2 /*return*/, {
                        id: data_1.existingResourceId,
                        payments: [
                            {
                                id: data_1.paymentId,
                                data: {
                                    id: data_1.paymentIntentId,
                                },
                                captured_at: "date",
                            },
                        ],
                    }];
            }
            if (resourceId === data_1.existingResourceNotCapturedId) {
                return [2 /*return*/, {
                        id: data_1.existingResourceNotCapturedId,
                        payments: [
                            {
                                id: data_1.paymentId,
                                data: {
                                    id: data_1.paymentIntentId,
                                },
                                captured_at: null,
                            },
                        ],
                    }];
            }
            return [2 /*return*/, {}];
        });
    }); }),
    capture: jest.fn(),
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS91dGlscy9fX2ZpeHR1cmVzX18vY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFpRDtBQUNqRCwrQkFVZTtBQUVGLFFBQUEsU0FBUyxHQUFHLElBQUEsd0JBQWUsR0FBRSxDQUFBO0FBQzFDLGlCQUFTLENBQUMsUUFBUSxDQUNoQixRQUFRLEVBQ1IsSUFBQSxnQkFBTyxFQUFDO0lBQ04sSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtDQUNqQixDQUFDLENBQ0gsQ0FBQTtBQUVELGlCQUFTLENBQUMsUUFBUSxDQUNoQixTQUFTLEVBQ1QsSUFBQSxnQkFBTyxFQUFDO0lBQ04sV0FBVyxFQUFFLFVBQVUsRUFBRTtRQUN2QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqQixDQUFDO0NBQ0YsQ0FBQyxDQUNILENBQUE7QUFFRCxpQkFBUyxDQUFDLFFBQVEsQ0FDaEIsdUJBQXVCLEVBQ3ZCLElBQUEsZ0JBQU8sRUFBQztJQUNOLGVBQWUsRUFBRTtRQUNmLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUNELFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUM7UUFBWSxzQkFBQSxTQUFTLEVBQUE7YUFBQSxDQUFDO0lBQzdELE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUM7UUFBWSxzQkFBQSxDQUFDLEVBQUUsQ0FBQyxFQUFBO2FBQUEsQ0FBQztDQUN2RCxDQUFDLENBQ0gsQ0FBQTtBQUVELGlCQUFTLENBQUMsUUFBUSxDQUNoQix3QkFBd0IsRUFDeEIsSUFBQSxnQkFBTyxFQUFDO0lBQ04sZUFBZSxF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