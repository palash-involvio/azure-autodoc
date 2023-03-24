[View code on GitHub](https://github.com/context-labs/autodoc/blob/master/src/cli/utils/FileUtil.ts)

The code in this file provides utility functions for handling file and folder paths in the Clockwork project. These functions are particularly useful for generating URLs to access files and folders on GitHub.

1. `getFileName(input, delimiter, extension)`: This function takes an input string, an optional delimiter (default is '.'), and an optional extension (default is '.md'). It returns a new string with the given extension. If the delimiter is not found in the input string, the function appends the extension to the input string. If the delimiter is found, the function replaces the part of the input string after the last occurrence of the delimiter with the extension.

   Example usage:

   ```javascript
   const fileName = getFileName("example.txt", ".", ".md");
   // fileName will be "example.md"
   ```

2. `githubFileUrl(githubRoot, inputRoot, filePath)`: This function takes three string arguments: the root URL of a GitHub repository, the root path of the input files, and the file path relative to the input root. It returns a string containing the URL to access the file in the GitHub repository.

   Example usage:

   ```javascript
   const fileUrl = githubFileUrl("https://github.com/user/repo", "src", "src/example.md");
   // fileUrl will be "https://github.com/user/repo/blob/master/example.md"
   ```

3. `githubFolderUrl(githubRoot, inputRoot, folderPath)`: This function is similar to `githubFileUrl`, but it generates URLs for folders instead of files. It takes the same three string arguments and returns a string containing the URL to access the folder in the GitHub repository.

   Example usage:

   ```javascript
   const folderUrl = githubFolderUrl("https://github.com/user/repo", "src", "src/folder");
   // folderUrl will be "https://github.com/user/repo/tree/master/folder"
   ```

These utility functions can be used throughout the Clockwork project to generate URLs for accessing files and folders on GitHub, making it easier to navigate and manage the project's resources.
## Questions: 
 1. **Question:** What is the purpose of the `getFileName` function and how does it handle different delimiters and extensions?
   **Answer:** The `getFileName` function takes an input string and returns a file name with the specified extension. It uses the provided delimiter to find the last occurrence of the delimiter in the input string and replaces the part after the delimiter with the specified extension. If the delimiter is not found, it appends the extension to the input string.

2. **Question:** How does the `githubFileUrl` function work and what are its expected inputs?
   **Answer:** The `githubFileUrl` function takes three input parameters: `githubRoot`, `inputRoot`, and `filePath`. It returns a string representing the URL of a file in a GitHub repository. The function concatenates the `githubRoot` with the `/blob/master/` path and the `filePath` substring starting from the index of `inputRoot.length - 1`.

3. **Question:** What is the difference between the `githubFileUrl` and `githubFolderUrl` functions, and how do they handle the input parameters?
   **Answer:** Both `githubFileUrl` and `githubFolderUrl` functions generate URLs for GitHub repository items, but `githubFileUrl` generates a URL for a file, while `githubFolderUrl` generates a URL for a folder. They both take the same input parameters (`githubRoot`, `inputRoot`, and `folderPath` or `filePath`) and handle them similarly, but the `githubFolderUrl` function concatenates the `githubRoot` with the `/tree/master/` path instead of `/blob/master/` used in `githubFileUrl`.