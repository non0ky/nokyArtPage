document.addEventListener('DOMContentLoaded', () => {
    const switchButtons = document.querySelectorAll('.switch-button');
    const contentPanels = document.querySelectorAll('.content-panel');

    switchButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const targetPanelId = button.dataset.target;
            contentPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            document.querySelector(targetPanelId).classList.add('active');
        });
    });
});