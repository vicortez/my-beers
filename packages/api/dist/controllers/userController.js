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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.logout = exports.login = exports.register = void 0;
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../models/User");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.register = register;
const login = (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            next(err);
            return;
        }
        if (!user) {
            res.status(401).send(info.message);
            next(null);
            return;
        }
        req.login(user, (errLogin) => {
            if (errLogin) {
                next(errLogin);
                return;
            }
            res.status(200).send({ expires: req.session.cookie.expires });
            next(null);
        });
    })(req, res, next);
};
exports.login = login;
const logout = (req, res, next) => {
    req.logout();
    res.send('ok');
};
exports.logout = logout;
const getUser = (req, res, next) => {
    res.send('TODO™');
};
exports.getUser = getUser;
//# sourceMappingURL=userController.js.map