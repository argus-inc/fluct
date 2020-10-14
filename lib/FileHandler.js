"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
var os = require("os");
var path = require("path");
var fs = require("fs");
/**
 * Returns an instance of the FileHandler class.
 *
 * @param tempDirectoryName - The name of the temp directory
 * @returns `FileHandler`  - The initiated class of file handler
 *
 */
var FileHandler = /** @class */ (function () {
    function FileHandler(tempDirectoryName) {
        var _this = this;
        if (tempDirectoryName === void 0) { tempDirectoryName = ".fluct"; }
        /**
         * Returns if the temp directory exists.
         *
         * @returns `boolean`  - True if the folder exists
         *
         */
        this.doesTempDirExist = function () {
            var pathed = path.join(_this.tempDirectoryPath);
            if (fs.existsSync(pathed)) {
                return true;
            }
            return false;
        };
        /**
         * Returns if the temp directory is writable.
         *
         * @returns `boolean`  - True if the folder is writable
         *
         */
        this.isTempDirWritable = function () {
            return _this.isDirWritable(_this.tempDirectoryPath);
        };
        /**
         * Returns if the given directory is writable.
         *
         * @param path - A `string` of the path to the directory
         *
         * @returns `boolean`  - True if the folder is writable
         *
         */
        this.isDirWritable = function (path) {
            try {
                fs.accessSync(path, fs.constants.W_OK);
                return true;
            }
            catch (err) {
                return false;
            }
        };
        /**
         * Creates the temp directory
         *
         * @returns `boolean`  - True if the folder was created
         *
         */
        this.createTempDir = function () {
            return _this.createDir(_this.tempDirectoryPath);
        };
        /**
         * Creates an empty file at the given path
         *
         * @param path - A `string` of the path to the file
         *
         * @returns `boolean`  - True if the file was created
         *
         */
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
        /**
         * Deletes a file at the given path
         *
         * @param path - A `string` of the path to the file
         *
         */
        this.delete = function (path) {
            if (_this.exists(path)) {
                fs.unlinkSync(path);
            }
        };
        /**
         * Reads the content of a file in sync
         *
         * @param path - A `string` of the path to the file
         *
         * @returns `string`  - The content in utf8 format
         *
         * @remark TODO: add encoding customization
         *
         */
        this.read = function (path) { return fs.readFileSync(path, { encoding: 'utf8', flag: 'r' }); };
        /**
         * Saves content to a file at a given path in sync
         *
         * @remark `objects` are automatically saved as JSON
         *
         * @param path - A `string` of the path to the file
         *
         * @returns `boolean`  - True if the file was saved with desired content
         *
         */
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
        /**
         * Checks if the given path exists in sync
         *
         * @param path - A `string` of the path to check
         *
         * @returns `boolean`  - True if the given path exists
         *
         */
        this.exists = function (path) {
            return fs.existsSync(path);
        };
        /**
         * Creates a directpry at the given path in sync
         *
         * @param path - A `string` of the path to the directory
         *
         * @returns `boolean`  - True if the directory was created
         *
         */
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
        /**
         * Builds proper paths
         *
         * @param paths - A `string[]` of the path to merge file
         *
         * @param fromAppTempDir - A `boolean` to know if the said path should be from the temp directory
         *
         * @param fromRunningDir - A `boolean` to know if the said path should be from the running directory
         *
         * @returns `string`  - True if the file was created
         *
         * @example
         * Here's an example with `fromAppTempDir`:
         * ```
         * // returns `~/.fluct/mypath/myFile.md`
         * createPath([`mypath`, `myFile.md`], true)
         * ```
         */
        this.createPath = function (paths, fromAppTempDir, fromRunningDir) {
            if (fromAppTempDir === void 0) { fromAppTempDir = true; }
            if (fromRunningDir === void 0) { fromRunningDir = false; }
            if (fromAppTempDir === true) {
                return path.join.apply(path, __spreadArrays([_this.tempDirectoryPath], paths));
            }
            else if (fromRunningDir) {
                return path.join.apply(path, __spreadArrays([process.cwd()], paths));
            }
            else {
                return path.join.apply(path, paths);
            }
        };
        this.tempDirectoryName = tempDirectoryName;
        this.tempDirectoryPath = path.join(os.homedir(), this.tempDirectoryName);
        this.createTempDir();
    }
    return FileHandler;
}());
exports.FileHandler = FileHandler;
