// Total marks calculate karne ke liye
const calculateTotal = (marks) => marks.reduce((acc, curr) => acc + curr, 0);

// Percentage calculate karna
const calculatePercentage = (total, subjectsCount) => (total / (subjectsCount * 100)) * 100;

// Grade calculate karna using ternary operator
const calculateGrade = (percentage) =>
  percentage >= 90 ? "A+" :
  percentage >= 80 ? "A" :
  percentage >= 70 ? "B" :
  percentage >= 60 ? "C" :
  percentage >= 50 ? "D" :
  "F";

// Overall Pass/Fail based on percentage >= 50
const calculateStatus = (percentage) => percentage >= 40 ? "Pass" : "Fail";

module.exports = {
  calculateTotal,
  calculatePercentage,
  calculateGrade,
  calculateStatus
};
