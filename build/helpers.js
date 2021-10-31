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
exports.asyncCompletionViaWebHook = exports.logger = exports.APP_USE_LIMIT = exports.downloadResume = exports.uploadResume = void 0;
var path_1 = __importDefault(require("path"));
var request_1 = __importDefault(require("request"));
var fs_1 = __importDefault(require("fs"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var winston_1 = __importDefault(require("winston"));
var dotenv_1 = require("dotenv");
dotenv_1.config();
var resumePath = path_1.default.resolve('resume');
var WEBHOOKURL = process.env.WEBHOOKURL;
/**
 * @function
 * Clicks on the resume upload button and sends the file path for upload
 * @param {*} page Page object from the controller
 */
function uploadResume(page) {
    return __awaiter(this, void 0, void 0, function () {
        var fileChooser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        page.waitForFileChooser(),
                        page.click('[class="sc-dOSReg lhXIuw"]'),
                    ])];
                case 1:
                    fileChooser = (_a.sent())[0];
                    return [4 /*yield*/, fileChooser.accept([resumePath])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.uploadResume = uploadResume;
/**
 * @function
 * Downloads candidate's resume from a supplied url
 * @param {*} url Link containing resume
 **/
var downloadResume = function (url) {
    var file = fs_1.default.createWriteStream(resumePath);
    var sendReq = request_1.default.get(url);
    // verify response code
    sendReq.on('response', function (response) {
        if (response.statusCode !== 200) {
            return ('Download did not work');
        }
        sendReq.pipe(file);
    });
    file.on('finish', function () { return file.close(); });
};
exports.downloadResume = downloadResume;
/**
 * @constant
 * DDOS attack preventer. App should not allow a user
 * make more than 600 requests every 10 minutes i.e a request per second
 */
exports.APP_USE_LIMIT = express_rate_limit_1.default({
    windowMs: 10 * 60 * 1000,
    max: 600,
    message: 'Too many requests from this user, please try again after 5 minutes',
});
var myformat = winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.printf(function (info) { return info.timestamp + " " + info.level + " " + info.message + " " + info.stack; }));
/**
 * Winston logger. Logs any caught errors to file
 */
var errorLogger = winston_1.default.createLogger({
    level: 'warning',
    transports: [
        new winston_1.default.transports.File({
            filename: 'error.log',
            level: 'warning',
            maxsize: 500,
            format: myformat
        }),
        new winston_1.default.transports.Console({
            format: myformat,
        }),
    ],
});
function logger(level, logInfo) {
    return errorLogger.log(level, logInfo);
}
exports.logger = logger;
function asyncCompletionViaWebHook(packet) {
    return __awaiter(this, void 0, void 0, function () {
        function sendWebHook(body) {
            request_1.default.post(webhook, {
                body: body
            });
        }
        var page, browser, candidateData, webhook, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = packet.page, browser = packet.browser, candidateData = packet.candidateData;
                    webhook = candidateData.webhook || WEBHOOKURL;
                    ;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, uploadResume(page)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.click('[href="/jobs/190562/apply/review"]')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(2000)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.click('[href="/jobs/190562/apply/done"]')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 7:
                    _a.sent();
                    browser.close();
                    sendWebHook({
                        data: candidateData,
                        status: 'Success',
                        message: 'Your data has been uploaded successfully. Good luck!'
                    });
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _a.sent();
                    sendWebHook({
                        data: null,
                        status: 'Error',
                        message: err_1.message
                    });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.asyncCompletionViaWebHook = asyncCompletionViaWebHook;
