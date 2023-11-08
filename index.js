import chalk from "chalk";
import promptSync from "prompt-sync";

const prompt = promptSync();

// Bulls and Cows

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

// Checking the Input is Valid
const validateInput = (input) => {
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


// ----------------------------------------------------------------------

// Main GAME "FUNCTION"
function PlayGame() {
  let secretNumber = generatesSecretNum();
  let attempts = 0;
  let totalAllowedAttempts = 10;
  console.log(chalk.cyanBright(`Welcome to Bulls & Cows!  `));
  console.log(chalk.whiteBright(`${"🔎"} Instructions for Game
   ${"📌"} You're the guesser, and your task is to guess a 4-digit secret number with unique digits.
   ${"📌"} ype a 4-digit number with no repeated digits .
   ${"📌"} After each guess, you'll receive hints in the form of "bulls" (correct digits in the right position) and "cows" (correct digits in the wrong position).
   ${"📌"} You win when you guess all 4 digits correctly in the right positions.
  `));
  let name = prompt(chalk.rgb(234, 56, 432)("What is your name? "));
  console.log(chalk.rgb(503, 134, 898)(`Player's name  is: ${name}`));
console.clear()
  while (attempts < totalAllowedAttempts) {
    const guess = prompt(chalk.green(` ${name} please guess A Number ${"➡"} `));
    if (validateInput(guess)) {
      if (guess !== secretNumber) {
        attempts = attempts + 1;
        console.log(chalk.magenta(`Remaining ${10 -attempts} Attempts\n`));
        const hint = getHint(secretNumber, guess);
        console.log(chalk.yellow(`Hint: ${hint}`));
        if (attempts === totalAllowedAttempts) {
          return chalk.black(
            `You Lose the Game ${"👎"} . The Secret Number is:  ${secretNumber}`
          );
        }
      } else if (guess === secretNumber) {
        return chalk.blue(
          `${"🎊"} Congratulations! ${name} guessed the secret number ${secretNumber} in ${attempts} attempts. ${"🎊"}`
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
}
console.log(PlayGame());