document.addEventListener("DOMContentLoaded", () => {
    const leftCurtain = document.getElementById("left-curtain");
    const rightCurtain = document.getElementById("right-curtain");
    const glassElement = document.getElementById("glass");
    const windowElement = document.getElementById("window");
    const curtainWrapper = document.getElementById("curtain-wrapper");
    const backgroundWrapper = document.getElementById("background-wrapper");
    const cityField = document.getElementById("city-field");
    const zipField = document.getElementById("zip-field");
    const temperatureElement = document.getElementById("temperature");

    zipField.addEventListener("input", toggleCityField);
    curtainWrapper.addEventListener("click", handleCurtainClick);
    cityField.addEventListener("input", enableCurtainInteraction);
    backgroundWrapper.addEventListener("click", (e) => {
        if (windowElement.classList.contains("-translate-y-full")) {
            e.stopPropagation();
            resetForm();
            closeCurtains();
        }
    });

    function toggleCityField() {
        if (zipField.value) {
            cityField.disabled = true;
        } else {
            cityField.disabled = false;
        }
    }

    function openCurtains() {
        if (!windowElement.classList.contains("-translate-y-full")) {
            leftCurtain.classList.add("w-[80%]");
            rightCurtain.classList.add("w-[80%]");
            setTimeout(() => {
                leftCurtain.classList.add("-translate-x-full");
                rightCurtain.classList.add("translate-x-full");
            }, 1);
            setTimeout(() => {
                windowElement.classList.add("-translate-y-full");
                glassElement.classList.add("-translate-y-full");
            }, 500); // 500ms is the default transition time in Tailwind CSS
        }
    }

    function closeCurtains() {
        if (windowElement.classList.contains("-translate-y-full")) {
            windowElement.classList.remove("-translate-y-full");
            glassElement.classList.remove("-translate-y-full");
            setTimeout(() => {
                leftCurtain.classList.remove("-translate-x-full");
                rightCurtain.classList.remove("translate-x-full");
            }, 500);
            setTimeout(() => {
                leftCurtain.classList.remove("w-[80%]");
                rightCurtain.classList.remove("w-[80%]");
            }, 501);
        }
    }

    function enableCurtainInteraction() {
        if (cityField) {
            leftCurtain.style.pointerEvents = "all";
            rightCurtain.style.pointerEvents = "all";
        } else {
            leftCurtain.style.pointerEvents = "none";
            rightCurtain.style.pointerEvents = "none";
        }
    }

    async function handleCurtainClick(e) {
        e.stopPropagation();
        if (!cityField) {
            alert("Please enter a city.");
            return;
        }
        const success = await fetchAndUpdateWeather(cityField.value, zipField.value);
        if (success) {
            if (!windowElement.classList.contains("-translate-y-full")) {
                openCurtains();
            }
        } else {
            closeCurtains();
        }
    }
    
    function resetForm() {
        cityField.value = "";
        zipField.value = "";
        temperatureElement.innerHTML = "What's the weather looking like out there?";
        toggleCityField();
        enableCurtainInteraction();
    }

    enableCurtainInteraction();
});
