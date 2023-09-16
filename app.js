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
    let juegoGanado = false;
    var speed = 5;
    var image = new Image();
    var image2 = new Image();
    var musicaFondo = new Audio()
    var gameOver = new Audio()
    var subirNivel = new Audio()
    var ganaste = new Audio()
    var tiempoRestante = 60;
    

    ganaste.src = "https://firebasestorage.googleapis.com/v0/b/examen-kuromi.appspot.com/o/audio%2Fvictoria.mp3?alt=media&token=70d26a8d-837e-4c8a-9c1f-29da91352719";
    subirNivel.src = "https://firebasestorage.googleapis.com/v0/b/examen-kuromi.appspot.com/o/audio%2Fsubir-nivel.mp3?alt=media&token=1405d236-111e-45a4-83f4-e515e1220ddb";
    gameOver.src = "https://firebasestorage.googleapis.com/v0/b/examen-kuromi.appspot.com/o/audio%2Fgame-over.mp3?alt=media&token=a82c22ab-7dbd-48a2-bda5-5b288bf6551e";
    musicaFondo.src = "https://firebasestorage.googleapis.com/v0/b/examen-kuromi.appspot.com/o/audio%2FmusicaDeFondo.mp3?alt=media&token=57851fa4-d7f6-497e-bec4-ef05bf1bd829";
    image.src = "https://firebasestorage.googleapis.com/v0/b/examen-kuromi.appspot.com/o/images%2Fkuromi.sprite.png?alt=media&token=179164b6-a2d8-490b-9ed4-c2929d090d3a";
    image2.src = "https://firebasestorage.googleapis.com/v0/b/examen-kuromi.appspot.com/o/images%2Fmymelody-sprite.png?alt=media&token=b2b2d86b-6762-4e3a-aaa3-568b2a3c1ad1";

    let juegoIniciado = false;
    const portada = document.getElementById('portada');
    const startGameButton = document.getElementById('startGameButton');

    // Mostrar la portada inicialmente
    portada.classList.remove('hidden');
    canvas.classList.add('hidden');

    startGameButton.addEventListener('click', () => {
        // Oculta la portada
        portada.classList.add('hidden');

        // Muestra el canvas
        canvas.classList.remove('hidden');
        if (!juegoIniciado) {
            iniciarJuego();
            juegoIniciado = true;

        }
    });

    




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


    function restarTiempo() {
        tiempoRestante--;
        if (tiempoRestante <= 0) {

            juegoTerminado = true;
            if ((juegoTerminado = true) || (juegoGanado = true)) {
                musicaFondo.pause();
                gameOver.play();

            }
        }
    }


    const temporizador = setInterval(restarTiempo, 1000);



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
    function iniciarJuego() {
        actualizarJuego();
        musicaFondo.play()
    }
    function actualizarJuego() {

        if (!juegoTerminado) {
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dibujarJugador();
            dibujarObjetivo();
            for (let i = 0; i < obstáculos.length; i++) {
                obstáculos[i].y += velocidadJuego;

                if (
                    jugadorX < obstáculos[i].x + obstáculos[i].ancho &&
                    jugadorX + tamañoJugador > obstáculos[i].x &&
                    jugadorY < obstáculos[i].y + obstáculos[i].alto &&
                    jugadorY + tamañoJugador > obstáculos[i].y
                ) {
                    juegoTerminado = true;
                    if ((juegoTerminado = true) || (juegoGanado = true)) {
                        musicaFondo.pause();
                        gameOver.play();
                    }
                } else if (
                    jugadorX < objetivoX + tamañoObjetivo &&
                    jugadorX + tamañoJugador > objetivoX &&
                    jugadorY < objetivoY + tamañoObjetivo &&
                    jugadorY + tamañoJugador > objetivoY
                ) {

                    if (nivel < 3) {
                        subirNivel.play();
                        nivel++;
                        jugadorX = 5;
                        velocidadJuego += 0.9;
                        objetivoX = canvas.width - tamañoObjetivo;
                    } else {
                        juegoGanado = true;
                        juegoTerminado = true;
                        musicaFondo.pause();
                        mostrarGanaste();
                        ganaste.play();
                    }


                }

                if (obstáculos[i].y > canvas.height) {
                    obstáculos.splice(i, 2);
                    i--;
                    puntaje++;
                }


            }

            dibujarObstáculos();

            mostrarInfo();

            
            requestAnimationFrame(actualizarJuego);

        } else {
            clearInterval(temporizador);
            if (juegoGanado) {
                mostrarGanaste();
                ganaste.play();
            } else {
                mostrarPerdiste();
            }
        }

    }

    function mostrarPerdiste() {
        ctx.fillStyle = "rgba(142, 64, 203, 0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.fillText("Game Over ☠️", canvas.width / 2 - 150, canvas.height / 2);
    }

    function mostrarGanaste() {

        ctx.fillStyle = "rgba(142, 64, 203, 0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.fillText("¡Ganaste! 💖", canvas.width / 2 - 150, canvas.height / 2);

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
