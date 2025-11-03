document.addEventListener('DOMContentLoaded', () => {
    const versiones = [
        '../data/ruido_blanco/t-1.png',
        '../data/ruido_blanco/t-2.png',
        '../data/ruido_blanco/t-3.png',
        '../data/ruido_blanco/t-4.png',
    ];
    const randomIndex = Math.floor(Math.random() * versiones.length);
    const imagenAleatoria = versiones[randomIndex];

    const imgElement = document.getElementById('large-obra');

    imgElement.addEventListener('load', () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });

    });

    imgElement.src = imagenAleatoria;
});