let questions = [];

let currentQuestion = 0;
let score = 0;
let correct_answer = 0;
let wrong_answer = 0;

const quizContainer = document.getElementById('quizContainer');
const quizContainer1 = document.getElementById('quizContainer1');

const get_button = document.getElementById("btn");

const categorie = document.getElementById("category");
const difficultie = document.getElementById("difficulty");
const type = document.getElementById("type");

const type_info = document.getElementById("type_info");
const difficultie_info = document.getElementById("difficulty_info");
const categorie_info = document.getElementById("category_info");



const categories = [
  { id: "", name: "Any Category" },
  { id: "9", name: "General Knowledge" },
  { id: "10", name: "Entertainment: Books" },
  { id: "11", name: "Entertainment: Film" },
  { id: "12", name: "Entertainment: Music" },
  { id: "13", name: "Entertainment: Musicals & Theatres" },
  { id: "14", name: "Entertainment: Television" },
  { id: "15", name: "Entertainment: Video Games" },
  { id: "16", name: "Entertainment: Board Games" },
  { id: "17", name: "Science & Nature" },
  { id: "18", name: "Science: Computers" },
  { id: "19", name: "Science: Mathematics" },
  { id: "20", name: "Mythology" },
  { id: "21", name: "Sports" },
  { id: "22", name: "Geography" },
  { id: "23", name: "History" },
  { id: "24", name: "Politics" },
  { id: "25", name: "Art" },
  { id: "26", name: "Celebrities" },
  { id: "27", name: "Animals" },
  { id: "28", name: "Vehicles" },
  { id: "29", name: "Entertainment: Comics" },
  { id: "30", name: "Science: Gadgets" },
  { id: "31", name: "Entertainment: Japanese Anime & Manga" },
  { id: "32", name: "Entertainment: Cartoon & Animations" },
];

const difficulties = [
  { value: "", name: "Any Difficulty" },
  { value: "easy", name: "Easy" },
  { value: "medium", name: "Medium" },
  { value: "hard", name: "Hard" },
];

const types = [
  { value: "", name: "Any Type" },
  { value: "multiple", name: "Multiple Choice" },
  { value: "boolean", name: "True / False" },
];


function buiddSelectOptions() {
  categorie.innerHTML = categories
    .map((cat) => `<option value="${cat.id}">${cat.name}</option>`)
    .join("");
  difficultie.innerHTML = difficulties
    .map((diff) => `<option value="${diff.value}">${diff.name}</option>`)
    .join("");
  type.innerHTML = types
    .map((type) => `<option value="${type.value}">${type.name}</option>`)
    .join("");
}

async function startQuiz() {
  const category = categorie.value;  
  const difficulty = difficultie.value;
  const type_val = difficultie.value;

  const amount = document.getElementById("amount").value;
  let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;
  if (category) apiUrl += `&category=${category}`;
  if (difficulty) apiUrl += `&difficulty=${difficulty}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.response_code === 0) {
      questions = data.results;
      currentQuestion = 0;
      score = 0;
      displayInfo();
      displayQuestions()
      console.log(questions);
    } else {
      alert("Failed to load questions. Please try again.");
    //   resetQuiz();
    }
  } catch (error) {
    alert("Error loading questions: " + error.message);
    // resetQuiz();
  }
}

get_button.addEventListener("click", startQuiz);

function displayInfo() {
  // Find the selected type name
  const selectedType = types.find(t => t.value === type.value);
  type_info.innerHTML = selectedType ? selectedType.name : type.value;
  
  // Find the selected difficulty name
  const selectedDifficulty = difficulties.find(d => d.value === difficultie.value);
  difficultie_info.innerHTML = selectedDifficulty ? selectedDifficulty.name : difficultie.value;
  
  // Find the selected category name
  const selectedCategory = categories.find(c => c.id === categorie.value);
  categorie_info.innerHTML = selectedCategory ? selectedCategory.name : categorie.value;
}

function displayQuestions(){
    quizContainer.innerHTML = `
        <table>
        <tr>
            <th>Question</th>
            <th>Type Your Answer</th>
        </tr>
        ${questions.map((q, idx) => `
        <tr>
            <td>${q.question}</td>
            <td><input type="text" placeholder="Answer" id='answer-${idx}'/></td>
        </tr>
        `).join('')
    }
        </table>
    `;
    quizContainer.innerHTML += `<button onclick=showResults()>Submit Answers</button>`;
}

function getAnswers(){
    let Anwers = [];
    questions.forEach((q, idx) => {
        const answer = document.getElementById(`answer-${idx}`).value;
        Anwers.push({question: q.question, correct_answer: q.correct_answer, your_answer: answer});
    })
    
    Anwers.forEach((ans, idx) => {
        if(ans.correct_answer.toLowerCase() === ans.your_answer.toLowerCase()){
            score++;
            correct_answer++
        }else{
            wrong_answer++
        }
    })

    return Anwers
}

function showResults() {
    showAnswers()
    getAnswers();
    quizContainer.innerHTML = `
        <h2>Quiz Results</h2>
        <p>Total Questions: ${questions.length}</p>
        <p>Correct Answers: ${correct_answer}</p>
        <p>Wrong Answers: ${wrong_answer}</p>
        <p>Your Score: ${score}</p>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}

function showAnswers(){
  let answers = getAnswers()
    quizContainer1.innerHTML = `
      <table>
        <tr>
            <th>Question</th>
            <th>Correct Answer</th>
            <th>Your Answer</th>
        </tr>
        ${answers.map((q, idx)=> `
        <tr>
            <td>${q.question}</td>
            <td>${q.correct_answer}</td>
            <td>${q.your_answer}</td>
        </tr>
        `).join('')
    }
        </table>
    `
}



document.addEventListener("DOMContentLoaded", () => {
  buiddSelectOptions();
});
