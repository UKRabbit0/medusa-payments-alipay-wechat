"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var body_parser_1 = require("body-parser");
exports.config = {
    routes: [
        {
            bodyParser: false,
            matcher: "/stripe/hooks",
            middlewares: [(0, body_parser_1.raw)({ type: "application/json" })],
        },
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDJDQUFpQztBQUVwQixRQUFBLE1BQU0sR0FBc0I7SUFDdkMsTUFBTSxFQUFFO1FBQ047WUFDRSxVQUFVLEVBQUUsS0FBSztZQUNqQixPQUFPLEVBQUUsZUFBZTtZQUN4QixXQUFXLEVBQUUsQ0FBQyxJQUFBLGlCQUFHLEVBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1NBQ2pEO0tBQ0Y7Q0FDRixDQUFBIn0=