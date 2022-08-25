import './index.scss';

const select = document.querySelector('[data-range]');

const arr = [
    {
        range: 'week',
        currentValue: 38,
        minLeft: 12, 
        currentStreak: 4,
        bestStreak: 12
    },
    {
        range: 'month', 
        currentValue: 12,
        minLeft: 186, 
        currentStreak: 7,
        bestStreak: 44
    }
]

const draw = (x) => {
    const cricle = document.querySelector('[data-circle]')
    const line = x * 490 / 50
    cricle.style.strokeDasharray = `${line} ,490`
}

const shuffle = () => {
    const ul = document.querySelector('ul');
    for (let i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
}

const countNumber = (item, start, end) => {
    start = parseInt(start)
    end = parseInt(end)
    let currentNumber = start,
    range = end - start,
    increment = end > start ? 1 : -1,
    step = Math.abs(Math.floor(1000 / range)),
    timer = setInterval(() => {
    currentNumber += increment 
    item.textContent = currentNumber;
    currentNumber == end && clearInterval(timer)}, step);
    const dataName = Object.keys(item.dataset)[0]
    item.dataset[dataName] = end

}

select.addEventListener('change', function(e){
    shuffle()
    const currentScoreElement = document.querySelector('[data-current]')
    const currentStreakElement = document.querySelector('[data-currentstreak]')
    const bestStreakElement = document.querySelector('[data-beststreak]')
    const minLeftElement = document.querySelector('[data-minleft]')

    arr.forEach(item => {
        
        const { range, currentValue, minLeft, currentStreak, bestStreak } = item
        if(range === e.target.value){
            draw(currentValue)
            countNumber(currentScoreElement, currentScoreElement.dataset.current, currentValue)
            minLeftElement.innerHTML = minLeft
            currentStreakElement.innerHTML = currentStreak
            bestStreakElement.innerHTML = bestStreak
 
        }

    })
})

