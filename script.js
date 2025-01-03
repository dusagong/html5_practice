const cat = document.getElementById('cat');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameEnd = document.getElementById('game-end');
const finalScore = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const nicknameInput = document.getElementById('nickname-input');
const saveRecordButton = document.getElementById('save-record');
const nicknameField = document.getElementById('nickname');
const rankingList = document.getElementById('ranking-list');

let score = 0;
let timeLeft = 10;
let countdown;

// 최고 기록 관리
let rankings = JSON.parse(localStorage.getItem('rankings')) || [];

function updateRankingList() {
    rankingList.innerHTML = '';
    rankings.slice(0, 10).forEach((record, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${record.nickname}: ${record.score}`;
        rankingList.appendChild(li);
    });
}

// 고양이 클릭 이벤트
cat.addEventListener('click', () => {
    if (timeLeft > 0) {
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
    }
});

// 타이머 설정
function startTimer() {
    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            gameEnd.style.display = 'block'; // 게임 끝나면 다시 하기 버튼 보이기
            finalScore.textContent = `Your final score is ${score}`; // 최종 점수 표시
            cat.style.pointerEvents = 'none'; // 고양이 클릭 불가
            if (score > Math.min(...rankings.map(r => r.score), 0)) {
                nicknameInput.style.display = 'block'; // 최고 점수 기록시 닉네임 입력
            }
        }
    }, 1000);
}

// 게임 시작
function startGame() {
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    gameEnd.style.display = 'none'; // 다시 하기 버튼 숨기기
    cat.style.pointerEvents = 'auto'; // 고양이 클릭 가능하게 만들기
    nicknameInput.style.display = 'none'; // 닉네임 입력 숨기기

    startTimer();
}

// "다시 하기" 버튼 클릭 시 게임 초기화
restartButton.addEventListener('click', startGame);

// 기록 저장
saveRecordButton.addEventListener('click', () => {
    const nickname = nicknameField.value.trim();
    if (nickname) {
        rankings.push({ nickname, score });
        rankings.sort((a, b) => b.score - a.score); // 점수 순으로 내림차순 정렬
        localStorage.setItem('rankings', JSON.stringify(rankings)); // 로컬 스토리지에 저장
        updateRankingList(); // 랭킹 업데이트
        nicknameInput.style.display = 'none'; // 닉네임 입력창 숨기기
    }
});

// 게임 시작
startGame();
updateRankingList(); // 페이지 로드 시 랭킹 표시
