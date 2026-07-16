// Starting data
const scores = [45, 82, 91, 60, 77, 33];

// Grab the elements we need from the DOM
const scoreList = document.getElementById('scoreList');
const highestScoreEl = document.getElementById('highestScore');
const lowestScoreEl = document.getElementById('lowestScore');
const averageScoreEl = document.getElementById('averageScore');
const scoreInput = document.getElementById('scoreInput');
const addBtn = document.getElementById('addBtn');
const errorMsg = document.getElementById('errorMsg');

// Return a CSS class name based on the score's range (for colorful text)
function getScoreClass(score) {
  if (score >= 90) return 'high';
  if (score >= 70) return 'good';
  if (score >= 50) return 'mid';
  return 'low';
}

// Render the full score list from the `scores` array
function renderScores() {
  scoreList.innerHTML = '';

  scores.forEach((score) => {
    const li = document.createElement('li');
    li.textContent = score;
    li.className = `score-item ${getScoreClass(score)}`;
    scoreList.appendChild(li);
  });
}

// Calculate and display highest, lowest, and average scores
function updateStats() {
  if (scores.length === 0) {
    highestScoreEl.textContent = '—';
    lowestScoreEl.textContent = '—';
    averageScoreEl.textContent = '—';
    return;
  }

  const highest = Math.max(...scores);
  const lowest = Math.min(...scores);
  const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;

  highestScoreEl.textContent = highest;
  lowestScoreEl.textContent = lowest;
  averageScoreEl.textContent = average.toFixed(2);
}

// Show an error message
function showError(message) {
  errorMsg.textContent = message;
}

// Clear any existing error message
function clearError() {
  errorMsg.textContent = '';
}

// Refresh both the list and the stats together
function refresh() {
  renderScores();
  updateStats();
}

// Handle the "Add Score" button click
function handleAddScore() {
  const rawValue = scoreInput.value.trim();

  // Validation: empty input
  if (rawValue === '') {
    showError('Please enter a score.');
    return;
  }

  // Validation: must be a valid number
  if (!/^\d+(\.\d+)?$/.test(rawValue)) {
    showError('Please enter a valid number.');
    return;
  }

  const score = Number(rawValue);

  // Validation: must be within range
  if (score < 0 || score > 100) {
    showError('Please enter a score between 0 and 100.');
    return;
  }

  // Valid score -> add it, refresh the UI, and reset the input
  clearError();
  scores.push(score);
  refresh();
  scoreInput.value = '';
  scoreInput.focus();
}

// Trigger add on button click
addBtn.addEventListener('click', handleAddScore);

// Also allow pressing "Enter" while focused on the input
scoreInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleAddScore();
  }
});

// Initial render on page load
refresh();