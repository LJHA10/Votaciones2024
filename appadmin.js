const firebaseConfig = {
    apiKey: "AIzaSyAT8t-sccO7QlKEkJxnRVrDntXIyfnE2jI",
    authDomain: "eleccion2024-45f15.firebaseapp.com",
    projectId: "eleccion2024-45f15",
    databaseURL: "https://eleccion2024-45f15-default-rtdb.firebaseio.com",
    storageBucket: "eleccion2024-45f15.appspot.com",
    messagingSenderId: "389834967356",
    appId: "1:389834967356:web:13ad488ab5c18b408af639",
    measurementId: "G-XKVKE1PTH8"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Referencias a elementos HTML
const countDisplays = {
    button1: document.getElementById('count1'),
    button2: document.getElementById('count2'),
    button3: document.getElementById('count3'),
    button4: document.getElementById('count4'),
    button5: document.getElementById('count5'),
    button6: document.getElementById('count6'),
    button7: document.getElementById('count7'),
    button8: document.getElementById('count8'),
    button9: document.getElementById('count9')
};
const sectionSelect = document.getElementById('sectionSelect');

// Configuración de la gráfica
const ctx = document.getElementById('votesChart').getContext('2d');
const votesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['PRI', 'PAN', 'PRD', 'MORENA', 'MOVIMIENTO CIUDADANO', 'PT', 'FUERZA MEXICO', 'NUEVA ALIANZA', 'VOTOS NULOS'],
        datasets: [{
            label: 'Votos',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(0, 128, 0, 0.5)',   // PRI (verde)
                'rgba(0, 0, 255, 0.5)',   // PAN (azul)
                'rgba(255, 255, 0, 0.5)', // PRD (amarillo)
                'rgba(128, 0, 0, 0.5)',   // MORENA (marrón)
                'rgba(255, 165, 0, 0.5)', // MOVIMIENTO CIUDADANO (naranja)
                'rgba(255, 0, 0, 0.5)',   // PT (rojo)
                'rgba(255, 192, 203, 0.5)', // FUERZA MEXICO (rosa)
                'rgba(0, 255, 255, 0.5)', // NUEVA ALIANZA (verde agua)
                'rgba(128, 128, 128, 0.5)' // Botón 9 (gris)
            ],
            borderColor: [
                'rgb(0, 128, 0)',   // PRI (verde)
                'rgb(0, 0, 255)',   // PAN (azul)
                'rgb(255, 255, 0)', // PRD (amarillo)
                'rgb(128, 0, 0)',   // MORENA (marrón)
                'rgb(255, 165, 0)', // MOVIMIENTO CIUDADANO (naranja)
                'rgb(255, 0, 0)',   // PT (rojo)
                'rgb(255, 192, 203)', // FUERZA MEXICO (rosa)
                'rgb(0, 255, 255)', // NUEVA ALIANZA (verde agua)
                'rgb(128, 128, 128)' // Botón 9 (gris)
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Función para actualizar los contadores y la gráfica
function updateCounters(section) {
    const sectionCountersRef = database.ref(`counters/${section}`);
    sectionCountersRef.on('value', (snapshot) => {
        const counters = snapshot.val() || {};
        for (const [button, display] of Object.entries(countDisplays)) {
            const count = counters[button] || 0;
            display.textContent = count;
        }

        // Actualizar la gráfica
        votesChart.data.datasets[0].data = [
            counters.button1 || 0,
            counters.button2 || 0,
            counters.button3 || 0,
            counters.button4 || 0,
            counters.button5 || 0,
            counters.button6 || 0,
            counters.button7 || 0,
            counters.button8 || 0,
            counters.button9 || 0
        ];
        votesChart.update();
    });
}

// Actualizar contadores cuando cambia la selección de sección
sectionSelect.addEventListener('change', () => {
    const selectedSection = sectionSelect.value;
    updateCounters(selectedSection);
});

// Inicializar contadores para la sección seleccionada inicialmente
updateCounters(sectionSelect.value);
