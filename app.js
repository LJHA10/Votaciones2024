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
const count1Display = document.getElementById('count1');
const count2Display = document.getElementById('count2');
const count3Display = document.getElementById('count3');
const count4Display = document.getElementById('count4');
const count5Display = document.getElementById('count5');
const count6Display = document.getElementById('count6');
const count7Display = document.getElementById('count7');
const count8Display = document.getElementById('count8');
const count9Display = document.getElementById('count9');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button5 = document.getElementById('button5');
const button6 = document.getElementById('button6');
const button7 = document.getElementById('button7');
const button8 = document.getElementById('button8');
const button9 = document.getElementById('button9');
const sectionSelect = document.getElementById('sectionSelect');

// Función para incrementar el contador en la sección seleccionada
function incrementCounter(section, counterName) {
    console.log(`Incrementando contador ${counterName} en la sección ${section}`);
    const sectionCountersRef = database.ref(`counters/${section}/${counterName}`);
    sectionCountersRef.transaction((currentCount) => {
        const newCount = (currentCount || 0) + 1;
        console.log(`Nuevo valor del contador ${counterName} en la sección ${section}: ${newCount}`);
        return newCount;
    }, (error, committed, snapshot) => {
        if (error) {
            console.error(`Error al incrementar ${counterName} en la sección ${section}: ${error.message}`);
        } else if (!committed) {
            console.warn(`Transacción no confirmada para ${counterName} en la sección ${section}`);
        } else {
            console.log(`Contador ${counterName} en la sección ${section} incrementado exitosamente`);
        }
    });
}

// Escuchar eventos de clic en los botones
button1.addEventListener('click', () => {
    const selectedSection = sectionSelect.value;
    incrementCounter(selectedSection, 'button1');
});

button2.addEventListener('click', () => {
    const selectedSection = sectionSelect.value;
    incrementCounter(selectedSection, 'button2');
});

button3.addEventListener('click', () => {
    const selectedSection = sectionSelect.value;
    incrementCounter(selectedSection, 'button3');
});

button4.addEventListener('click', () => {
    const selectedSection = sectionSelect.value;
    incrementCounter(selectedSection, 'button4');
});

button5.addEventListener('click', () => {
    const selectedSection = sectionSelect.value;
    incrementCounter(selectedSection, 'button5');
});

button6.addEventListener('click', () => {
    const selectedSection = sectionSelect.value;
    incrementCounter(selectedSection, 'button6');
});

button7.addEventListener('click', () => {
    const selectedSection = sectionSelect.value;
    incrementCounter(selectedSection, 'button7');
});

button8.addEventListener('click', () => {
    const selectedSection = sectionSelect.value;
    incrementCounter(selectedSection, 'button8');
});

button9.addEventListener('click', () => {
    const selectedSection = sectionSelect.value;
    incrementCounter(selectedSection, 'button9');
});

// Actualizar contadores cuando cambia la selección de sección
sectionSelect.addEventListener('change', () => {
    const selectedSection = sectionSelect.value;
    const sectionCountersRef = database.ref(`counters/${selectedSection}`);
    sectionCountersRef.on('value', (snapshot) => {
        const counters = snapshot.val() || {};
        count1Display.textContent = counters.button1 || 0;
        count2Display.textContent = counters.button2 || 0;
        count3Display.textContent = counters.button3 || 0;
        count4Display.textContent = counters.button4 || 0;
        count5Display.textContent = counters.button5 || 0;
        count6Display.textContent = counters.button6 || 0;
        count7Display.textContent = counters.button7 || 0;
        count8Display.textContent = counters.button8 || 0;
        count9Display.textContent = counters.button9 || 0;
    });
});

// Inicializar contadores para la sección seleccionada inicialmente
const initialSection = sectionSelect.value;
const initialSectionCountersRef = database.ref(`counters/${initialSection}`);
initialSectionCountersRef.on('value', (snapshot) => {
    const counters = snapshot.val() || {};
    count1Display.textContent = counters.button1 || 0;
    count2Display.textContent = counters.button2 || 0;
    count3Display.textContent = counters.button3 || 0;
    count4Display.textContent = counters.button4 || 0;
    count5Display.textContent = counters.button5 || 0;
    count6Display.textContent = counters.button6 || 0;
    count7Display.textContent = counters.button7 || 0;
    count8Display.textContent = counters.button8 || 0;
    count9Display.textContent = counters.button9 || 0;
});
