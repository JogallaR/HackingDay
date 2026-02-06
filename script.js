document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Mapa (Antorcha) ---
    const mapWrapper = document.getElementById('map-wrapper');
    const darknessLayer = document.getElementById('map-darkness');
    const torchCursor = document.getElementById('torch-cursor');

    function updateTorch(e) {
        const rect = mapWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Actualizar variables CSS para la máscara de oscuridad
        darknessLayer.style.setProperty('--x', `${x}px`);
        darknessLayer.style.setProperty('--y', `${y}px`);

        // Actualizar posición del elemento visual de la antorcha
        if (torchCursor) {
            torchCursor.style.setProperty('--x', `${x}px`);
            torchCursor.style.setProperty('--y', `${y}px`);
            torchCursor.style.opacity = '1'; // Hacer visible al mover
        }
    }

    if (mapWrapper) {
        mapWrapper.addEventListener('mousemove', updateTorch);

        mapWrapper.addEventListener('mouseleave', () => {
            if (torchCursor) torchCursor.style.opacity = '0';
        });

        // Inicializar antorcha (sin mostrar el cursor visual aún)
        // Esperamos un pequeño tick para asegurar que el layout esté listo
        setTimeout(() => {
            const rect = mapWrapper.getBoundingClientRect();
            // X = 10% del ancho (un poco adentro), Y = 90% del alto (abajo)
            const startX = rect.width * 0.1;
            const startY = rect.height * 0.9;

            darknessLayer.style.setProperty('--x', `${startX}px`);
            darknessLayer.style.setProperty('--y', `${startY}px`);
        }, 100);
    }

    // --- Lógica del Acertijo ---
    const answerInput = document.getElementById('riddle-answer');
    const submitBtn = document.getElementById('riddle-submit');
    const secretArea = document.getElementById('secret-code');
    const errorMsg = document.getElementById('error-msg');
    const validAnswers = ['SHPMI', 'shpmi', 'Shpmi'];

    function checkAnswer() {
        if (!secretArea || !errorMsg || !answerInput) return;

        secretArea.classList.add('hidden');
        errorMsg.classList.add('hidden');
        const text = answerInput.value.trim().toLowerCase();

        if (validAnswers.includes(text)) {
            secretArea.classList.remove('hidden');
        } else {
            errorMsg.classList.remove('hidden');
            answerInput.focus();
        }
    }

    if (submitBtn) submitBtn.addEventListener('click', checkAnswer);
    if (answerInput) answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
});
