const bio = document.getElementById('bio');
const showMoreBtn = document.getElementById('showMoreBtn');
const showLessBtn = document.getElementById('showLessBtn');

function showMore() {
  bio.classList.add('expanded');
  showMoreBtn.style.display = 'none';
  showLessBtn.style.display = 'inline-block';
}

function showLess() {
  bio.classList.remove('expanded');
  showLessBtn.style.display = 'none';
  showMoreBtn.style.display = 'inline-block';
}