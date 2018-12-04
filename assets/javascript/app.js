// Global Variables
var q = 0;
var count;
var rounds = 1;
var score = 0;
var grade = "";
var intervalID;
var correctIMG = ["assets/images/jon-snow.gif", "assets/images/the-wall.gif", "assets/images/tyrion-lannister.gif", "assets/images/house-lannister.gif", "assets/images/heartsbane.gif", "assets/images/valar-morghulis.gif", "assets/images/iron-men.gif", "assets/images/walker-death.gif", "assets/images/house-bw.gif", "assets/images/hodor.gif"];
var incorrectIMG = ["assets/images/wrong1.gif", "assets/images/wrong2.gif", "assets/images/wrong3.gif", "assets/images/wrong4.gif", "assets/images/wrong5.gif", "assets/images/wrong6.gif", "assets/images/wrong7.gif", "assets/images/wrong8.gif"];
var gameQuestions = [

    {
        // Q1
        question: "After the 'Battle of the Bastards,' who reigns as King in the North?",
        answers: 
        {
            a: "Ramsay Bolton",
            b: "Ned Stark",
            c: "Jon Snow",
            d: "Joffrey Baratheon"
        },
        correctAnswer: "c"
    },

    {
        // Q2
        question: "How tall is 'The Wall' protecting Westeros from what lies to the north?",
        answers:
        {
            a: "500ft",
            b: "700ft",
            c: "400ft",
            d: "800ft"
        },
        correctAnswer: "b"
    },

    {
        // Q3
        question: '"I drink and I know things." Who said this?',
        answers:
        {
            a: "Sandor Clegane",
            b: "Sansa Stark",
            c: "Thoros of Myr",
            d: "Tyrion Lannister"
        },
        correctAnswer: "d"
    },

    {
        // Q4
        question: "What are the words of House Lannister?",
        answers:
        {
            a: "'A Lannister always pays his debts.'",
            b: "'Winter is coming.'",
            c: "'Hear me roar!'",
            d: "'We stand together.'"
        },
        correctAnswer: "c"
    },

    {
        // Q5
        question: "What is the name of House Tarly's ancestral Valyrian steel sword?",
        answers:
        {
            a: "Widow's Wail",
            b: "Heartsbane",
            c: "Oath Keeper",
            d: "Longclaw"
        },
        correctAnswer: "b"
    },

    {
        // Q6
        question: "'Valar morghulis.' What does this mean?",
        answers:
        {
            a: "'All men must serve.'",
            b: "'All men must live.'",
            c: "'All men must fly.'",
            d: "'All men must die.'"
        },
        correctAnswer: "d"
    },

    {
        // Q7
        question: "Who worships the Drowned God?",
        answers:
        {
            a: "The people of Braavos",
            b: "The Iron Men",
            c: "The Dornish",
            d: "The Unsullied"
        },
        correctAnswer: "b"
    },

    {
        // Q8
        question: "How can White Walkers be killed?",
        answers:
        {
            a: "Dragon glass",
            b: "Fire",
            c: "Valyrian steel",
            d: "A and C"
        },
        correctAnswer: "d"
    },

    {
        // Q9
        question: "Where is the Many-Faced God worshipped?",
        answers:
        {
            a: "Isle of Faces",
            b: "The House of Black and White",
            c: "The Great Sept of Baelor",
            d: "Whispering Wood"
        },
        correctAnswer: "b"
    },

    {
        // Q10
        question: "Hodor?",
        answers:
        {
            a: "Hodor.",
            b: "Hodor.",
            c: "Hodor.",
            d: "Hodor."
        },
        correctAnswer: "Hodor."
    }
];

// ***************************************


// Functions

function gameStart() {

    $(document).unbind("keyup", gameStart);
    $("#triviaA").empty();


    // Timer set
    count = 11;
    intervalID = setInterval(countDown, 1000);

    // Round and Score Set
    $("#questionsLeft").html(rounds);
    $("#currentScore").html(score);
    
    if (rounds > 10) {
        gameOver();
    }

    // Display questions/answers
    else {
        displayQA(q);
        q++;

        // Start timer and decrement rounds
        countDown();
    }
}

// Timer Countdown
function countDown() {
    count--;
    $("#timeLeft").html("<b>" + count + "</b>");

    if (count === 0) {
        setTimeout(incorrectAnswer, 200);
        timerStop();
        $("#timeLeft").html("<b>Out of Time!</b>");

        setTimeout(gameStart, 1000 * 5);
    }
}

function timerStop() {
    clearInterval(intervalID);
}

// Display trivia question and 4 answer options
function displayQA(i) {
    rounds++;
    // Question
    $("#triviaQ").html("<p>" + gameQuestions[i].question + "</p>");
    // Answers list
    $("#triviaA").append("<p id='a'><b>A:&nbsp;&nbsp;</b>" + gameQuestions[i].answers.a + "</p>");
    $("#triviaA").append("<p id='b'><b>B:&nbsp;&nbsp;</b>" + gameQuestions[i].answers.b + "</p>");
    $("#triviaA").append("<p id='c'><b>C:&nbsp;&nbsp;</b>" + gameQuestions[i].answers.c + "</p>");
    $("#triviaA").append("<p id='d'><b>D:&nbsp;&nbsp;</b>" + gameQuestions[i].answers.d + "</p>");

    $("#triviaA p").attr("class", "click");

    $(".click").on("click", function() {
        var playerGuess = $(this).attr("id");
        
        if (gameQuestions[i].correctAnswer === playerGuess || gameQuestions[i].correctAnswer === "Hodor.") {
            correctAnswer(i);
            timerStop();
            score++;

            setTimeout(gameStart, 1000 * 4);
        }
        else {
            incorrectAnswer();
            timerStop();

            setTimeout(gameStart, 1000 * 4);
        }
    });
}

// Alert player that the correct answer was selected -- move on to next question
function correctAnswer(i) {
    var imageShow = $("<img>").attr({src: correctIMG[i], height: "260px"});
    $("#triviaA").html("<h3 id='right'>CORRECT!</h3>");
    $("#triviaQ").html(imageShow);
}

// Alert player that the incorrect answer was selected -- move on to next question
function incorrectAnswer() {
    var x = Math.floor(Math.random() * 8);
    var imageShow = $("<img>").attr({src: incorrectIMG[x], height: "260px"});
    $("#triviaA").html("<h3 id='wrong'>INCORRECT!</h3>");
    $("#triviaQ").html(imageShow);
}

function gameOver() {
    timerStop();
    $("#timeLeft").html("--");
    $("#triviaQ").html("<p>Press any key to play again...</p>");
    $("#triviaA").empty();
    $("#questionsLeft").html("--");

    var endGame = $("<div>").html("<h1>GAME OVER!</h1>");
    $("#triviaA").html(endGame);

    grade = gradePlayer(score);
    $("#playerGrade").html(grade);

    gameReset();
}

function gradePlayer(scoreVal) {
    var totalScore = parseFloat(scoreVal);
    var gradeLetter;
    grade = totalScore / 10;

    if (totalScore > 0.89) {
        gradeLetter = "A";
    }
    else if (totalScore > 0.79) {
        gradeLetter = "B";
    }
    else if (totalScore > 0.69) {
        gradeLetter = "C";
    }
    else if (totalScore > 0.59) {
        gradeLetter = "D";
    }
    else {
        gradeLetter = "F"
    }

    return gradeLetter;
}

function gameReset() {
    // FIXME: Game reset
    q = 0;
    rounds = 1;
    score = 0;
    grade = "";

    $(document).bind("keyup", gameStart);
}

// ***************************************


// Main
$(document).ready(function() {

    $(document).bind("keyup", gameStart);

});
