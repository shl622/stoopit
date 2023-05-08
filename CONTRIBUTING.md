# Contributions

This document outlines the rules for contributing to StoopIt and instructions on setting up locally.

## Basic Rules

1. Please refer to [Commit Style Guide](https://gist.github.com/ericavonb/3c79e5035567c8ef3267) and abide by them for commit messages.
2. Make sure code is linted (Team uses ESLint 8.34.0)
3. Make sure code is unit-tested and is bug-free. If your code breaks or fails, YOU need to FIX them.
4. Try to comment your code as readable and clear as possible.
5. Before making a pull request, make sure the code is clean- NO commented blocks of code or unnecessary blocks should be included.
6. If something is unsure, always ask first in the Discord channel and finalize once the team is in agreement.
7. Once the pull request has been reviewed, delete the branch that is no longer needed.

## Git Workflow

Make sure to create a new (separate) branch per feature and create a Pull Request, which will then be reviewed by the team and merged if approved.
</br>
DO NOT push to the master/main branch.

## Setting up Locally

Create a local clone from the repository.

```
git clone https://github.com/agiledev-students-spring-2023/final-project-stoopit-project.git
```

In the root directory, use the helper script to install all dependencies

```javascript
npm run setup
```

Alternatively, you can `cd` into `front-end` and `back-end` individually and `npm i`

Start the front-end dev server.

```javascript
npm run dev-fe
```

Start the back-end dev server.

```javascript
npm run dev-be
```

### Environment Variables

There are two `.env` files needed for local development:
`front-end/.env`

-   `REACT_APP_GOOGLE_MAPS_API_KEY`
    This is the Google Maps API key that allows StoopIt to render the maps on the frontend

`back-end/.env`

-   `mongoURI`
    This is the link to the StoopIt MongoDB database and is needed for local backend development

Ask repo maintainers for the Google Maps API key and MongoDB URI in the `#team-stoopit` channel and put them in your `.env` file.

## Best Practices

-   Since this is a monorepo, you may feel inclined to `cd` into a particular directory and work there. However, this can cause issues with git if you forget you are working in a specific directory and try to `git pull` changes from origin. When working in StoopIt, it's best to stay in the root directory and use the scripts in `package.json` while developing, these scripts will handle the necessary `cd`ing for you.

-   If you're adding code, please follow how our file structure is set up. For example, frontend components should be in the components directory with each in their own folder to keep everything organized.

-   [Husky](https://github.com/typicode/husky) git hooks are enabled to maintain clean and working code. On every commit, your code will be formatted and linted to find any styling issues. On every push, code will be unit tested and must pass to push to origin.
-   However, if there is a need to format your code before you commit it, you can use `npm run format` in `front-end`, `back-end`, or the root directory to automatically format your files.

## Testing

Testing is your code can be done in either `front-end`, `back-end`, or the root directory depending on whether you want to test specific parts of StoopIt or everything at once.

When adding new code, it is important to not only test it locally, but also write a unit test for it to ensure that the functionality stays the same and future changes don't unintentionally modify your code.

### Frontend Testing

On the frontend, we use [Jest](https://jestjs.io/) for testing.
Whenever you add code to the frontend that needs to be tested, a `__tests__` directory should be added with a .test.js file inside that matches the name of the file you are testing.

For example, if you created a new button component called `Button.jsx` there should be a `__tests__/Button.test.js` in the same directory.
Visual example:

```
front-end/
├─ src/
│  ├─ components/
│  │  ├─ Button/
│  │  │  ├─ __tests__/
│  │  │  │  ├─ Button.test.js
│  │  │  ├─ Button.jsx
```

### Backend Testing

On the backend, we use [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) for testing.
Whenever you add code to the backend that needs to be tested, a .test.js file with a name matching the functionality being tested should be added to the `back-end/tests/spec` directory. Furthermore, this test file inside the tests directory should match the structure of the back-end directory.

For example, if you created a new file in `back-end/models/` called `user.js`, the test file should be in `back-end/tests/spec/models` with the name `user.test.js`.
Visual example:

```
back-end/
├─ models/
│  ├─ user.js
├─ tests/
│  ├─ spec/
│  │  ├─ models/
│  │  │  ├─ user.test.js
```

## Building for Production

StoopIt is uses [React.js](https://react.dev/) on the frontend that gets served through an [Express.js](https://expressjs.com/) backend server as static files.
In order to get StoopIt ready for production, the React frontend will first be built and then the backend will be ran in a way to serve the built frontend.

For convienence, this can be done in the root directory:

```javascript
npm run dev-production
```

StoopIt will now be served from `http://localhost:8080` and will be in production mode, this means you will be **uploading** and **viewing** data from the **production database**, be careful.
