/**
 * Returns an instance of the FileHandler class.
 *
 * @param tempDirectoryName - The name of the temp directory
 * @returns `FileHandler`  - The initiated class of file handler
 *
 */
export declare class FileHandler {
    /**
     * Holds the temp directory name
     */
    tempDirectoryName: string;
    /**
     * Holds the temp directory path
     */
    tempDirectoryPath: string;
    constructor(tempDirectoryName?: string);
    /**
     * Returns if the temp directory exists.
     *
     * @returns `boolean`  - True if the folder exists
     *
     */
    doesTempDirExist: () => boolean;
    /**
     * Returns if the temp directory is writable.
     *
     * @returns `boolean`  - True if the folder is writable
     *
     */
    isTempDirWritable: () => boolean;
    /**
     * Returns if the given directory is writable.
     *
     * @param path - A `string` of the path to the directory
     *
     * @returns `boolean`  - True if the folder is writable
     *
     */
    isDirWritable: (path: string) => boolean;
    /**
     * Creates the temp directory
     *
     * @returns `boolean`  - True if the folder was created
     *
     */
    createTempDir: () => boolean;
    /**
     * Creates an empty file at the given path
     *
     * @param path - A `string` of the path to the file
     *
     * @returns `boolean`  - True if the file was created
     *
     */
    touch: (path: string) => boolean;
    /**
     * Deletes a file at the given path
     *
     * @param path - A `string` of the path to the file
     *
     */
    delete: (path: string) => void;
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
    read: (path: string) => string;
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
    save: (path: string, content: any) => boolean;
    /**
     * Checks if the given path exists in sync
     *
     * @param path - A `string` of the path to check
     *
     * @returns `boolean`  - True if the given path exists
     *
     */
    exists: (path: string) => boolean;
    /**
     * Creates a directpry at the given path in sync
     *
     * @param path - A `string` of the path to the directory
     *
     * @returns `boolean`  - True if the directory was created
     *
     */
    createDir: (path: string) => boolean;
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
    createPath: (paths: string[], fromAppTempDir?: boolean, fromRunningDir?: boolean) => string;
}
