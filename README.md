## Version 3
A simple but feature rich starter boilerplate for creating your own dashboard. Feel free to contribute and report if you have any problems.

## Updates in package.json
...

## With the most popular technologies:
- [React](https://facebook.github.io/react) as the view library.

- [Redux](https://github.com/reactjs/redux) as the state management.

- [Redux Toolkit](https://redux-toolkit.js.org) for efficient Redux development.

- [React Router](https://reacttraining.com/react-router) as the router.

- [Connected React Router](https://github.com/supasate/connected-react-router) to bind Redux with React Router. Refer to [document](https://github.com/supasate/connected-react-router/blob/master/FAQ.md#frequently-asked-questions) to see how it works.

- [TypeScript](https://www.typescriptlang.org) as the static type checker for JavaScript.

- [Create react app](https://github.com/facebook/create-react-app) for app bundling.

- [axios](https://axios-http.com) as the Promise-based HTTP client for the browser and Node.js.

- [ESLint](http://eslint.org) to maintain a consistent TypeScript/JavaScript code style (with semi standard configuration).

- [Prettier](https://prettier.io) to format code and style.

- [Antd](https://ant.design/) for UI components.

- [Antd design pro layout](https://procomponents.ant.design/en-US/components/layout/) for layout UI.

- [React hook form](https://react-hook-form.com/) for form management.

- [React-i18next](https://react.i18next.com/) for localization

- [React-toastify](https://www.npmjs.com/package/react-toastify) for toast managment

- [Yarn](https://yarnpkg.com/lang/en) as the package manager.

## Getting Started

**1. You can start by cloning the repository on your local machine by running:**

```sh
git clone git@bitbucket.org:hidesignsJP/admin-console-template.git your-project-name
cd your-project-name
```

**2. Install all of the dependencies:**

```sh
npm ci
```

**3. Start to run it:**

```sh
npm start  # Running dev
```

## Customize theme

Edit the theme variables in ```src/styles/theme.less```

You can find out more variables [here](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less).


## TODO:

There are still some things to do, feel free to contribute:

- Code-Splitting.
- Handle multiple sort in customized table.
- Handle array type params in hook and search bar.
- Write a version for react-router-dom v6.
- Handle debounced search with react-hook-form.
- Apply [createEntityAdapter](https://redux-toolkit.js.org/api/createEntityAdapter) of redux-toolkit.
- Customize this source by webpack.
- Update libraries to newest versions.

## Commit message

1. Compulsory follow format **`type(scope): jira-issue Message`**
2. **`type`**: One of the types **`feature|fix|perf|refactor|chore|docs|revert|style|test|build|ci`**
3. **`(scope)`**: Optional, accept all characters. If you don't fill in the **`scope`**, remove the sign **`( )`**.
4. **`jira-issue`**: ACT-XXXX, if no tags, use ACT-000, you can declare multiple tags in the same commit separated by spaces.
5. **`Message`**: Mandatory capital letter at the beginning of sentence. You can reuse the words in the **`type`**.
6. Between **`type(scope)`** and **`jira-issue`** must have a **`:`** and a space.
7. There must be a space between **`jira-issue`** and **`Message`**.
8. **Special**: To make the commit not appear in Changelog, add tag **`[skipclog]`** at the end of **`Message`** Ex: “fix(scope): ACT-000 Fix something [skipclog]”

## Mark release version

This procedure will release a version and create a tag in `develop` branch.

1. **`git checkout develop`** (Switch to develop branch)
2. **`git fetch --all && git pull`** (Fetch tag and pull source)
3. **`git tag`** (Check version)
4. Run one of the following commands to release the next version.
Check [npm version doc](https://docs.npmjs.com/cli/v7/commands/npm-version/) for more advanced use.

    * **`npm version patch`** (`1.0.10` -> `1.0.11`)
    * **`npm version minor`** (`1.0.10` -> `1.1.0`)
    * **`npm version major`** (`1.0.10` -> `2.0.0`)

## Upgrade new source code
Open the terminal and cd to your project path. Then running below command
1. **`chmod +x ./upgrade.sh`**
2. **`./upgrade.sh`**

## Note
Not overwrite the code in src/core because your code will be lost after upgrading