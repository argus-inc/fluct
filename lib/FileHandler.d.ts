export declare const configDirectory = ".dust";
export declare const configDirectoryPath: string;
export declare class FileHandler {
    constructor();
    doesTempDirExist: () => boolean;
    isTempDirWritable: () => boolean;
    isDirWritable: (path: string) => boolean;
    createTempDir: () => boolean;
    touch: (path: string) => boolean;
    delete: (path: string) => void;
    read: (content: string) => string;
    save: (path: string, content: any) => boolean;
    exists: (path: string) => boolean;
    createDir: (path: string) => boolean;
    create_path: (paths: string[], fromAppTempDir?: boolean, fromRunningDir?: boolean) => string;
}
