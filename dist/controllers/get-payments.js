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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStripePayments = void 0;
function getStripePayments(req) {
    return __awaiter(this, void 0, void 0, function () {
        var order_id, orderService, stripeBase, order, paymentIds, swapPayments, payments;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order_id = req.params.order_id;
                    orderService = req.scope.resolve("orderService");
                    stripeBase = req.scope.resolve("stripeProviderService");
                    return [4 /*yield*/, orderService.retrieve(order_id, {
                            relations: ["payments", "swaps", "swaps.payment", "region"],
                        })];
                case 1:
                    order = _a.sent();
                    paymentIds = order.payments
                        .filter(function (p) { return p.provider_id === "stripe"; })
                        .map(function (p) { return ({ id: p.data.id, type: "order" }); });
                    if (order.swaps.length) {
                        swapPayments = order.swaps
                            .filter(function (p) { return p.payment.provider_id === "stripe"; })
                            .map(function (p) { return ({ id: p.payment.data.id, type: "swap" }); });
                        paymentIds.push.apply(paymentIds, __spreadArray([], __read(swapPayments), false));
                    }
                    return [4 /*yield*/, Promise.all(paymentIds.map(function (payment) { return __awaiter(_this, void 0, void 0, function () {
                            var intent, charge;
                            var _a, _b, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0: return [4 /*yield*/, stripeBase
                                            .getStripe()
                                            .paymentIntents.retrieve(payment.id, {
                                            expand: ["latest_charge"],
                                        })];
                                    case 1:
                                        intent = _e.sent();
                                        charge = intent.latest_charge;
                                        return [2 /*return*/, {
                                                id: intent.id,
                                                amount: intent.amount,
                                                created: intent.created,
                                                risk_score: (_b = (_a = charge === null || charge === void 0 ? void 0 : charge.outcome) === null || _a === void 0 ? void 0 : _a.risk_score) !== null && _b !== void 0 ? _b : null,
                                                risk_level: (_d = (_c = charge === null || charge === void 0 ? void 0 : charge.outcome) === null || _c === void 0 ? void 0 : _c.risk_level) !== null && _d !== void 0 ? _d : null,
                                                type: payment.type,
                                                region: order.region,
                                            }];
                                }
                            });
                        }); }))];
                case 2:
                    payments = _a.sent();
                    return [2 /*return*/, payments];
            }
        });
    });
}
exports.getStripePayments = getStripePayments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXBheW1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2dldC1wYXltZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsU0FBc0IsaUJBQWlCLENBQUMsR0FBRzs7Ozs7OztvQkFDakMsUUFBUSxHQUFLLEdBQUcsQ0FBQyxNQUFNLFNBQWYsQ0FBZTtvQkFFekIsWUFBWSxHQUFpQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtvQkFDOUQsVUFBVSxHQUFlLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUE7b0JBRTNELHFCQUFNLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFOzRCQUNsRCxTQUFTLEVBQUUsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLENBQUM7eUJBQzVELENBQUMsRUFBQTs7b0JBRkksS0FBSyxHQUFHLFNBRVo7b0JBRUksVUFBVSxHQUFHLEtBQUssQ0FBQyxRQUFRO3lCQUM5QixNQUFNLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBMUIsQ0FBMEIsQ0FBQzt5QkFDekMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQVksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFBO29CQUUzRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUNoQixZQUFZLEdBQUcsS0FBSyxDQUFDLEtBQUs7NkJBQzdCLE1BQU0sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBbEMsQ0FBa0MsQ0FBQzs2QkFDakQsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQW5ELENBQW1ELENBQUMsQ0FBQTt3QkFFbEUsVUFBVSxDQUFDLElBQUksT0FBZixVQUFVLDJCQUFTLFlBQVksV0FBQztxQkFDakM7b0JBRWdCLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2hDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBTyxPQUFPOzs7Ozs0Q0FDWixxQkFBTSxVQUFVOzZDQUM1QixTQUFTLEVBQUU7NkNBQ1gsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFOzRDQUNuQyxNQUFNLEVBQUUsQ0FBQyxlQUFlLENBQUM7eUNBQzFCLENBQUMsRUFBQTs7d0NBSkUsTUFBTSxHQUFHLFNBSVg7d0NBRUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUE4QixDQUFBO3dDQUVwRCxzQkFBTztnREFDTCxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0RBQ2IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO2dEQUNyQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87Z0RBQ3ZCLFVBQVUsRUFBRSxNQUFBLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE9BQU8sMENBQUUsVUFBVSxtQ0FBSSxJQUFJO2dEQUMvQyxVQUFVLEVBQUUsTUFBQSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFPLDBDQUFFLFVBQVUsbUNBQUksSUFBSTtnREFDL0MsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUF3QjtnREFDdEMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNOzZDQUNyQixFQUFBOzs7NkJBQ0YsQ0FBQyxDQUNILEVBQUE7O29CQXBCSyxRQUFRLEdBQUcsU0FvQmhCO29CQUVELHNCQUFPLFFBQVEsRUFBQTs7OztDQUNoQjtBQTdDRCw4Q0E2Q0MifQ==