document.querySelectorAll('.btn-umore').forEach(bottone => {
    bottone.addEventListener('click', function() {
        const nomeFile = this.getAttribute('data-file');
        // Percorso relativo corretto per GitHub Pages (senza / iniziale)
        const percorsoFile = 'lettere/' + nomeFile;

        // Mostra un testo di attesa temporaneo
        document.getElementById('testo-lettera').innerText = "Sto prendendo la tua lettera... ❤️";
        document.getElementById('modal-lettera').classList.remove('nascosto');

        // Va a prendere il file di testo
        fetch(percorsoFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lettera non trovata');
                }
                return response.text();
            })
            .then(testo => {
                document.getElementById('testo-lettera').innerText = testo;
            })
            .catch(error => {
                console.error("Errore:", error);
                document.getElementById('testo-lettera').innerText = "Errore nel caricamento della lettera. Controlla che il nome del file sia corretto! ❤️";
            });
    });
});

// Chiude il pop-up cliccando sulla "X"
document.querySelector('.chiudi-modal').addEventListener('click', () => {
    document.getElementById('modal-lettera').classList.add('nascosto');
});

// Chiude il pop-up cliccando fuori dalla lettera
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-lettera');
    if (e.target === modal) {
        modal.classList.add('nascosto');
    }
});