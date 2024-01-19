#!/usr/bin/env node
import { getRandomUser } from "./Apis/utilApis.js";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const mainUser = {
  firstName: "Bob",
  lastName: "Blake",
  age: "26",
  city: "Ottawa",
  gender: "Male",
  province: "Ontario",
  country: "Canada",
  customToString: () => {
    return `Your name is ${mainUser.firstName} ${mainUser.lastName} and you are ${mainUser.age} years old and you live in ${mainUser.city}, ${mainUser.province}, ${mainUser.country}.`;
  },
};

class people {
  constructor(
    firstName,
    lastName,
    gender = "N/A",
    dob = "N/A",
    city = "N/A",
    country = "N/A",
    job = "N/A"
  ) {
    this.dob = dob || "N/A";
    this.city = city || "N/A";
    this.country = country || "N/A";
    this.job = job || "N/A";
    this.firstName = firstName || "N/A";
    this.lastName = lastName || "N/A";
    this.gender = gender || "N/A";
  }
  customToString() {
    return `${this.firstName} ${this.lastName} was born in ${
      this.dob
    } and lives in ${this.city}, ${this.country}. \n
    ${this.gender === "Male" ? "He" : "She"} is  a ${this.job}.`;
  }
}

const main = async () => {
  console.clear();
  await welcomeMessage();
  console.clear();
  console.log(chalk.blue("Loading your information..."));
  await sleep(4000);
  console.clear();
  console.log(chalk.blue("Here is your information:"));
  console.log(chalk.green(mainUser.customToString()));
  let userChoice = await userInput("Continue to main menu? (y/n)");
  while (userChoice.trim() !== "y" && userChoice.trim() !== "n") {
    userChoice = await userInput("Please enter a valid choice (y/n)");
  }
  if (userChoice.trim() === "n") {
    console.log("here");
    console.log(chalk.red("Goodbye!"));
    process.exit(0);
  } else {
    await menu();
  }
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function getrandomUsers() {
  console.clear();
  const menuTitle = chalkAnimation.rainbow("Getting Random Users");
  menuTitle.start();
  const users = await getRandomUser();
  await sleep(3000);
  console.clear();
  console.log(chalk.blue("Here is your information:"));
  for (const user of users) {
    const person = new people(
      user.first_name,
      user.last_name,
      user.gender,
      user.date_of_birth,
      user.address.city,
      user.address.country,
      user.employment.title
    );
    console.log(chalk.green(person.customToString()));
  }
  let useri = await userInput("Continue to main menu? ( enter y)");
  while (useri !== "y") {
    useri = await userInput("Please enter a valid choice (y)");
  }

  await menu();
}

function userInput(question) {
  console.log(question);
  return new Promise((resolve) => {
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (data) => {
      resolve(data.trim());
    });
  });
}

async function welcomeMessage() {
  const welcomeTitle = chalkAnimation.rainbow("Welcome to a simple Npm CLI");
  await sleep(3000);
  welcomeTitle.stop();
}

async function menu() {
  console.clear();
  const menuTitle = chalkAnimation.rainbow("Menu");
  menuTitle.start();
  console.log("1. Get random users");
  console.log("2. Exit");
  let userChoice = await userInput("What would you like to do?");
  while (userChoice.trim() !== "1" && userChoice.trim() !== "2") {
    userChoice = await userInput("Please enter a valid choice (1/2)");
  }
  switch (userChoice) {
    case "1":
      await getrandomUsers();
      await menu();
      break;
    case "2":
      console.log(chalk.red("Goodbye!"));
      process.exit(0);
      break;
    default:
      break;
  }
}
main();
