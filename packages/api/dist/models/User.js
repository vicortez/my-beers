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
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// hooks
UserSchema.pre('save', function cb(next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isNew || user.isModified('password')) {
            try {
                const salt = yield bcryptjs_1.default.genSalt(9);
                const hash = yield bcryptjs_1.default.hash(user.password, salt);
                user.password = hash;
                next();
            }
            catch (e) {
                next(e);
            }
        }
        else {
            next();
        }
    });
});
exports.User = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map