#! /usr/bin/env node

/*************************************************
 * Code Tour: Onboard from inside the codebase
 *
 * Broken? Slack @zachc
 *************************************************/

const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const { execSync } = require("child_process");
const figlet = require("figlet");

const tourSteps = require("./tour");

async function giveTour() {
  for (let step of tourSteps) {
    console.clear();
    const { title, description, filePath, startLine, endLine } = step;

    await figletify(title);
    console.log(description);

    spacer(2);

    if (filePath) {
      const codePreview = `sed -n ${startLine},${endLine}p ${filePath}`;
      console.log("=====================================================");
      console.log(
        execSync(codePreview, {
          encoding: "utf-8",
        })
      );
      console.log("=====================================================");
      spacer(2);
    }


    if (filePath) {
        console.log(
          "Press Enter to Continue\nPress o to open the file in your default editor\nPress q to quit"
        );
    } else {
        console.log(
          `Press Enter to Continue\nPress q to quit`
        );
    }

    await listenForInput(filePath);
  }
}

function listenForInput(filePath) {
  return new Promise((resolve) => {
    process.stdin.on("keypress", (_, key) => {
      if (key.ctrl && key.name === "c") {
        process.exit();
      } else if (key.name === "q") {
        process.exit();
      } else if (filePath && key.name === 'o') {
        execSync(`open ${filePath}`);
      } else if (key.name === "return") {
        process.stdin.removeAllListeners();
        resolve();
      }
    });
  });
}

function spacer(numNewLines) {
  for (let i = 0; i <= numNewLines; i++) {
    console.log();
  }
}

function figletify(str) {
  return new Promise((resolve, reject) => {
    figlet(str, function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        reject(err);
      } else {
        // Output the figlet image to the terminal
        console.log(data);
        resolve();
      }
    });
  });
}

giveTour();
