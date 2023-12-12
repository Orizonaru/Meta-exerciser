const inner = document.getElementsByClassName('outer')
const grid = document.getElementsByClassName('main-grid')
const main = document.getElementsByTagName('main')
function switcher() {
    console.log(typeof(inner[0]), inner[1])
    inner[1].classList.toggle('started1')
    inner[2].classList.toggle('started1')
    inner[3].classList.toggle('started1')
    inner[4].classList.toggle('started1')
    
    grid[0].classList.toggle('started')

}



