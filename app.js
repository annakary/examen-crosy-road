function app() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const tamañoJugador = 60;
    let jugadorX = canvas.width / 2 - tamañoJugador / 2;
    let jugadorY = canvas.height - tamañoJugador - 10;
    // let nivel = 1; //implementar niveles hasta 3🫠 
    let puntaje = 0;
    let obstáculos = [];
    let velocidadJuego = 2;
    let juegoTerminado = false;
    var speed = 5;
    var image = new Image();
    // var musicaDeFondo = new Audio(); //implementar sonido 🔊

    image.src = "/images/kuromi-1.png";

    function dibujarJugador() {
        // ctx.fillStyle = "pink";
        // ctx.fillRect(jugadorX, jugadorY, tamañoJugador, tamañoJugador);
        ctx.drawImage(image, jugadorX, jugadorY, tamañoJugador, tamañoJugador);
    }

    function dibujarObstáculos() {
        ctx.fillStyle = "pink";
        for (const obstáculo of obstáculos) {
            ctx.fillRect(obstáculo.x, obstáculo.y, obstáculo.ancho, obstáculo.alto);
        }
    }

    function actualizarJuego() {
        if (!juegoTerminado) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dibujarJugador();
            for (let i = 0; i < obstáculos.length; i++) {
                obstáculos[i].y += velocidadJuego;

                //collisiones🥲
                if (
                    jugadorX < obstáculos[i].x + obstáculos[i].ancho &&
                    jugadorX + tamañoJugador > obstáculos[i].x &&
                    jugadorY < obstáculos[i].y + obstáculos[i].alto &&
                    jugadorY + tamañoJugador > obstáculos[i].y
                ) {
                    juegoTerminado = true;
                }


                if (obstáculos[i].y > canvas.height) {
                    obstáculos.splice(i, 1);
                    i--;
                    puntaje++;
                }
            }

            dibujarObstáculos();

            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText("Puntaje: " + puntaje, 15, 25);

            if (puntaje % 10 === 0 && velocidadJuego < 6) {
                velocidadJuego += 0.1;
            }

            requestAnimationFrame(actualizarJuego);
        } else {

            ctx.fillStyle = "rgba(142, 64, 203,68%)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";
            ctx.font = "50px Arial";
            ctx.fillText("Game Over ☠️", canvas.width / 2 - 150, canvas.height / 2);
        }
    }


    function crearObstáculo() {
        const anchoObstáculo = Math.random() * 100 + 20; //ok el ancho es aleatorio pero nose si lo dejare asi 🧐
        const xObstáculo = Math.random() * (canvas.width - anchoObstáculo);
        const yObstáculo = 0;
        obstáculos.push({ x: xObstáculo, y: yObstáculo, ancho: anchoObstáculo, alto: 20 });
    }



    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            if (jugadorX > 0) {
                jugadorX -= speed;
            }
        }
        if (e.key === "ArrowRight") {
            if (jugadorX < canvas.width - tamañoJugador) {
                jugadorX += speed;
            }
        }
        if (e.key === "ArrowUp") {
            if (jugadorY > 0) {
                jugadorY -= speed;
            }
        }
        if (e.key === "ArrowDown") {
            if (jugadorY < canvas.height - tamañoJugador) {
                jugadorY += speed;
            }
        }
        if (e.key === " ") {
            speed += 10;
        }
    });


    actualizarJuego();


    setInterval(crearObstáculo, 1500);
}
