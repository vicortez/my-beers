"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
const beerRouter_1 = require("./beerRouter");
const authMiddleware_1 = require("../middleware/authMiddleware");
const apiRouter = express_1.Router();
exports.apiRouter = apiRouter;
apiRouter.use('/users', userRouter_1.userRouter);
apiRouter.use('/beers', authMiddleware_1.isAuthenticated, beerRouter_1.beerRouter);
//# sourceMappingURL=index.js.map