document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleButton");
    const toggleSection = document.getElementById("toggleSection");
    const body = document.querySelector("body");

    toggleButton.addEventListener("click", function () {
        if (toggleSection.classList.contains("hidden")) {
            toggleSection.classList.remove("hidden");
            //body.style.overflowY = "scroll";
        } else {
            toggleSection.classList.add("hidden");
            //body.style.overflowY = "hidden";
        }
    });
});