
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const specialChars = "!@#$%^&*_-+=";


const passwordTxt = document.getElementById("password");
const length = document.getElementById("length");
const incNumbers = document.getElementById("digits");
const incSymbols = document.getElementById("specialChars");
const generateBtn = document.getElementById("generate");


//Function that generates password using parameters (digits/special characters)
generateBtn.addEventListener("click", () => {     //Event created when generate button is clicked
  let characters = alphabet;
  incNumbers.checked ? (characters += digits) : "";
  incSymbols.checked ? (characters += specialChars) : "";
  passwordTxt.value = generatePassword(length.value, characters);
});

//Function to generate password using for loop
const generatePassword = (length, characters) => {
  let password = "";
  for (let i = 0; i < length; i++) {      //For loop that loops based on length of password 
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)   
    );
  }
  return password;
};

//Function to copy password to clipboard
const copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", () => {           //Event created when copy button is clicked
  passwordTxt.select();
  document.execCommand("copy");
  alert("Copied!");
});