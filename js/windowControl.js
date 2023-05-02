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
    const weatherElement = document.getElementById("weather");

    cityField.addEventListener("input", filterCityInput);
    zipField.addEventListener("input", filterZipInput);
    cityField.addEventListener("input", enableCurtainInteraction);
    cityField.addEventListener("keydown", handleEnterKey);
    zipField.addEventListener("keydown", handleEnterKey);
    zipField.addEventListener("input", toggleCityField);
    curtainWrapper.addEventListener("click", handleCurtainClick);
    backgroundWrapper.addEventListener("click", (e) => {
        if (windowElement.classList.contains("-translate-y-full")) {
            e.stopPropagation();
            resetForm();
            closeCurtains();
            enableInputs();
        }
    });

    function toggleCityField() {
        if (zipField.value) {
            cityField.disabled = true;
        } else {
            cityField.disabled = false;
        }
    }

    function enableInputs() {
        cityField.disabled = false;
        zipField.disabled = false;
        document.getElementById("win-msg").classList.add("hidden");
        document.getElementById("tutorial").classList.remove("hidden");
    }
    
    function disableInputs() {
        cityField.disabled = true;
        zipField.disabled = true;
        document.getElementById("win-msg").classList.remove("hidden");
        document.getElementById("tutorial").classList.add("hidden");
        document.getElementById("input-form").classList.remove("relative")
        document.getElementById("input-form").classList.add("absolute", "bottom-10")
    }

    function handleEnterKey(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleCurtainClick(e);
        }
    }
    function filterCityInput() {
        const regex = /[^a-zA-Z\u0080-\u024F .'-]/g;
        cityField.value = cityField.value.replace(regex, "");
    }
    function filterZipInput() {
        zipField.value = zipField.value.replace(/[^\d]/g, "");
    }

    async function openCurtains() {
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
            }, 500);
            await window.clickedEvent();
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
            if (typeof stopSnippet === "function") {
                stopSnippet();
            }
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
        const success = await fetchAndUpdateWeather(
            cityField.value,
            zipField.value
        );
        if (success) {
            if (!windowElement.classList.contains("-translate-y-full")) {
                openCurtains();
                disableInputs();
            }
        } else {
            closeCurtains();
        }
    }

    function resetForm() {
        cityField.value = "";
        zipField.value = "";
        weatherElement.classList.remove("relative", "bottom-24");
        temperatureElement.classList.remove("relative", "bottom-24");
        document.getElementById("input-form").classList.remove("absolute", "bottom-10");
        document.getElementById("input-form").classList.add("relative");
        weatherElement.innerHTML = "";
        temperatureElement.innerHTML =
            "What's the weather looking like out there?";
        toggleCityField();
        enableCurtainInteraction();
    }

    enableCurtainInteraction();
});
