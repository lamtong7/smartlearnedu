export const quizzes = [
  {
    id: 'javascript-variables',
    title: 'Variables and Data Types Quiz',
    courseId: 'javascript-fundamentals',
    timeLimit: 1200,
    passingScore: 70,
    questions: [
      {
        id: 1,
        text: 'Which keyword is used to declare a variable that can be reassigned?',
        answers: ['var', 'let', 'const', 'All of the above'],
        correct: 1,
        explanation: 'The let keyword is commonly used to declare a block-scoped variable that can be reassigned.'
      },
      {
        id: 2,
        text: 'Which value is a Boolean in JavaScript?',
        answers: ['"true"', '42', 'true', 'null'],
        correct: 2,
        explanation: 'true and false are Boolean values.'
      },
      {
        id: 3,
        text: 'Which operator checks strict equality?',
        answers: ['=', '==', '===', '!='],
        correct: 2,
        explanation: 'The === operator compares value and type.'
      },
      {
        id: 4,
        text: 'What does const prevent?',
        answers: ['Reassignment', 'Reading a value', 'Creating arrays', 'Running functions'],
        correct: 0,
        explanation: 'const prevents rebinding the variable name to a new value.'
      },
      {
        id: 5,
        text: 'Which data type represents no value?',
        answers: ['string', 'number', 'null', 'object'],
        correct: 2,
        explanation: 'null is used to represent an intentional absence of value.'
      }
    ]
  }
];

export function findQuiz(id) {
  return quizzes.find((quiz) => quiz.id === id) || quizzes[0];
}
