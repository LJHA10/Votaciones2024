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
        labels: ['PRI', 'PAN', 'PRD', 'MORENA', 'MOVIMIENTO CIUDADANO', 'PT', 'FUERZA MEXICO', 'NUEVA ALIANZA', 'Botón 9'],
        datasets: [{
            label: 'Votos',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
                '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5', '#FF8C33', '#8C33FF', '#FF3388', '#33FFBB'
            ],
            borderColor: [
                '#C70039', '#00FF00', '#0000FF', '#FFC0CB', '#00FFFF', '#FFA500', '#800080', '#FF69B4', '#00FF7F'
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
