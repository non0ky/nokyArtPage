document.addEventListener('DOMContentLoaded', () => {
  
  const imageLinks = document.querySelectorAll('main a:has(img)');

  imageLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      
      event.preventDefault();

      const img = link.querySelector('img');
      const imgSrc = img.src;
      
      // --- ¡CAMBIO CLAVE AQUÍ! ---
      // Obtenemos el texto del 'alt' Y LUEGO lo "limpiamos" con .trim()
      const captionText = img.alt.trim(); 

      const overlay = document.createElement('div');
      overlay.className = 'image-overlay';

      const newImg = document.createElement('img');
      newImg.src = imgSrc;

      overlay.appendChild(newImg);

      // Ahora, si el alt era solo "   ", .trim() lo convierte en ""
      // y este 'if' funcionará correctamente.
      if (captionText) {
        const caption = document.createElement('p');
        caption.textContent = captionText;
        overlay.appendChild(caption);
      }

      document.body.appendChild(overlay);

      overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
      });
    });
  });
});