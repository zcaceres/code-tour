# Code Tour
## Onboard Engineers without Docs

`code-tour` is a tiny program to introduce new engineers to a project's structure and patterns.

## Why?
External docs are a hidden dependency in applications. They are unavoidable, but hard to keep in sync since nothing in the code indicates the dependency.

`code-tour` shares knowledge typically contained in docs, but located within the code itself.

## How to Use

1. Install `nodejs`
2. `yarn install` from the root directory of this project
3. Run with `./code-tour.js`

### Add new stops on the tour
Edit the array in `tour-stops.js` to add new stops on the tour.

Each stop is of the format
```js
{
    "title": string (required),
    "description": string (required),
    "filePath": string (optional),
    "startLine": number (optional),
    "endLine": number(optional)
}
```

You can show lines of code in a preview by specifying `filePath` and a range of lines from `startLine` to `endLine`.

If `startLine` or `endLine` are omitted, the first few lines of a file will be shown.
