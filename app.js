function app() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const tamañoJugador = 70;
    const tamañoObjetivo = 60;
    let jugadorX = 5;
    let jugadorY = canvas.height / 2 - tamañoJugador / 2;
    let objetivoX = canvas.width - tamañoObjetivo;
    let objetivoY = canvas.height / 2 - tamañoObjetivo / 2;
    let nivel = 1; // Implementar niveles hasta 3🫠
    let puntaje = 0;
    let obstáculos = [];
    let velocidadJuego = 0.5;
    let juegoTerminado = false;
    var speed = 5;
    var image = new Image();
    var image2 = new Image();
   
    let animatingRight = true;
    let posX = 15;

    image.src = "/images/kuromi.sprite.png";
    image2.src = "/images/mymelody-sprite.png";
    

    // Temporizador de 3 minutos (180 segundos)
    let tiempoRestante = 180;

    // Función para mostrar el tiempo en el canvas
    function mostrarInfo() {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Nivel: " + nivel, 15, 50);
        ctx.fillText("Puntaje: " + puntaje, 15, 25);
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        const tiempoFormateado = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
        ctx.fillText("Tiempo: " + tiempoFormateado, 15, 80);
        
    }

    // Restar tiempo del temporizador
    function restarTiempo() {
        tiempoRestante--;
        if (tiempoRestante <= 0) {
            // Si el tiempo se agota, termina el juego
            juegoTerminado = true;
        }
    }

    // Iniciar el temporizador
    const temporizador = setInterval(restarTiempo, 1000); // Restar 1 segundo cada segundo

    // Restaurar el temporizador a 3 minutos
    function reiniciarTemporizador() {
        tiempoRestante = 180;
        clearInterval(temporizador);
        temporizador = setInterval(restarTiempo, 1000); // Restar 1 segundo cada segundo
    }

    function dibujarJugador() {
        ctx.drawImage(image, jugadorX, jugadorY, tamañoJugador, 80);
    }

    function dibujarObjetivo() {
        ctx.drawImage(image2, objetivoX, objetivoY, tamañoObjetivo, 80);
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
            dibujarObjetivo();
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

            mostrarInfo();

            if (puntaje % 10 === 0 && velocidadJuego < 6) {
                velocidadJuego += 0.1;
            }

            requestAnimationFrame(actualizarJuego);
        } else {
            clearInterval(temporizador); // Detener el temporizador al finalizar el juego
            ctx.fillStyle = "rgba(142, 64, 203,68%)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";
            ctx.font = "50px Arial";
            ctx.fillText("Game Over ☠️", canvas.width / 2 - 150, canvas.height / 2);
        }
    }

    function crearObstáculo() {
        const anchoObstáculo = Math.random() * 100 + 20;
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
