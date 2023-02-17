// fetch('./data/db.json')
//     .then(response => response.json())
//     .then(data => {
//         const title = document.querySelector('.title')
//         const time = document.querySelector('.time')
//         title.innerHTML = data.tasks[0].title
//         time.innerHTML = data.tasks[0].time
//     })

const startingMinutes = 10;
let time = startingMinutes * 60;

const countdown = document.getElementById('countdown');

setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds

    countdown.innerHTML = `${minutes}:${seconds}`
    time--;
}