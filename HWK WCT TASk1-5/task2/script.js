// Grab the elements we need from the DOM
const scoreInput = document.getElementById('scoreInput');
const checkBtn = document.getElementById('checkBtn');
const result = document.getElementById('result');

// Work out the letter grade for a given numeric score
function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  if (score >= 50) return 'E';
  return 'F';
}

// Handle the "Check" button click
function checkGrade() {
  const rawValue = scoreInput.value.trim();

  // Validation: empty input
  if (rawValue === '') {
    showResult('Please enter a score.', true);
    return;
  }

  const score = Number(rawValue);

  // Validation: out-of-range score
  if (score < 0 || score > 100) {
    showResult('Invalid score.', true);
    return;
  }

  // Valid score -> calculate and display the grade
  const grade = getGrade(score);
  showResult(`Score: ${score} — Grade: ${grade}`, false);
}

// Render a message in the result area, toggling error styling
function showResult(message, isError) {
  result.textContent = message;
  result.classList.toggle('error', isError);
}

// Trigger the check on button click
checkBtn.addEventListener('click', checkGrade);

// Also allow pressing "Enter" while focused on the input
scoreInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkGrade();
  }
});
