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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const User_1 = require("../models/User");
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('id', id);
        const user = yield User_1.User.findById(id);
        console.log('user', user);
        done(null, user);
    }
    catch (e) {
        done(e);
    }
}));
const localOptions = {
    usernameField: 'email',
};
const localStrategy = new passport_local_1.Strategy(localOptions, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    // called when passport.authenticate is called.
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Email not registered or incorrect password' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Email not registered or incorrect password' });
        }
        return done(null, user);
    }
    catch (e) {
        return done(e);
    }
}));
passport_1.default.use(localStrategy);
//# sourceMappingURL=passport.js.map