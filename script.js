fetch('./data/db.json')
    .then(response => response.json())
    .then(data => {
        const title = document.querySelector('.title')
        title.innerHTML = data.tasks[0].title

        const startingMinutes = data.tasks[0].time;
        let time = startingMinutes * 60;

        const countdown = document.getElementById('countdown');

        setInterval(updateCountdown, 1000);

        function updateCountdown() {
            const hours = Math.floor(time / 3600);
            let minutes = Math.floor((time % 3600) / 60);
            let seconds = time % 60;

            minutes = minutes < 10 ? '0' + minutes : minutes
            seconds = seconds < 10 ? '0' + seconds : seconds

            countdown.innerHTML = `${hours}:${minutes}:${seconds}`
            time--;
        }
    })

