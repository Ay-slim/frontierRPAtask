"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORM_URL = void 0;
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var controller_1 = require("./controller");
var helpers_1 = require("./helpers");
var validator_1 = require("./validator");
var app = express_1.default();
app.use(helmet_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(helpers_1.APP_USE_LIMIT);
exports.FORM_URL = '/forms/frontier/applications';
app.post(exports.FORM_URL, validator_1.validateCandidateData, controller_1.rpaController);
app.listen(process.env.PORT || 5500, function () {
    return console.log("App running on port " + (process.env.PORT || 5500));
});
exports.default = app;
