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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const User_1 = require("../models/User");
const userController_1 = require("../controllers/userController");
const userRouter = express_1.Router();
exports.userRouter = userRouter;
userRouter.post('/register', celebrate_1.celebrate({
    body: {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().min(3).required(),
        passwordConf: celebrate_1.Joi.string().equal(celebrate_1.Joi.ref('password')),
    },
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, passwordConf } = req.body;
    const errs = [];
    if (!email || !password || !passwordConf) {
        errs.push({
            msg: 'please provide email and password',
        });
    }
    if (password !== passwordConf) {
        errs.push({ msg: "passwords don't match" });
    }
    const exists = yield User_1.User.findOne({ email });
    if (!exists) {
        const user = new User_1.User({ email, password });
        const savedUser = yield user.save();
        res.send(savedUser.email);
    }
    else {
        errs.push({ msg: 'email is already registered' });
    }
    res.status(422).send(errs);
}));
userRouter.post('/login', userController_1.login);
userRouter.get('/logout', userController_1.logout);
userRouter.use(celebrate_1.errors());
//# sourceMappingURL=user.js.map