<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">

[<img src="https://img.shields.io/badge/Linkedin-kathesama-blue?style=for-the-badge&logo=linkedin">](https://www.linkedin.com/in/kathesama)
<br>
![IntellijIdea](https://img.shields.io/badge/Made%20for-IntellijIdea-1f425f.svg?style=for-the-badge)
![ReactJS](https://img.shields.io/badge/-ReactJS-blue?logo=react&logoColor=white&style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
<br>
[![GitHub issues](https://img.shields.io/github/issues/kathesama/starting-seed-react?style=plastic)](https://github.com/kathesama/starting-seed-react/issues)
[![GitHub forks](https://img.shields.io/github/forks/kathesama/starting-seed-react?style=plastic)](https://github.com/kathesama/starting-seed-react/network)
[![GitHub stars](https://img.shields.io/github/stars/kathesama/starting-seed-react?style=plastic)](https://github.com/kathesama/starting-seed-react/stargazers)
<br>
![GitHub last commit](https://img.shields.io/github/last-commit/kathesama/starting-seed-react?color=red&style=plastic)
![GitHub version commits](https://img.shields.io/github/commits-since/kathesama/starting-seed-react/V2.0.0.svg?color=yellow&style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/kathesama/starting-seed-react?style=plastic)
<br>
![Maintaned](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=plastic)

[comment]: <> (![OWASP]&#40;https://img.shields.io/badge/OWASP%3F-yes-green.svg?style=plastic&#41;)

[comment]: <> (![CleanCode]&#40;https://img.shields.io/badge/CleanCode%3F-yes-green.svg?style=plastic&#41;)
[![GitHub license](https://img.shields.io/github/license/kathesama/starting-seed-react?style=plastic)](https://github.com/kathesama/starting-seed-react/blob/main/LICENSE)
![GitHub repo size](https://img.shields.io/github/repo-size/kathesama/starting-seed-react?style=plastic)
<br>

# Initial seed for a react project

Steps to run this project

1. Clone this repo
   > git clone https://github.com/kathesama/starting-seed-react.git
2. Run install
   > npm install

Then go to _.git/hooks/commit-msg_, find the main function and replace it:

> const commitMsgFilePath = process.argv[2];

with:

> const commitMsgFilePath = path.resolve(process.env.PWD, process.argv[2].substring(1));

-> This fixes _Error: ENOENT: no such file or directory, open 'X:\.git\COMMIT_EDITMSG'_

**Note**: This project uses _git-commit-msg-linter_ package, this one add a nice pattern for work in commit messages<br>

```
correct format: <type>[scope]: <subject>

  type:
    feat     A new feature.
    docs     Documentation only changes.
    style    Changes that do not affect the meaning of the code
              (white-space, formatting, missing semi-colons, etc).
    refactor A code change that neither fixes a bug nor adds a feature.
    test     Adding missing tests or correcting existing ones.
    chore    Changes to the build process or auxiliary tools and
              libraries such as documentation generation.
    perf     A code change that improves performance.
    ci       Changes to your CI configuration files and scripts.
    build    Changes that affect the build system or external dependencies
              (example scopes: gulp, broccoli, npm).
    temp     Temporary commit that won't be included in your CHANGELOG.

  scope:
    Optional, can be anything specifying the scope of the commit change.
    For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc.
    In App Development, scope can be a page, a module or a component.

  subject:
    Brief summary of the change in present tense. Not capitalized. No period at the end.
```

Build container app and run it in Docker:
> docker-compose -f ./docker-compose.yml build
> docker-compose -f ./docker-compose.yml up -d

## Notes

* This project has material UI installed