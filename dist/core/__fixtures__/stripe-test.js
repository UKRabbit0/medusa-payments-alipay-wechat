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
exports.StripeTest = void 0;
var stripe_base_1 = __importDefault(require("../stripe-base"));
var StripeTest = /** @class */ (function (_super) {
    __extends(StripeTest, _super);
    function StripeTest(_, options) {
        return _super.call(this, _, options) || this;
    }
    Object.defineProperty(StripeTest.prototype, "paymentIntentOptions", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    return StripeTest;
}(stripe_base_1.default));
exports.StripeTest = StripeTest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLXRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9fX2ZpeHR1cmVzX18vc3RyaXBlLXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQXVDO0FBR3ZDO0lBQWdDLDhCQUFVO0lBQ3hDLG9CQUFZLENBQUMsRUFBRSxPQUFPO2VBQ3BCLGtCQUFNLENBQUMsRUFBRSxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELHNCQUFJLDRDQUFvQjthQUF4QjtZQUNFLE9BQU8sRUFBRSxDQUFBO1FBQ1gsQ0FBQzs7O09BQUE7SUFDSCxpQkFBQztBQUFELENBQUMsQUFSRCxDQUFnQyxxQkFBVSxHQVF6QztBQVJZLGdDQUFVIn0=