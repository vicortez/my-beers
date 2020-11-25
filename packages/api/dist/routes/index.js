"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const user_1 = require("./user");
const apiRouter = express_1.Router();
exports.apiRouter = apiRouter;
apiRouter.use('/users', user_1.userRouter);
//# sourceMappingURL=index.js.map