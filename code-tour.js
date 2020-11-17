#! /usr/bin/env node
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

/** ***********************************************
 * Code Tour: Onboard from inside the codebase
 *
 * Broken? Slack @zachc
 ************************************************ */

const readline = require('readline');
const { execSync } = require('child_process');
const figlet = require('figlet');

const tourSteps = require('./tour-stops.js');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

async function giveTour() {
  for (const step of tourSteps) {
    console.clear();
    const { title, description, filePath, startLine, endLine } = step;

    await figletify(title);
    console.log(description);

    spacer(2);

    if (filePath) {
      // By default, use `head` to show a bit of the file. Otherwise display the range.
      const codePreview =
        startLine === undefined || endLine === undefined
          ? `head ${filePath}`
          : `sed -n ${startLine},${endLine}p ${filePath}`;
      console.log('=====================================================');
      console.log(
        execSync(codePreview, {
          encoding: 'utf-8',
        }),
      );
      console.log('=====================================================');
      spacer(2);
    }

    if (filePath) {
      console.log(
        'Press Enter to continue\nPress o to open the file in your default editor\nPress q to quit',
      );
    } else {
      console.log(`Press Enter to continue\nPress q to quit`);
    }

    await listenForInput(filePath);
  }

  console.clear();
  process.exit();
}

function listenForInput(filePath) {
  return new Promise((resolve) => {
    function handleKeyPress(_ignored, key) {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      } else if (key.name === 'q') {
        process.exit();
      } else if (filePath && key.name === 'o') {
        execSync(`open ${filePath}`);
      } else if (key.name === 'return') {
        process.stdin.removeListener('keypress', handleKeyPress);
        resolve();
      }
    }

    process.stdin.on('keypress', handleKeyPress);
  });
}

function spacer(numNewLines) {
  // eslint-disable-next-line curology/no-single-letter-variable
  for (let i = 0; i <= numNewLines; i += 1) {
    console.log();
  }
}

function figletify(str) {
  return new Promise((resolve, reject) => {
    figlet(str, function (err, data) {
      if (err) {
        console.log('Something went wrong...');
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
