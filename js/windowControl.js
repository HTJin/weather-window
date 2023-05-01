document.addEventListener('DOMContentLoaded', () => {
    const leftCurtain = document.getElementById('left-curtain')
    const rightCurtain = document.getElementById('right-curtain')
    const glassElement = document.getElementById('glass')
    const windowElement = document.getElementById('window')
    const curtainWrapper = document.getElementById('curtain-wrapper')

    leftCurtain.addEventListener('click', openCurtains)
    rightCurtain.addEventListener('click', openCurtains)
    curtainWrapper.addEventListener('click', closeWindowAndCurtains)

    function openCurtains() {
        if (!windowElement.classList.contains('-translate-y-full')) {
            leftCurtain.classList.add('w-[80%]')
            rightCurtain.classList.add('w-[80%]')
            setTimeout(() => {
                leftCurtain.classList.add('-translate-x-full')
                rightCurtain.classList.add('translate-x-full')
            }, 1)
            setTimeout(() => {
                windowElement.classList.add('-translate-y-full')
                glassElement.classList.add('-translate-y-full')
            }, 500) // 500ms is the default transition time in Tailwind CSS
        }
    }

    function closeWindowAndCurtains() {
        if (windowElement.classList.contains('-translate-y-full')) {
            windowElement.classList.remove('-translate-y-full')
            glassElement.classList.remove('-translate-y-full')
            setTimeout(() => {
                leftCurtain.classList.remove('-translate-x-full')
                rightCurtain.classList.remove('translate-x-full')
            }, 500)
            setTimeout(() => {
                leftCurtain.classList.remove('w-[80%]')
                rightCurtain.classList.remove('w-[80%]')
            }, 501)
        }
    }
})