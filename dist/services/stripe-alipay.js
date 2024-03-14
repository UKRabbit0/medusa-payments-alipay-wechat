"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var stripe_base_1 = __importDefault(require("../core/stripe-base"));
var types_1 = require("../types");
var AlipayProviderService = /** @class */ (function (_super) {
    __extends(AlipayProviderService, _super);
    function AlipayProviderService(_, options) {
        return _super.call(this, _, options) || this;
    }
    Object.defineProperty(AlipayProviderService.prototype, "paymentIntentOptions", {
        get: function () {
            return {
                payment_method_types: ["alipay"],
                capture_method: "automatic",
            };
        },
        enumerable: false,
        configurable: true
    });
    AlipayProviderService.identifier = types_1.PaymentProviderKeys.ALIPAY;
    return AlipayProviderService;
}(stripe_base_1.default));
exports.default = AlipayProviderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWFsaXBheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9zdHJpcGUtYWxpcGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtDQUFxRTtBQUVyRTtJQUFvQyx5Q0FBVTtJQUc1QywrQkFBWSxDQUFDLEVBQUUsT0FBTztlQUNwQixrQkFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxzQkFBSSx1REFBb0I7YUFBeEI7WUFDRSxPQUFPO2dCQUNMLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNoQyxjQUFjLEVBQUUsV0FBVzthQUM1QixDQUFDO1FBQ0osQ0FBQzs7O09BQUE7SUFYTSxnQ0FBVSxHQUFHLDJCQUFtQixDQUFDLE1BQU0sQ0FBQztJQVlqRCw0QkFBQztDQUFBLEFBYkQsQ0FBb0MscUJBQVUsR0FhN0M7QUFFRCxrQkFBZSxxQkFBcUIsQ0FBQyJ9