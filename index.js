const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const generateReadme = require("./utils/generateReadme")
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "projectTitle",
            message: "What is the title of the project?",
        },
        {
            type: "input",
            name: "description",
            message: "Write a brief summary of your project",
        },
        {
            type: "input",
            name: "installation",
            message: "Describe the installation process",
        },
        {
            type: "input",
            name: "usage",
            message: "What is this project going to be used for?",
        },
        {
            type: "list",
            name: "license",
            message: "Choose the appropriate license for this project",
            choices: [
                "Apache",
                "Academic",
                "GNU",
                "ISC",
                "MIT",
                "Mozilla",
                "Open",
            ]
        },
        {
            type: "input",
            name: "contributing",
            message: "Who are the contributors, if any, of this project(s)?",
        },
        {
            type: "input",
            name: "tests",
            message: "Is there a test included?",
        },
        {
            type: "input",
            name: "questions",
            message: "What do I do if I have an issue?",
        },
        {
            type: "input",
            name: "username",
            message: "Please enter your GitHub username",
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your email",
        }
    ]);
}

async function init() {
    try {
        const answers = await promptUser();
        const generateContent = generateReadme(answers);
        await writeFileAsync('./dist/README.md', generateContent);
        console.log('Successfully wrote to README.md');
    } catch (err) {
        console.log(err);
    }
}

init();  