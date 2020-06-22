import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'

/**
 * Returns an instance of the FileHandler class.
 *
 * @param tempDirectoryName - The name of the temp directory
 * @returns `FileHandler`  - The initiated class of file handler
 *
 */
export class FileHandler {
    /**
     * Holds the temp directory name
     */ 
    public tempDirectoryName: string;
    /**
     * Holds the temp directory path
     */ 
    public tempDirectoryPath: string;

    constructor(tempDirectoryName = ".fluct") {
        this.tempDirectoryName = tempDirectoryName
        this.tempDirectoryPath = path.join(os.homedir(), this.tempDirectoryName)
        this.createTempDir()
    }

    /**
     * Returns if the temp directory exists.
     *
     * @returns `boolean`  - True if the folder exists
     *
     */
    doesTempDirExist = ():boolean => {
        const pathed = path.join(this.tempDirectoryPath);
        if (fs.existsSync(pathed)) {
            return true
        }
        return false
    }

    /**
     * Returns if the temp directory is writable.
     *
     * @returns `boolean`  - True if the folder is writable
     *
     */
    isTempDirWritable = (): boolean => {
        return this.isDirWritable(this.tempDirectoryPath)
    }

    /**
     * Returns if the given directory is writable.
     *
     * @param path - A `string` of the path to the directory
     * 
     * @returns `boolean`  - True if the folder is writable
     *
     */
    isDirWritable = (path: string): boolean => {
        try {
            fs.accessSync(path, fs.constants.W_OK);
            return true
        }
        catch (err) {
            return false
        }
    }

    /**
     * Creates the temp directory
     *
     * @returns `boolean`  - True if the folder was created
     *
     */
    createTempDir = (): boolean => {
        return this.createDir(this.tempDirectoryPath);
    }

    /**
     * Creates an empty file at the given path
     *
     * @param path - A `string` of the path to the file
     * 
     * @returns `boolean`  - True if the file was created
     *
     */
    touch = (path: string) => {
        if (this.exists(path)) {
            return true;
        } else {
            try {
                fs.closeSync(fs.openSync(path, 'w'));
                return true
            } catch (error) {
                return false
            }
        }
    }

    /**
     * Deletes a file at the given path
     *
     * @param path - A `string` of the path to the file
     *
     */
    delete = (path: string) => {
        if (this.exists(path)) {
            fs.unlinkSync(path)
        }
    } 

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
    read = (path: string) => fs.readFileSync(path,{encoding:'utf8', flag:'r'})

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
    save = (path: string, content: any) => {
        let formatedContent = ""
        switch (typeof content) {
            case "object":
                formatedContent = JSON.stringify(content)
                break;
        
            default:
                formatedContent = content
                break;
        }
        try {
            fs.writeFileSync(path, formatedContent);
            return true
        } catch (error) {
            return false
        }
    }

    /**
     * Checks if the given path exists in sync
     *
     * @param path - A `string` of the path to check
     * 
     * @returns `boolean`  - True if the given path exists
     *
     */
    exists = (path: string) => {
        return fs.existsSync(path)
    } 

    /**
     * Creates a directpry at the given path in sync
     *
     * @param path - A `string` of the path to the directory
     * 
     * @returns `boolean`  - True if the directory was created
     *
     */
    createDir = (path: string): boolean => {
        if (this.exists(path) === false) {
            fs.mkdirSync(path)
            if (this.exists(path) === false) {
                return false
            }
            return true
        }
        return true
    }

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
    createPath = (paths: string[], fromAppTempDir: boolean = true, fromRunningDir: boolean = false):string => {
        if (fromAppTempDir === true) {
            return path.join(this.tempDirectoryPath, ...paths)
        } else if (fromRunningDir) {
            return path.join(__dirname, ...paths)
        } else {
            return path.join(...paths)
        }
    }
}
