var music = document.getElementById("lofi");
music.volume = 0.2;
var musicOn = false;
function playPauseAudio() {
  if (!musicOn) {
    music.play();
    return musicOn = true;
  }
  else { 
    music.pause();
    return musicOn = false;
  }
}



const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
alphabet.split = ('');
const digits = "0123456789";
digits.split = ('');
const specialChars = "!@#$%^&*_-+=";
specialChars.split=('');


const passwordTxt = document.getElementById("password");
const length = document.getElementById("length");
const incNumbers = document.getElementById("digits");
const incSymbols = document.getElementById("specialChars");
const generateBtn = document.getElementById("generate");
const userPassword = document.getElementById("userPassword");

//Function that generates password using parameters (digits/special characters)
generateBtn.addEventListener("click", () => {     //Event created when generate button is clicked
  let characters = alphabet;
  incNumbers.checked ? (characters += digits) : "";
  incSymbols.checked ? (characters += specialChars) : "";
  passwordTxt.value = generatePassword(length.value, characters);
});

//Function to generate password using for loop
const generatePassword = (length, characters) => {
  if (length < 8) { 
    length = 8;
    document.getElementById("length").value = "8";
  }
  else if (length > 20) { 
    length = 20;
    document.getElementById("length").value = "20";
  }
  
  let password = "";
 
  var goodPass = false;

  while (!goodPass) { 
  for (let i = 0; i < length; i++) {      //For loop that loops based on length of password 
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)   
    );
  }
  
  var alphabet_Strength = false;
for (let j =0; j < alphabet.length; j++) { 
        if (password.includes(alphabet[j])) { 
        alphabet_Strength = true;
      }    
}
    //alert("Alpha is true");

var digit_Strength = false;
if (!incNumbers.checked) { 
      digit_Strength = true;
  }
  for (let j =0; j < digits.length; j++) { 
      if (password.includes(digits[j])) { 
        digit_Strength = true;
      }
  }
//alert("digits is true");


var special_Strength = false;
if (!incSymbols.checked) { 
      special_Strength = true;
  }
  for (let i =0; i < specialChars.length; i++) { 
      if (password.includes(specialChars[i])) { 
        special_Strength = true;
      }
  }
  // alert("special is true");


  if ( (alphabet_Strength == true) && (digit_Strength == true)  && (special_Strength == true) )  { 
    goodPass = true;
  } 
  else { 
    password = "";
  } 
  }  
  return password;
};


function savePasswordtoTxt() { 
  const saveBtn = document.getElementById("save")
  //does not work on empty text field
  if (passwordTxt.value != "") { 
   var siteName = prompt("What is this password for?");
    if (siteName === null) {
        return; //break out of the function early
    }
    else if (siteName === "") { 
      alert("You must enter a name for the password file!");
      return; 
    }
  var blob = new Blob([passwordTxt.value],
                { type: "text/plain;charset=utf-8" });
  saveAs(blob, siteName + "_password.txt");
  }
  else { 
    alert("Empty password!");
  }
}




//Function to copy password to clipboard
const copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", () => {           //Event created when copy button is clicked
  passwordTxt.select();
  document.execCommand("copy");
  alert("Copied!");
});


//NEW ()
//password strength tester functions using RegEx

    // timeout before a callback is called

    let timeout;

    // traversing the DOM and getting the input and span using their IDs

    let password = document.getElementById('userPassword')
    let strengthBadge = document.getElementById('StrengthDisp')

    // The strong and weak password Regex pattern checker

    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    
    function StrengthChecker(PasswordParameter){
        // We then change the badge's color and text based on the password strength

        if(strongPassword.test(PasswordParameter)) {
            strengthBadge.style.backgroundColor = "#04aa6d"
            strengthBadge.textContent = 'Strong'
        } else if(mediumPassword.test(PasswordParameter)){
            strengthBadge.style.backgroundColor = 'orange'
            strengthBadge.textContent = 'Medium'
        } else{
            strengthBadge.style.backgroundColor = 'red'
            strengthBadge.textContent = 'Weak'
        }
    }

  function showPass() {
    
  var pw = document.getElementById("userPassword");
  if (pw.type === "password") {
    pw.type = "text";
  } else {
    pw.type = "password";
  }
   // toggle the icon
      document.getElementById("togglePassword").classList.toggle("bi-eye");
}

    // Adding an input event listener when a user types to the  password input 

    userPassword.addEventListener("input", () => {

        clearTimeout(timeout);

        //We then call the StrengChecker function as a callback then pass the typed password to it

        timeout = setTimeout(() => StrengthChecker(userPassword.value), 1);
        //The badge is hidden by default, so we show it

        strengthBadge.style.display= 'block';

        //Incase a user clears the text, the badge is hidden again

        if(userPassword.value.length !== 0){
            strengthBadge.style.display != 'block'
        } else{
            strengthBadge.style.display = 'none'
        }
    });
