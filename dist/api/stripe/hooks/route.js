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
exports.POST = void 0;
var utils_1 = require("../../utils/utils");
var POST = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pluginOptions, event, eventBus, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pluginOptions = req.scope.resolve("stripeProviderService").options;
                event = (0, utils_1.constructWebhook)({
                    signature: req.headers["stripe-signature"],
                    body: req.body,
                    container: req.scope,
                });
                eventBus = req.scope.resolve("eventBusService");
                // we delay the processing of the event to avoid a conflict caused by a race condition
                return [4 /*yield*/, eventBus.emit("medusa.stripe_payment_intent_update", event, {
                        delay: pluginOptions.webhook_delay || 5000,
                        attempts: pluginOptions.webhook_retries || 3,
                    })];
            case 1:
                // we delay the processing of the event to avoid a conflict caused by a race condition
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).send("Webhook Error: ".concat(err_1.message));
                return [2 /*return*/];
            case 3:
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); };
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3N0cmlwZS9ob29rcy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBb0Q7QUFHN0MsSUFBTSxJQUFJLEdBQUcsVUFBTyxHQUFrQixFQUFFLEdBQW1COzs7Ozs7Z0JBRXhELGFBQWEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDckMsdUJBQXVCLENBQ3hCLENBQUMsT0FBTyxDQUFBO2dCQUVILEtBQUssR0FBRyxJQUFBLHdCQUFnQixFQUFDO29CQUM3QixTQUFTLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztvQkFDMUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO29CQUNkLFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSztpQkFDckIsQ0FBQyxDQUFBO2dCQUVJLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO2dCQUVyRCxzRkFBc0Y7Z0JBQ3RGLHFCQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMscUNBQXFDLEVBQUUsS0FBSyxFQUFFO3dCQUNoRSxLQUFLLEVBQUUsYUFBYSxDQUFDLGFBQWEsSUFBSSxJQUFJO3dCQUMxQyxRQUFRLEVBQUUsYUFBYSxDQUFDLGVBQWUsSUFBSSxDQUFDO3FCQUM3QyxDQUFDLEVBQUE7O2dCQUpGLHNGQUFzRjtnQkFDdEYsU0FHRSxDQUFBOzs7O2dCQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUFrQixLQUFHLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQTtnQkFDckQsc0JBQU07O2dCQUdSLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7Ozs7S0FDcEIsQ0FBQTtBQXpCWSxRQUFBLElBQUksUUF5QmhCIn0=