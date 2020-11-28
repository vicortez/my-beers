"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.status(401).json({ msg: 'You are not authorized to view this resource' });
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authMiddleware.js.map