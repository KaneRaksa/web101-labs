// Grab the elements we need from the DOM
const numberInput = document.getElementById('numberInput');
const generateBtn = document.getElementById('generateBtn');
const errorMsg = document.getElementById('errorMsg');
const resultTable = document.getElementById('resultTable');
const tableBody = document.getElementById('tableBody');

// Build and display the multiplication table for a given number
function generateTable(number) {
  // Clear any previous rows
  tableBody.innerHTML = '';

  for (let i = 1; i <= 10; i++) {
    const row = document.createElement('tr');

    const exprCell = document.createElement('td');
    exprCell.textContent = `${number} x ${i}`;

    const resultCell = document.createElement('td');
    resultCell.textContent = number * i;

    row.appendChild(exprCell);
    row.appendChild(resultCell);
    tableBody.appendChild(row);
  }

  // Re-trigger the fade-in animation each time a new table is generated
  resultTable.classList.remove('hidden');
  resultTable.style.animation = 'none';
  // Forcing a reflow lets the animation restart on repeated clicks
  void resultTable.offsetWidth;
  resultTable.style.animation = '';
}

// Show an error message and hide the table
function showError(message) {
  errorMsg.textContent = message;
  resultTable.classList.add('hidden');
}

// Clear any existing error message
function clearError() {
  errorMsg.textContent = '';
}

// Handle the "Generate" button click
function handleGenerate() {
  const rawValue = numberInput.value.trim();

  // Validation: empty input
  if (rawValue === '') {
    showError('Please enter a number.');
    return;
  }

  // Validation: only allow valid numbers
  if (!/^-?\d+(\.\d+)?$/.test(rawValue)) {
    showError('Please enter a valid number.');
    return;
  }

  const number = Number(rawValue);

  clearError();
  generateTable(number);
}

// Trigger generation on button click
generateBtn.addEventListener('click', handleGenerate);

// Also allow pressing "Enter" while focused on the input
numberInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleGenerate();
  }
});