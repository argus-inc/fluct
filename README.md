# Fluct

Enhanced file system handler for nodejs.

[![Version](https://img.shields.io/badge/git-%40argus--inc%2Ffluct-orange)](https://github.com/argus-inc/fluct/packages/279681)
[![Downloads/week](https://img.shields.io/github/package-json/v/argus-inc/fluct)](https://github.com/argus-inc/fluct/packages/279681)
[![License](https://img.shields.io/github/license/argus-inc/fluct)](https://github.com/argus-inc/fluct/blob/master/LICENSE)

This was made originally for the [cardinal framework](https://github.com/argus-inc/cardinal-system) and [dust-cli](https://github.com/crimson-med/dust-cli)

It helps handle config folder for storing data related to the app. You don't always  wanna have a database running for cli tools.

This will help you create and write content to `~/.fluct` for instance.

## Installation

To install with yarn:

```bash
yarn add https://github.com/argus-inc/fluct
```

To install with npm:

```bash
npm install @argus-inc/fluct
```

## Usage

To use fluct in your project simply do the following:

```typescript
import {FileHandler} from '@argus-inc/fluct';
const fs = new FileHandler();
```

You can find a example of usage here:
https://github.com/crimson-med/dust-cli/blob/master/src/commands/init.ts

```typescript
if (fs.doesTempDirExist()) {
    log(`Config directory: ${configDirectoryPath} was created ${chalk.green("successfully")}`, LogType.Success);
    if (fs.isTempDirWritable()) {
        log(`Config directory: ${configDirectoryPath} is ${chalk.green("writable")}`, LogType.Success);
        const pathGuide = fs.create_path(["guides"], true);
        if (fs.createDir(pathGuide)) {
            log(`Guide directory: ${pathGuide} was ${chalk.green("created")}`, LogType.Success);

        } else {
            log(`Guide directory: ${configDirectoryPath} was ${chalk.red("not created")}`, LogType.Error);
        }
    } else {
        log(`Config directory: ${configDirectoryPath} is ${chalk.red("not writable")}`, LogType.Error);
    }
} else {
    log(`Config directory: ${configDirectoryPath} was created ${chalk.red("unsuccessfully")}`, LogType.Error);
}
```

## Functionalities

---

### new FileHandler()

Returns an instance of the FileHandler class.

* **@param**  `tempDirectoryName: string` - The name of the temp directory defaults to `.fluct`

* **@returns** `FileHandler` - The initiated class of file handler

---

### doesTempDirExist()

Returns if the temp directory exists.

* **@returns** `boolean` - True if the folder exists

---

### isTempDirWritable()

Returns if the temp directory is writable.

* **@returns** `boolean` - True if the folder is writable

---

### isDirWritable()

Returns if the given directory is writable.

* **@param**  `path: string` - A `string` of the path to the directory

* **@returns** `boolean` - True if the folder is writable

---

### createTempDir()

Creates the temp directory

* **@returns** `boolean` - True if the folder was created

---

### touch()

Creates an empty file at the given path

* **@param**  `path: string` - A `string` of the path to the file

* **@returns** `boolean` - True if the file was created

---

### delete()

Deletes a file at the given path

* **@param**  `path: string` - A `string` of the path to the file

---

### read()

Reads the content of a file in sync

* **@param**  `path: string` - A `string` of the path to the file

* **@returns** `string` - The content in utf8 format

---

### save()

Saves content to a file at a given path in sync

* **@remark** `objects` are automatically saved as JSON

* **@param**  `path: string` - A `string` of the path to the file

* **@returns** `boolean` - True if the file was saved with desired content

---

### exists()

Checks if the given path exists in sync

* **@param** `path: string` - A `string` of the path to check

* **@returns** `boolean` - True if the given path exists

---

### createDir()

Creates a directpry at the given path in sync

* **@param**  `path: string` - A `string` of the path to the directory

* **@returns** `boolean` - True if the directory was created

---

### createPath()

Builds proper paths

* **@param**  `paths: string` - A `string[]` of the path to merge file

* **@param**  `fromAppTempDir` - A `boolean` to know if the said path should be from the temp directory

* **@param**  `fromRunningDir` - A `boolean` to know if the said path should be from the running directory

* **@returns** `string` - True if the file was created

example:

Here's an example with `fromAppTempDir`:

```typescript
// returns `~/.fluct/mypath/myFile.md`
createPath([`mypath`, `myFile.md`], true)
```

---

## Author

**Author**: [Argus](https://github.com/argus-inc)

**Developer**: [Mederic Burlet](https://github.com/crimson-med)

**Licence**: [GPL-3-0-only](https://github.com/argus-inc/fluct/blob/master/LICENSE)
