document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleButton");
    const toggleSection = document.getElementById("toggleSection");

    toggleButton.addEventListener("click", function () {
        if (toggleSection.classList.contains("hidden")) {
            toggleSection.classList.remove("hidden");
        } else {
            toggleSection.classList.add("hidden");
        }
    });
});