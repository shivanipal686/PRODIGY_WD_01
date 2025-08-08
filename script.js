let hours = 0;
        let minutes = 0;
        let seconds = 0;
        let milliseconds = 0;
        let timer;
        let isRunning = false;
        let lapCount = 1;
        const timeDisplay = document.querySelector('.time-display');
        const startBtn = document.querySelector('.start-btn');
        const pauseBtn = document.querySelector('.pause-btn');
        const resetBtn = document.querySelector('.reset-btn');
        const lapBtn = document.querySelector('.lap-btn');
        const lapList = document.getElementById('lap-list');
        const indicatorCircles = document.querySelectorAll('.indicator-circle');
        
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        lapBtn.addEventListener('click', recordLap);

        function animateIndicators() {
            indicatorCircles.forEach((circle, index) => {
                setTimeout(() => {
                    circle.classList.add('active');
                    setTimeout(() => {
                        circle.classList.remove('active');
                    }, 300);
                }, index * 100);
            });
        }

        function startTimer() {
            if (!isRunning) {
                isRunning = true;
                startBtn.style.display = 'none';
                pauseBtn.style.display = 'block';
                
                timer = setInterval(() => {
                    milliseconds += 10;
                    
                    if (milliseconds === 1000) {
                        milliseconds = 0;
                        seconds++;
                    }
                     if (seconds === 60) {
                        seconds = 0;
                        minutes++;
                    }
                    
                    if (minutes === 60) {
                        minutes = 0;
                        hours++;
                    }
                    
                    updateDisplay();
                    
                    if (seconds % 2 === 0) {
                        animateIndicators();
                    }
                }, 10);
                 }
        }
        
        function pauseTimer() {
            isRunning = false;
            startBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
            clearInterval(timer);
        }

        function resetTimer() {
            pauseTimer();
            hours = 0;
            minutes = 0;
            seconds = 0;
            milliseconds = 0;
            lapCount = 1;
            updateDisplay();
            lapList.innerHTML = '';
        }

        function recordLap() {
            if (isRunning) {
                const lapTime = document.createElement('div');
                lapTime.className = 'lap-item';
                lapTime.innerHTML = `
                    <span>Lap ${lapCount++}</span>
                    <span>${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}</span>
                `;
                lapList.prepend(lapTime);
            }
        }
         function updateDisplay() {
            timeDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        }
        
        function formatTime(time) {
            return time < 10 ? `0${time}` : time;
        }
        
        function formatMilliseconds(ms) {
            return ms < 10 ? `00${ms}` : ms < 100 ? `0${ms}` : ms;
        }
