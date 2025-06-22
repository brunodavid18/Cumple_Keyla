document.addEventListener('DOMContentLoaded', () => {
    var audio = document.getElementById("bg-music");
    var lyrics = document.getElementById("lyrics");
    var playButton = document.getElementById("playButton"); // Referencia al botón

    const confettiContainer = document.querySelector('.confetti-container');
    const spotlightContainer = document.querySelector('.spotlight-container');
    const partyEffectsContainer = document.querySelector('.party-effects-container');

    let confettiInterval;
    let lyricsInterval; // Para controlar la actualización de letras
    let tituloTimeout; // Para controlar el timeout del título

    // Colores para el confeti
    const confettiColors = ['#FF0000', '#0000FF', '#00FF00', '#FFC0CB', '#800080', '#FFD700', '#FFA500'];

    // Función para crear un solo confeti/serpentina
    const createConfetti = () => {
        const confetti = document.createElement('div');
        const isRibbon = Math.random() < 0.4; // 40% de probabilidad de ser una serpentina (cinta)

        confetti.classList.add('confetti');
        if (isRibbon) {
            confetti.classList.add('ribbon');
        }

        confetti.style.left = `${Math.random() * 100}vw`; // Posición horizontal aleatoria
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)]; // Color aleatorio
        confetti.style.animationDuration = `${Math.random() * 2 + 3}s`; // Duración de caída entre 3 y 5 segundos
        confetti.style.animationDelay = `${Math.random() * 0.5}s`; // Retraso para un efecto escalonado

        confettiContainer.appendChild(confetti);

        // Eliminar el confeti después de que termine la animación
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    };

    // Función para crear las luces de colores (spotlights)
    const createSpotlights = () => {
        const colors = ['var(--party-red)', 'var(--party-blue)', 'var(--party-green)', 'var(--party-purple)', 'var(--party-pink)'];
        for (let i = 0; i < 5; i++) { // Creamos 5 focos de luz
            const spotlight = document.createElement('div');
            spotlight.classList.add('spotlight');
            spotlight.style.backgroundColor = colors[i];
            spotlight.style.animationDelay = `${i * 1.5}s`; // Retraso para que aparezcan escalonadamente
            spotlight.style.left = `${Math.random() * 90}%`; // Posición aleatoria
            spotlight.style.top = `${Math.random() * 90}%`;
            spotlightContainer.appendChild(spotlight);
        }
    };

    // --- Lógica de la música y efectos de cumpleaños al cargar la página ---
    // Intentar reproducir la música al cargar. La política de autoplay debería permitirlo
    // ya que el usuario hizo clic en la página anterior.
    audio.play().catch(e => {
        // Si autoplay falla (ej. por restricciones del navegador), muestra el botón de reproducción
        console.warn("Autoplay falló:", e);
        playButton.style.display = 'block'; // Muestra el botón si la reproducción automática falla
    });

    // Iniciar los efectos de fiesta inmediatamente al cargar la página
    partyEffectsContainer.style.opacity = '1'; // Hacer visible el contenedor de efectos
    confettiInterval = setInterval(createConfetti, 100); // Iniciar el confeti
    createSpotlights(); // Crear las luces

    // Ocultar el botón y las letras después de un breve delay inicial si el autoplay funcionó
    // Esto es para que las luces y serpentinas sean el enfoque principal al inicio.
    setTimeout(() => {
        playButton.style.display = 'none'; // Asegurarse de que el botón esté oculto
        lyrics.style.opacity = '0'; // Asegurarse de que las letras estén ocultas
    }, 500); // Pequeño delay para que los efectos de fiesta carguen primero

    // Resto de tu lógica para las letras y el título
    var lyricsData = [
        { text: "At the time", time: 15 },
        { text: "The whisper of birds", time: 18 },
        { text: "Lonely before the sun cried", time: 27 },
        { text: "Fell from the sky", time: 32 },
        { text: "Like water drops", time: 33 },
        { text: "Where I'm now? I don't know why", time: 41 },
        { text: "Nice butterflies in my hands", time: 47 },
        { text: "Too much light for twilight", time: 54 },
        { text: "In the mood for the flowers love", time: 59 },
        { text: "That vision", time: 67 },
        { text: "Really strong, blew my mind", time: 72 },
        { text: "Silence Let me see what it was", time: 78 },
        { text: "I only want to live in clouds", time: 83 },
        { text: "Where I'm now? I don't know why", time: 91 },
        { text: "Nice butterflies in my hands", time: 97 },
        { text: "Too much light for twilight", time: 104 },
        { text: "In the mood for the flowers love", time: 108 },
        { text: "At the time", time: 144 },
        { text: "The whisper of birds", time: 148 },
        { text: "Lonely before the sun cried", time: 153 },
        { text: "Fell from the sky", time: 158 },
        { text: "Like water drops", time: 164 },
        { text: "Where I'm now? I don't know why", time: 169 },
        { text: "Nice butterflies in my hands", time: 176 },
        { text: "Too much light for twilight", time: 183 },
        { text: "In the mood for the flowers", time: 188 },
        { text: "Love.", time: 190 }, // Ajustado para que "Love." aparezca al final
    ];

    function updateLyrics() {
        var time = Math.floor(audio.currentTime);
        var currentLine = lyricsData.find(
            (line) => time >= line.time && time < line.time + 6
        );

        if (currentLine) {
            var fadeInDuration = 0.1;
            var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);
            lyrics.style.opacity = opacity;
            lyrics.innerHTML = currentLine.text;
        } else {
            lyrics.style.opacity = 0;
            lyrics.innerHTML = "";
        }
    }

    // Solo iniciar la actualización de letras después de un tiempo para no superponerse
    // con el mensaje inicial de "Estas flores amarillas..." y los efectos de fiesta.
    // Ajusta este delay según el efecto que desees. 
    // Por ejemplo, si el título dura 216s, las letras deberían aparecer después.
    setTimeout(() => {
        lyricsInterval = setInterval(updateLyrics, 1000);
    }, 10000); // Retraso de 10 segundos antes de que empiecen a aparecer las letras. Ajusta según necesites.


    // Función para ocultar el título después de un tiempo
    function ocultarTitulo() {
        var titulo = document.querySelector(".titulo");
        titulo.style.animation = "fadeOut 3s ease-in-out forwards";
        setTimeout(function () {
            titulo.style.display = "none";
            // Opcional: una vez que el título se oculta, podrías querer hacer algo más,
            // como que las letras de la canción se vuelvan visibles o los efectos
            // dejen de ser tan intensos, si los quieres más en el inicio.
        }, 3000);
    }

    // Llama a la función de ocultar el título después de 216 segundos
    // Puedes ajustar este tiempo si quieres que el mensaje de flores dure menos.
    tituloTimeout = setTimeout(ocultarTitulo, 216000);

    // Si el botón de "Reproducir música" se llega a mostrar (por falla de autoplay)
    // esta función asegura que al hacer clic se reproduzca y se oculte.
    playButton.addEventListener("click", function () {
        audio.play().catch(e => console.error("Error al reproducir audio al hacer clic:", e));
        this.style.display = "none"; // Oculta el botón después de hacer clic
        // También podrías iniciar el confeti y las luces aquí si solo quieres que inicien al hacer clic en este botón
        // pero por tu solicitud, se inician al cargar la página.
    });
});