class Room {
    constructor(name) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = "";
      this._image = "";
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get character() {
      return this._character;
    }

    get image() {
      return this._image;
    }
  
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        alert("room description is too short.");
        return;
      }
      this._description = value;
    }
  
    set character(value) {
      this._character = value;
    }

    set image(value) {
      this._image = value;
    }

    // method to produce room description - returns string description of the room
    describe() {
      // return "Looking around the " + this._name + " you can see " + this._description;
      return `You are in the ${this._name}. ${this._description}`;
    }
  
    //method to link rooms
    linkRoom(direction, roomToLink) {
      this._linkedRooms[direction] = roomToLink;
    }
  
    // method to produce description of linked rooms
    getDetails() {
      const entries = Object.entries(this._linkedRooms);
      let details = []
      for (const [direction, room] of entries) {
        let text = "The " + room._name + " is to the [<b>" + direction + "</b>].";
        details.push(text);
      }
      return details;
    }
  
    //method to move the player to a new room
    move(direction) {
      if (direction in this._linkedRooms) {
        return this._linkedRooms[direction];
      } else {
        alert("You can't go that way",);
        return this; // is this even necessary? 
      }
    }
  }

class Character {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._conversation = "";
  }
  get name() {
      return this._name;
  }

  get description() {
      return this._description;
  }

  get conversation() {
      return this._conversation;
  }

  set name(value) {
    if (value.length < 4) {
      alert("character name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("character description is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("conversation is too short.");
      return;
    }
    this._conversation = value;
  }

  // method for character description
  describe() {
    return this._name + " is here. " + this._description;
  }

  //method for conversation text
  converse() {
    return this._name + " says " + "'" + this._conversation + "'";
  }
  }

    class Player {
        constructor() {
            this._health = 3;
        }

        get health() {
            return this._health;
        }

        //method to change player health value as a result of combat
        changeHealth(value, down) {
            if (down) {
              this._health = this._health - value;
            }
            return this._health
          }
    }

//create the indiviual room objects and add their descriptions
const Bedroom = new Room("Whispering Chamber");
Bedroom.description = "The shadows dance on the walls. It is both enchanting and haunting.<br/><br/>";
Bedroom.image = "https://drive.google.com/uc?id=1VHv2GG86g_5-HC1NDXXDxbnVayCE_xNT";
const Kitchen = new Room("Enchanted Kitchen");
Kitchen.description = "Aroma of ghostly delicacies are in the air. It smells awful...ly delicious.<br/><br/>";
Kitchen.image = "https://drive.google.com/uc?id=1njZSSMKjr54cLL52_4YnmUdszcyAxmE5";
const Hall = new Room("Grand Hall");
Hall.description = "An opulent entrance adorned with ghostly elegance welcomes you. The whispers are maddening.<br/><br/>";
Hall.image = "https://drive.google.com/uc?id=1DxFRjRlNUlh855SBOFBQDQtL5HBs8nhh";
const Library = new Room("Marble Library");
Library.description = "An otherworldly sanctuary of knowledge. Souls of coders flick through illuminated Javascript manuscripts.<br/><br/>";
Library.image = "https://drive.google.com/uc?id=1xeRUy1DN3Enrnoe1ZAWSPosjpu0McKWz";

//link the rooms together
Hall.linkRoom("west", Bedroom);
Hall.linkRoom("east", Kitchen)
Hall.linkRoom("south", Library);
Kitchen.linkRoom("west", Hall);
Bedroom.linkRoom("east", Hall);
Library.linkRoom("north", Hall);

//add characters
const Safe = new Character("Safe");
Safe.conversation = "";
Safe.description = "This is a safe that requires a six-digit code.<br/><br/><p id='codetext' class='flex justify-center my-4'><input class='flex border-black-800 ring-1 ring-gray-300 rounded p-2 text-sm font-bold text-center' type='text' id='codeInput' placeholder='__ __ __ __ __ __'></p>";

const Ghost = new Character("Lady Eleanor's Ghost");
Ghost.conversation = "Impressive! The first two digits of the code is 70";
Ghost.description = "She graces the whispering Chamber with her ethereal appearance and she has a question for you.<br/><br/><i><b>&quotName the package that can run JavaScript from npm.&quot</b></i><br/><br/>";

const Librarian = new Character("Professor Nightshade");
Librarian.conversation = "Goood job! The second part of the code is 48";
Librarian.description = "She guards the ancient tomes and ghostly scrolls that hold the secrets of the spirit world. She wonders if you know...<br/><br/><i><b>&quotInside which HTML element do we put the Javascript?&quot</b></i><br/><br/>";

const Chef = new Character("Chef");
Chef.conversation = " Well done! The last part of the code is 43";
Chef.description = "He floats around the mystical kitchen, orchestrating ethereal culinary delights. He turns to you with a mischievous grin.<br/><br/><i><b>&quotWhat does DOM stand for? (three words exactly)&quot</b></i><br/><br/>";


//add characters to rooms
Hall.character = Safe;
Kitchen.character = Chef;
Bedroom.character = Ghost;
Library.character = Librarian;

const thisPlayer = new Player();

//display info about the current room 
function displayRoomInfo(room) {
    let occupantMsg = "";
    currentCharacter = room.character;
    playerHealth = thisPlayer._health;

    let tryWord = "";
    if (playerHealth == 1) {
      tryWord = "try";
    } else {
      tryWord = "tries";
    }

    occupantMsg = currentCharacter.describe();
    let playerTries = "";
    if (room == Hall){
      playerTries = "<p>You have <b>" + playerHealth + "</b> " + tryWord + " left.</p><br/>";
    } else {
      playerTries = "";
    }
    const textContent = "<p>" + room.describe() + "</p><p>" + occupantMsg + "</p>" + playerTries + "<p>Where do we go next?</p><p>" + room.getDetails().join(" ") + "</p><br/>";

    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("usertext").value = '';
    document.getElementById("usertext").focus();
    document.getElementById("roomImage").src = room.image;
}

function commandHandler(command, character) {
  console.log(character._name);
  switch (character._name) {
    case "Lady Eleanor's Ghost":
      if (command == "nodemon") {
        msg = character.converse();
        alert(msg)
      }
    break;
    case "Professor Nightshade":
      if (command == "script") {
        msg = character.converse();
        alert(msg)
      }
    break;
    case "Chef":
      if (command == "document object model") {
        msg = character.converse();
        alert(msg)
      }
    break;
    default:
    alert("That is not a valid command. Please try again.")
    break;
  }
}

function startGame() {
  // set and display start room
  currentRoom = Hall;
  displayRoomInfo(currentRoom);
  document.getElementById("introScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "flex";
  document.getElementById("finalScreen").style.display = "none";

  // handle commands
  document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
          let inputField = document.getElementById("userInput");
          let command = inputField.value.toLowerCase();

          if (document.getElementById("codeInput")) {
            let codeField = document.getElementById("codeInput");
            let codeTry = codeField.value.toLowerCase();              

            if (codeTry === "") {
              console.log("Code field is empty");
            } else if (codeTry == "704843") {
              endGame("win");
              console.log("Win condition");
            } else {
              if (thisPlayer._health <= 1) {
                endGame("lose");
                console.log("Lose condition");
              }
              thisPlayer.changeHealth(1,"down");
              console.log(thisPlayer._health);
              displayRoomInfo(Hall);
            }
          }
      
          if (command === "") {
              console.log("Input field is empty");
          } else {
              const directions = ["north", "south", "east", "west"];
              const commands = ["nodemon", "script", "document object model"];

              if (directions.includes(command)) {
                  currentRoom = currentRoom.move(command);
                  displayRoomInfo(currentRoom);
              /*
              } else if (commands.includes(command)) {
                  commandHandler(command, currentRoom.character);
              */
              } else {
                  commandHandler(command, currentRoom.character);
              }
          }
          inputField.value = "";
      }
    }
  );
}

function endGame(score) {
  if (score == "win") {
    document.getElementById("finalTitle").innerHTML = "Congratulations!<br><br>";
    document.getElementById("finalText").innerHTML = "You have retrieved the elusive toilet paper and rescued your friend!<br><br>You've also unlocked ancient Secrets and dangerous spells.<br><br>Good luck!<br><br>";
  } else {
    document.getElementById("finalTitle").innerHTML = "Ghosted!";
    document.getElementById("finalText").innerHTML = "You are now one of the lost souls in the mansion and your friend will be stuck in the toilet forever.";
  }

  document.getElementById("introScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("finalScreen").style.display = "flex";
}