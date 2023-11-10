import chalk from "chalk";
import promptSync from "prompt-sync";

const prompt = promptSync();

// Random Secret Number generating Function
function generatesSecretNum() {
  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let secretNum = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * num.length);
    secretNum += num[randomIndex];
    num.splice(randomIndex, 1);
  }
  return secretNum;
}

// Checking Vaild Name
const validateName = (name) => {
  if (name.length === 0) {
    console.log(
      chalk.bgRedBright(`Name cannot be empty ${"🚫"}. Please enter your name.`)
    );
    return false;
  }

  if (/[^A-Za-z\s]/.test(name)) {
    console.log(
      chalk.bgRedBright(
        `Invalid name ${"🚫"}. Please use only letters and spaces.`
      )
    );
    return false;
  } else if (name.length <= 1) {
    console.log(
      chalk.bgRedBright(`Invalid name ${"🚫"}. Please Enter proper name.`)
    );
    return false;
  }

  return true;
};

// Checking the Input is Valid
const validateInput = (input) => {
  console.log("input:", input);

  if (typeof input !== "string") {
    console.log("Bye! Thanks for playing : )")
    process.exit()
  }
  
  let alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  if (input.length !== 4) {
    return false;
  } else if (
    input.includes(".") ||
    input.includes("-") ||
    input.includes("_") ||
    input.includes("!") ||
    input.includes("?")
  ) {
    return false;
  }

  for (let i = 0; i < input.length; i++) {
    if (alphabets.includes(input[i].toLowerCase())) {
      return false;
    }
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] === input[j]) {
        return false;
      }
    }
  }
  return true;
};

// Creating Hint for Game
const getHint = (secretNumber, guess) => {
  let bulls = 0;
  let cows = 0;
  for (let i = 0; i < 4; i++) {
    if (secretNumber[i] === guess[i]) {
      bulls++;
    } else if (secretNumber.includes(guess[i])) {
      cows++;
    }
  }
  return `${bulls} ${"Bull(s)🐃"} & ${cows} ${"Cow(s)🐄"}`;
};

// Extras
// ADDING LEVELS TO Game
const gameLevels = [
  { name: "Easy", attempts: 10 },
  { name: "Medium", attempts: 7 },
  { name: "Hard", attempts: 4 },
];
const chooseLevel = () => {
  console.log(chalk.magentaBright("Choose a game level:"));
  for (let i = 0; i < gameLevels.length; i++) {
    console.log(chalk.rgb(34, 56, 402)(`${i + 1}. ${gameLevels[i].name}`));
  }

  while (true) {
    const choice = prompt(
      chalk.rgb(132, 160, 632)(`Enter the number of the`) +
        chalk.cyanBright(` level `) +
        chalk.rgb(132, 160, 632)(`you want to play: `)
    );
    const selectedLevel = parseInt(choice);

    if (selectedLevel >= 1 && selectedLevel <= gameLevels.length) {
      return gameLevels[selectedLevel - 1];
    } else {
      console.log(
        chalk.rgb(
          234,
          56,
          42
        )(`Invalid choice ${"🚫"}. Please select a valid level.`)
      );
    }
  }
};

// ----------------------------------------------------------------------

// Main GAME "FUNCTION"
function PlayGame() {
  let isPlaying = true;
  while (isPlaying) {
    let secretNumber = generatesSecretNum();

    console.log(chalk.cyanBright(`Welcome to Bulls & Cows!  `));
    console.log(
      chalk.magenta(`${"🔎"} Instructions for Game: `) +
        chalk.whiteBright(`
   ${"📌"} You're the guesser, and your task is to guess a 4-digit secret number with unique digits.
   ${"📌"} Type a 4-digit number with no repeated digits .
   ${"📌"} After each guess, you'll receive hints in the form of "bulls" (correct digits in the right position) and "cows" (correct digits in the wrong position).
   ${"📌"} You win when you guess all 4 digits correctly in the right positions.
  `)
    );

    let name;
    while (true) {
      name = prompt(chalk.rgb(234, 56, 432)("What is your name? "));
      if (validateName(name)) {
        console.log(chalk.rgb(503, 134, 898)(`Player's name  is: ${name}\n`));
        break;
      }
    }

    let attempts = 0;
    let selectedLevel = chooseLevel();
    let totalAllowedAttempts = selectedLevel.attempts;

    console.clear();
    while (attempts < totalAllowedAttempts) {
      const guess = prompt(
        chalk.rgb(4, 607, 190)(` ${name} `) +
          chalk.green(`please guess A Number ${"➡"} `)
      );
      if (validateInput(guess)) {
        if (guess !== secretNumber) {
          attempts = attempts + 1;
          console.log(
            chalk.magenta(
              `Remaining ${totalAllowedAttempts - attempts} Attempts\n`
            )
          );
          const hint = getHint(secretNumber, guess);
          console.log(chalk.yellow(`Hint: ${hint}`));
          if (attempts === totalAllowedAttempts) {
            console.log(
              chalk.bgBlack(
                `You Lose ${"☹"} the Game ${"👎"} . The Secret Number is:  ${secretNumber}`
              )
            );
          }
        } else if (guess === secretNumber) {
          console.log(
            chalk.blue(
              `${"🎊"} Congratulations! ${name}  ${"🥳"} guessed the secret number ${secretNumber} in ${attempts} attempts. ${"🎊"}`
            )
          );
        }
      } else {
        console.log(
          chalk.rgb(
            234,
            56,
            42
          )(
            `${name} guess Invalid Number ${"🚫"}. Please enter a 4-digit number with unique digits.`
          )
        );
      }
    }
    let playAgain = prompt(`Would you like to Play again? [y/n]`);
    if (playAgain.toLowerCase() !== "y") {
      return (isPlaying = false);
    }

    console.clear();
  }
}
PlayGame();
