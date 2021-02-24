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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpaController = void 0;
var helpers_1 = require("./helpers");
var puppeteer_1 = __importDefault(require("puppeteer"));
var helpers_2 = require("./helpers");
/**
 * @function
 * Final handler for the form submission route. rpaController uses Puppeteer and
 * helper functions to send supplied data to Frontier's submission form.
 * @param {*} req Request object
 * @param {*} res Response to return
 */
function rpaController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var candidateData, browser, page, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 24, , 25]);
                    candidateData = req.body;
                    return [4 /*yield*/, puppeteer_1.default.launch({ headless: true })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto('https://frontier.jobs/jobs/190562/apply/about', { waitUntil: 'networkidle2' })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.type('[name = "fullname"]', candidateData.firstname)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.type('[name = "lastname"]', candidateData.lastname)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.type('[name = "email"]', candidateData.email)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.type('[name = "phoneno"]', candidateData.phone)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page.click('[name = "location"]')];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, page.keyboard.type(candidateData.location)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, page.keyboard.press('ArrowDown')];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, page.keyboard.press('NumpadEnter')];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, page.type('[name = "linkedin"]', candidateData.linkedin)];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, page.click('[href="/jobs/190562/apply/resume"]')];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, helpers_1.downloadResume("https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx")];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, helpers_1.uploadResume(page)];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, page.click('[href="/jobs/190562/apply/review"]')];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(2000)];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, page.click('[href="/jobs/190562/apply/done"]')];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 23:
                    _a.sent();
                    browser.close();
                    res.status(201).json({ status: 'success', message: 'Your application has been sent, good luck!', data: candidateData });
                    return [3 /*break*/, 25];
                case 24:
                    error_1 = _a.sent();
                    helpers_2.logger('error', (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || error_1);
                    res.status(500).json({ status: 'failed', message: 'Something went wrong, please try again or contact support' });
                    return [3 /*break*/, 25];
                case 25: return [2 /*return*/];
            }
        });
    });
}
exports.rpaController = rpaController;
