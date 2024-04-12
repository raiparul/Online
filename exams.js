// Define exam data (questions, answers, marks, and correct answers)
// Define exam data (questions, answers, marks, and correct answers)
const examsData = {
  webDevelopment: {
    questions: [
      { type: 'mcq', question: "1. What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], correctAnswer: 0, marks: 2 },
      { type: 'fillBlank', question: "2. What does CSS stand for?", correctAnswer: "Cascading Style Sheets", marks: 3 },
      { type: 'coding', question: "3. Write a function to add two numbers in JavaScript.", marks: 5 },
      { type: 'text', question: "4. Explain the concept of a CSS selector.", marks: 4 }
    ],
    answers: []
  },
  java: {
    questions: [
      { type: 'mcq', question: "1. What is OOP?", options: ["Object Oriented Programming", "Object Oriented Principles", "Object Oriented Protocol"], correctAnswer: 0, marks: 2 },
      { type: 'fillBlank', question: "2. What are data structures?", correctAnswer: "Data structures are a way of organizing and storing data in a computer so that it can be used efficiently.", marks: 3 },
      { type: 'coding', question: "3. Implement a binary search algorithm in Java.", marks: 5 },
      { type: 'text', question: "4. Explain the concept of inheritance in Java.", marks: 4 }
    ],
    answers: []
  },
  cPlusPlus: {
    questions: [
      { type: 'mcq', question: "1. What is C++?", options: ["A programming language", "A kind of car", "A type of food"], correctAnswer: 0, marks: 2 },
      { type: 'fillBlank', question: "2. What is the purpose of a constructor in C++?", correctAnswer: "Constructors are special member functions of a class used to initialize objects of that class.", marks: 3 },
      { type: 'coding', question: "3. Write a C++ program to find the factorial of a number.", marks: 5 },
      { type: 'text', question: "4. Explain the concept of polymorphism in C++.", marks: 4 }
    ],
    answers: []
  },
  c: {
    questions: [
      { type: 'mcq', question: "1. What is C?", options: ["A programming language", "A letter in the alphabet", "A symbol in mathematics"], correctAnswer: 0, marks: 2 },
      { type: 'fillBlank', question: "2. What is the purpose of 'printf' function in C?", correctAnswer: "The 'printf' function is used to print formatted output to the standard output stream (stdout).", marks: 3 },
      { type: 'coding', question: "3. Write a C program to find the sum of digits of a number.", marks: 5 },
      { type: 'text', question: "4. Explain the concept of arrays in C.", marks: 4 }
    ],
    answers: []
  },
  python: {
    questions: [
      { type: 'mcq', question: "1. What is Python?", options: ["A programming language", "A type of snake", "A type of food"], correctAnswer: 0, marks: 2 },
      { type: 'fillBlank', question: "2. What does 'print' function do in Python?", correctAnswer: "'print' function is used to display output on the console.", marks: 3 },
      { type: 'coding', question: "3. Write a Python program to find the factorial of a number.", marks: 5 },
      { type: 'text', question: "4. Explain the concept of loops in Python.", marks: 4 }
    ],
    answers: []
  },
  dbms: {
    questions: [
      { type: 'mcq', question: "1. What is DBMS?", options: ["Database Management System", "Data Backup and Management Software", "Database Migration Service"], correctAnswer: 0, marks: 2 },
      { type: 'fillBlank', question: "2. What is SQL?", correctAnswer: "SQL (Structured Query Language) is a standard language for managing relational databases.", marks: 3 },
      { type: 'coding', question: "3. Write a SQL query to retrieve all records from a table named 'customers'.", marks: 5 },
      { type: 'text', question: "4. Explain the concept of database normalization.", marks: 4 }
    ],
    answers: []
  }
  // Add more subjects and their questions here
};

// Function to start exam
function startExam(subject) {
  const examContentDiv = document.getElementById('examContent');
  examContentDiv.innerHTML = ''; // Clear previous exam content

  // Get the exam data for the selected subject
  const examData = examsData[subject];

  // Create exam form
  const examForm = document.createElement('form');
  examForm.id = 'examForm';

  // Add timer
  const timerDiv = document.createElement('div');
  timerDiv.id = 'timer';
  examForm.appendChild(timerDiv);
  startTimer(30); // Change the value to set the timer duration in seconds

  // Add questions to the form
  examData.questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    switch (question.type) {
      case 'mcq':
        questionDiv.innerHTML = `
          <p>${question.question}</p>
          ${question.options.map((option, i) => `<input type="radio" id="option_${index}_${i}" name="answer_${index}" value="${i}"><label for="option_${index}_${i}">${option}</label><br>`).join('')}
          <span>Marks: ${question.marks}</span>
        `;
        break;

      case 'fillBlank':
        questionDiv.innerHTML = `
          <label for="answer_${index}">${question.question}</label>
          <input type="text" id="answer_${index}" name="answer_${index}" required>
          <span>Marks: ${question.marks}</span>
        `;
        break;

      case 'coding':
      case 'text':
        questionDiv.innerHTML = `
          <label for="answer_${index}">${question.question}</label>
          <textarea id="answer_${index}" name="answer_${index}" rows="4" cols="50" required></textarea>
          <span>Marks: ${question.marks}</span>
        `;
        break;

      default:
        questionDiv.textContent = 'Unsupported question type';
    }

    examForm.appendChild(questionDiv);
  });

  // Add submit button to the form
  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.textContent = 'Submit Exam';
  submitButton.addEventListener('click', () => {
    submitExam(subject);
  });
  examForm.appendChild(submitButton);

  // Append the form to the exam content area
  examContentDiv.appendChild(examForm);

  // Show the exam content
  examContentDiv.style.display = 'block';
}

// Function to start timer
function startTimer(duration) {
  let timer = duration;
  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (--timer < 0) {
      clearInterval(timerInterval);
      document.getElementById('timer').textContent = 'Time\'s up!';
      submitExam();
    }
  }, 1000);
}

// Function to submit exam
function submitExam(subject) {
  const answers = [];

  // Collect answers from the form
  const examForm = document.getElementById('examForm');
  if (examForm) {
    const formElements = examForm.elements;
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.name && element.name.startsWith('answer_')) {
        answers.push(element.value);
      }
    }
  }

  // Store answers and subject in localStorage
  localStorage.setItem('examAnswers', JSON.stringify(answers));
  localStorage.setItem('examSubject', subject);

  // Redirect to the result page
  window.location.href = 'results.html';
}
