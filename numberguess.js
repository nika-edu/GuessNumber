// Variabler som är kopplade till synliga element
// Dessa initieras i funktionen init() nedan.
let counterContainer; // Innehållet i det översta fältet
let inputField; // Inmatningsfältet
let guessButton; // Gissa-knappen
let feedbackContainer; // Visningsfältet för feedback
let newGameButton; // Nytt Spel-knappen

// Variabler som görs tillgängliga "under huven"
let inputNumber; // Det gissade talet
let secretNumber; // Det hemliga talet
let counter = 0; // Antal gissningar
let comparisonString; // Ska kunna anta en av strängarna "stort" och "litet"
let gameWon = false;

// När fönstret laddas så går programmet till funktionen
// init.
window.addEventListener("load", function () {
  init();
});

function init() {
  secretNumber = getSecretNumber(); // Hämta det hemliga talet
  // Initiera counterContainer
  counterContainer = document.getElementsByClassName("counter-container")[0];
  guessButton = document.getElementsByClassName("button")[0];
  newGameButton = document.getElementsByClassName("button")[1];
  numberOfGuessesString = "Antal gissningar: ";
  feedbackContainer = document.getElementsByClassName("grid-element")[2];
  feedbackContainer.innerHTML = writeOutput();

  // Initiera inmatningsfältet, sätt fokus på detta
  // och ge möjlighet till inmatning med Enter
  inputField = document.getElementsByClassName("form")[0];
  inputField.focus();
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      e.preventDefault();
      evalGuess();
    }
  });

  // Anropar funktionerna som ska köras då "gissa-knappen"
  // respektive "Nytt-spel"-knappen trycks ned.
  guessButton.addEventListener("click", function () {
    evalGuess();
  });
  newGameButton.addEventListener("click", function () {
    clear();
  });
}

function clear() {
  console.log("New game");
  counter = 0;
  counterContainer.textContent = numberOfGuessesString + String(counter);
  feedbackContainer.innerHTML = writeOutput();
  inputField.focus();
}

// Här ska talet slumpas fram
function getSecretNumber() {
  return 42;
}

// Nedanstående funktion körs i samband med att en
// gissning har gjorts. Kan kanske behöva läggas till logik.
function evalGuess() {
  console.log("Nu gjordes en gissning!");

  // En tillfällig variabel deklareras för utvärdering av inmatning
  let theInput = Number(inputField.value);

  // Om formuläret tagit emot ett heltal så ska...
  if (Number.isInteger(theInput) && theInput != "") {
    // ...antalet gissningar inkrementeras,...
    counter++;
    // ...antalet gissningar visas,...
    counterContainer.textContent = numberOfGuessesString + String(counter);
    // ...formuläret tömmas,...
    document.getElementsByClassName("form")[0].value = "";
    // ...gissningen sparas och...
    inputNumber = theInput;
    // ...slutligen uppdatera texten i feedback-rutan.
    writeOutput();

    // Om formuläret inte tagit emot ett heltal så...
  } else {
    // ...töms formuläret...
    document.getElementsByClassName("form")[0].value = "";

    // ...och en informationsruta visas.
    alert("Du matade inte in ett heltal!");
  }
  inputField.focus();
}

// I denna funktion måste logik läggas till
function writeOutput() {
  let outputString = "Du gissade: ....<br>Det är för ...";
  if (counter === 0) {
    return outputString;
  } else {
    outputString = `Du gissade ${inputNumber} <br> Det är...`;
    feedbackContainer.innerHTML = outputString;
  }
}
