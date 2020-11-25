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
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
require("./config/passport");
const routes_1 = require("./routes");
const app = express_1.default();
app.set('port', process.env.PORT || 8080);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const mongoURI = 'mongodb://localhost/my-beers';
    try {
        yield mongoose_1.default.connect(mongoURI, { useNewUrlParser: true });
        console.log(`Connected to database`);
    }
    catch (e) {
        console.error(e);
    }
}))();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_session_1.default({
    secret: 'banana',
    resave: true,
    saveUninitialized: true,
}));
// passport middleware
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/api', routes_1.apiRouter);
app.get('/test', (req, res) => res.send(new Date().toISOString()));
exports.server = app.listen(app.get('port'), () => console.log(`server running on port ${app.get('port')}`));
//# sourceMappingURL=server.js.map