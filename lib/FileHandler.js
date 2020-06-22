"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = exports.configDirectoryPath = exports.configDirectory = void 0;
var os = require("os");
var path = require("path");
var fs = require("fs");
exports.configDirectory = ".dust";
exports.configDirectoryPath = path.join(os.homedir(), exports.configDirectory);
var FileHandler = /** @class */ (function () {
    function FileHandler() {
        var _this = this;
        this.doesTempDirExist = function () {
            var pathed = path.join(exports.configDirectoryPath);
            if (fs.existsSync(pathed)) {
                return true;
            }
            return false;
        };
        this.isTempDirWritable = function () {
            return _this.isDirWritable(exports.configDirectoryPath);
        };
        this.isDirWritable = function (path) {
            try {
                fs.accessSync(path, fs.constants.W_OK);
                return true;
            }
            catch (err) {
                return false;
            }
        };
        this.createTempDir = function () {
            return _this.createDir(exports.configDirectoryPath);
        };
        this.touch = function (path) {
            if (_this.exists(path)) {
                return true;
            }
            else {
                try {
                    fs.closeSync(fs.openSync(path, 'w'));
                    return true;
                }
                catch (error) {
                    return false;
                }
            }
        };
        this.delete = function (path) {
            if (_this.exists(path)) {
                fs.unlinkSync(path);
            }
        };
        this.read = function (content) { return fs.readFileSync(content, { encoding: 'utf8', flag: 'r' }); };
        this.save = function (path, content) {
            var formatedContent = "";
            switch (typeof content) {
                case "object":
                    formatedContent = JSON.stringify(content);
                    break;
                default:
                    formatedContent = content;
                    break;
            }
            try {
                fs.writeFileSync(path, formatedContent);
                return true;
            }
            catch (error) {
                return false;
            }
        };
        this.exists = function (path) {
            return fs.existsSync(path);
        };
        this.createDir = function (path) {
            if (_this.exists(path) === false) {
                fs.mkdirSync(path);
                if (_this.exists(path) === false) {
                    return false;
                }
                return true;
            }
            return true;
        };
        this.create_path = function (paths, fromAppTempDir, fromRunningDir) {
            if (fromAppTempDir === void 0) { fromAppTempDir = true; }
            if (fromRunningDir === void 0) { fromRunningDir = false; }
            if (fromAppTempDir === true) {
                return path.join.apply(path, __spreadArrays([exports.configDirectoryPath], paths));
            }
            else if (fromRunningDir) {
                return path.join.apply(path, __spreadArrays([__dirname], paths));
            }
            else {
                return path.join.apply(path, paths);
            }
        };
        this.createTempDir();
    }
    return FileHandler;
}());
exports.FileHandler = FileHandler;
