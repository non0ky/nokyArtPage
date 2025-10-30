document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('bouncingButton');
    const target = document.getElementById('header-placeholder');
    const canvas = document.getElementById('lineCanvas');
    const ctx = canvas.getContext('2d');
    let posX = Math.random() * window.innerWidth;
    let posY = Math.random() * window.innerHeight;
    let velocityX = 1 + Math.random() * 2;
    let velocityY = 1 + Math.random() * 2;
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  
    function moveButton() {
      posX += velocityX;
      posY += velocityY;
  
      if (posX + buttonWidth >= window.innerWidth || posX <= 0) {
        velocityX *= -1;
      }
      if (posY + buttonHeight >= window.innerHeight || posY <= 0) {
        velocityY *= -1;
      }
  
      button.style.left = `${posX}px`;
      button.style.top = `${posY}px`;
  
      drawLine();
  
      requestAnimationFrame(moveButton);
    }
  
    function drawLine() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const buttonCenterX = posX + buttonWidth / 2;
      const buttonCenterY = posY + buttonHeight / 2;
      const targetCenterX = target.offsetLeft + target.offsetWidth / 2;
      const targetCenterY = target.offsetTop + target.offsetHeight / 2;
  
      ctx.beginPath();
      ctx.moveTo(buttonCenterX, buttonCenterY);
      ctx.lineTo(targetCenterX, targetCenterY);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  
    moveButton();
  
    button.addEventListener('click', () => {
      window.location.href = '../html/auxiliar/mind_to_node.html';
    });
  });
  