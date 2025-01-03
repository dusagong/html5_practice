const cat = document.getElementById('cat');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 10;

// 고양이 클릭 이벤트
cat.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;

  // 고양이 위치 랜덤 변경
  const gameArea = document.getElementById('game');
  const maxX = gameArea.clientWidth - cat.offsetWidth;
  const maxY = gameArea.clientHeight - cat.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  cat.style.left = `${randomX}px`;
  cat.style.top = `${randomY}px`;
});

// 타이머 설정
const countdown = setInterval(() => {
  timeLeft--;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  if (timeLeft <= 0) {
    clearInterval(countdown);
    alert(`Time's up! Your final score is ${score}`);
    cat.style.pointerEvents = 'none'; // 고양이 클릭 불가
  }
}, 1000);
