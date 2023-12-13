const outer = document.getElementsByClassName('outer')
const inner = document.getElementsByClassName('inner')
const grid = document.getElementsByClassName('main-grid')
const main = document.getElementsByTagName('main')
function switcher() {
    for (let i = 1; i < 5; i++) {
        inner[i].classList.toggle('started1')
        outer[i].classList.toggle('started1')
    }
    grid[0].classList.toggle('started')

}



