const que = [
       {
        Q: 'What is the name of the town where Stardew Valley takes place?',
        options: ['Willow Creek', 'Sunset Valley', 'Pelican Town', 'Riverwood'],
        answer: 2  
    },
    {
        Q: 'Who gives you the farm at the beginning of the game?',
        options: ['Mayor Lewis', 'Grandpa', 'Robin', 'Pierre'],
        answer: 1  
    },
    {
        Q: 'Which season comes first in a new game?',
        options: ['Spring', 'Summer', 'Fall', 'Winter'],
        answer: 0  
    },
    {
        Q: 'What tool is used to break rocks?',
        options: ['Axe', 'Hoe', 'Scythe', 'Pickaxe'],
        answer: 3  
    },
    {
        Q: 'Who runs the local general store?',
        options: ['Clint', 'Pierre', 'Gus', 'Willy'],
        answer: 1  
    },
    {
        Q: 'Which skill increases when you catch fish?',
        options: ['Foraging', 'Farming', 'Mining', 'Fishing'],
        answer: 3  
    },
    {
        Q: 'What item is required to enter the Skull Cavern?',
        options: ['Rusty Key', 'Skull Key', 'Golden Key', 'Galaxy Sword'],
        answer: 1  
    },
    {
        Q: 'Who is the blacksmith in Stardew Valley?',
        options: ['Demetrius', 'Harvey', 'Clint', 'Sebastian'],
        answer: 2  
    },
    {
        Q: 'What crop can grow in all three seasons?',
        options: ['Wheat', 'Blueberry', 'Pumpkin', 'Corn'],
        answer: 3  
    },
    {
        Q: 'Which building allows you to raise cows and goats?',
        options: ['Barn', 'Coop', 'Shed', 'Greenhouse'],
        answer: 0  
    }

    {
       Q: 'Where is the fishimg hut located ata'}
       options: ['beach, 'shore', 'cave', 'farm']
       answer: 1
    }
];


let current = 0;
let score = 0;
const FEEDBACK_DELAY = 800;

const questionText = document.getElementById("questionText");
const scoreText = document.getElementById("scoreText");
const feedback = document.getElementById("feedback");
const buttons = document.querySelectorAll(".optionBtn");
const restartBtn = document.getElementById("restartBtn");

if (!questionText || !scoreText || !feedback || buttons.length === 0 || !restartBtn) {
    console.error("Required HTML elements not found!");
}

function showQuestion() {
    if (!que[current]) return;
    
    questionText.innerText = que[current].Q;

    buttons.forEach((btn, index) => {
        if (que[current].options[index]) {
            btn.innerText = que[current].options[index];
        }
    });
}

function checkAnswer(choice) {
    buttons.forEach(btn => btn.disabled = true);

    if (choice === que[current].answer) {
        score++;
        if (scoreText) scoreText.innerText = "Score: " + score;
        if (feedback) feedback.innerText = "Correct!";
    } else {
        if (feedback) feedback.innerText = "Wrong!";
    }

    current++;

    setTimeout(function () {
        if (current < que.length) {
            if (feedback) feedback.innerText = "";
            buttons.forEach(btn => btn.disabled = false);
            showQuestion();
        } else {
            if (questionText) questionText.innerText = "Quiz Finished!";
            if (scoreText) scoreText.innerText = "Final Score: " + score + " / " + que.length;
            
            buttons.forEach(btn => btn.style.display = "none");
            if (restartBtn) restartBtn.style.display = "block";
        }
    }, FEEDBACK_DELAY);
}

buttons.forEach((btn, index) => {
    btn.onclick = function () { checkAnswer(index); };
});

if (restartBtn) {
    restartBtn.onclick = function () {
        current = 0;
        score = 0;
        if (scoreText) scoreText.innerText = "Score: 0";
        if (feedback) feedback.innerText = "";

        buttons.forEach(btn => {
            btn.style.display = "inline-block";
            btn.disabled = false;
        });
        restartBtn.style.display = "none";

        showQuestion();
    };
}


showQuestion();
