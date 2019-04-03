window.onload = () => {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const quads = [];
  const size = 8;
  const colors = ["#EEEEEE", "blue", "#FF4422"];

  const init = () => {
    canvas.width = 400;
    canvas.height = 580;

    for (let i = 0; i < 50; i ++) {
      for (let j = 0; j < 80; j ++) {
        const quad = new Quad(200 + i * size, 10 + j * size, size, size);
        quads.push(quad);
      }
    }
  };

  const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    quads.forEach(quad => {
      quad.draw();
    });
  };

  const step = () => {
    animate();
    requestAnimationFrame(step);
  };

  function Quad(x, y, width, height) {
    let xVel = Math.random() * 10;
    let yVel = Math.random() * 10;
    let colorIndex = 0;
    let angle = Math.random() * 20;
    const speed = .1;
    const xTp = 300;
    const yTp = 250;

    (() => {
      colorIndex = Math.round(Math.random() * colors.length);
      context.fillStyle = colors[colorIndex];
      context.fillRect(x, y, width, height);
      context.stroke();
    })();

    this.draw = function() {
      const dx = xTp - x;
      const dy = yTp - y;
      const alphaFactor = (canvas.width - x) * 0.002;

      angle = Math.atan2(dy, dx);
      xVel += Math.cos(angle);
      yVel += Math.sin(angle) * 10;
      x += xVel * speed / 2;
      y += yVel * Math.sin(speed);

      context.fillStyle =  colors[colorIndex];
      context.fillRect(x, y, width * alphaFactor, height * alphaFactor);
    };
  }

  init();
  step();
};
