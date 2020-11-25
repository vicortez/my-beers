"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const passport_1 = __importDefault(require("passport"));
const register = (req, res, next) => {
    console.log('TODO');
};
exports.register = register;
const login = (req, res, next) => {
    console.log(req.session.id);
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            next(err);
        }
        if (!user) {
            res.status(400).send('not found');
        }
        // res.status(200).send('success')
    })(req, res, next);
};
exports.login = login;
const logout = (req, res, next) => {
    req.logOut();
};
exports.logout = logout;
//# sourceMappingURL=userController.js.map