// Constantes de conversión (unidades de longitud)
const CM_POR_PIE = 30.48;
const CM_POR_PULGADA = 2.54;
const PULGADAS_POR_PIE = 12;

// Constantes de conversión (Volumen)
const LITROS_POR_GALON = 3.78541; // Galón Americano

// Constantes de conversión (Velocidad)
const KMH_POR_MPH = 1.60934; // 1 Milla = 1.60934 Kilómetros

// Constantes de conversión (Almacenamiento Digital)
const BYTES_POR_KB = 1024;
const BYTES_POR_MB = BYTES_POR_KB * 1024;
const BYTES_POR_GB = BYTES_POR_MB * 1024;
const BYTES_POR_TB = BYTES_POR_GB * 1024;
const BITS_POR_BYTE = 8;


// --- Funcionalidad de Pies y Pulgadas a Centímetros ---

const inputPies = document.getElementById('inputPies');
const inputPulgadas = document.getElementById('inputPulgadas');
const btnPyPtoCm = document.getElementById('btnPyPtoCm');
const resultadoCmSpan = document.getElementById('resultadoCm');

function convertirPiesPulgadasACm(pies, pulgadas) {
    const cmDesdePies = pies * CM_POR_PIE;
    const cmDesdePulgadas = pulgadas * CM_POR_PULGADA;
    return cmDesdePulgadas + cmDesdePies;
}

btnPyPtoCm.addEventListener('click', () => {
    const pies = parseFloat(inputPies.value);
    const pulgadas = parseFloat(inputPulgadas.value);

    if (isNaN(pies) || isNaN(pulgadas)) {
        resultadoCmSpan.textContent = "Error: Por favor, introduce números válidos.";
        return;
    }

    const totalCm = convertirPiesPulgadasACm(pies, pulgadas);
    resultadoCmSpan.textContent = `${totalCm.toFixed(2)} cm`;
});

// --- Funcionalidad de Centímetros a Pies y Pulgadas ---

const inputCm = document.getElementById('inputCm');
const btnCmtoPyP = document.getElementById('btnCmtoPyP');
const resultadoPyP_Span = document.getElementById('resultadoPyP');

function convertirCmAPiesPulgadas(centimetros) {
    let pies = Math.floor(centimetros / CM_POR_PIE);
    let pulgadasDecimal = (centimetros / CM_POR_PIE - pies) * PULGADAS_POR_PIE;

    return { pies: pies, pulgadas: pulgadasDecimal };
}

btnCmtoPyP.addEventListener('click', () => {
    const centimetros = parseFloat(inputCm.value);

    if (isNaN(centimetros)) {
        resultadoPyP_Span.textContent = "Error: Por favor, introduce un número válido.";
        return;
    }

    const conversion = convertirCmAPiesPulgadas(centimetros);
    const pies = conversion.pies;
    const pulgadasDecimal = conversion.pulgadas;

    let pulgadasFormateadas = "";

    const TOLERANCIA = 0.001; // Para comparar números flotantes

    const pulgadasEnteras = Math.floor(pulgadasDecimal);
    const fraccionPulgada = pulgadasDecimal - pulgadasEnteras;

    if (fraccionPulgada > (0.5 - TOLERANCIA) && fraccionPulgada < (0.5 + TOLERANCIA)) {
        pulgadasFormateadas = `${pulgadasEnteras} 1/2`;
    } else if (fraccionPulgada > (0.25 - TOLERANCIA) && fraccionPulgada < (0.25 + TOLERANCIA)) {
        pulgadasFormateadas = `${pulgadasEnteras} 1/4`;
    } else if (fraccionPulgada > (0.75 - TOLERANCIA) && fraccionPulgada < (0.75 + TOLERANCIA)) {
        pulgadasFormateadas = `${pulgadasEnteras} 3/4`;
    } else if (pulgadasEnteras === 0 && pulgadasDecimal < TOLERANCIA) {
        pulgadasFormateadas = "0"; // Si es casi cero, muestra 0
    } else {
        if (fraccionPulgada < TOLERANCIA) { // Si la fracción es casi cero
             pulgadasFormateadas = pulgadasEnteras.toString();
        } else {
             pulgadasFormateadas = `${pulgadasDecimal.toFixed(1)}`; // Un decimal para el resto
        }
    }

    let piesFinal = pies;
    let pulgadasParaMostrar = pulgadasFormateadas;
    // Si las pulgadas son casi 12, las "pasa" a pies
    if (pulgadasDecimal >= PULGADAS_POR_PIE - TOLERANCIA && pulgadasDecimal < PULGADAS_POR_PIE + TOLERANCIA) {
         piesFinal++;
         pulgadasParaMostrar = "0";
    }

    resultadoPyP_Span.textContent = `${piesFinal} pies y ${pulgadasParaMostrar} pulgadas`;
});

// --- FUNCIONALIDAD: Conversor de Temperaturas ---

const inputFahrenheit = document.getElementById('inputFahrenheit');
const btnFtoC = document.getElementById('btnFtoC');
const resultadoCelsiusSpan = document.getElementById('resultadoCelsius');

const inputCelsius = document.getElementById('inputCelsius');
const btnCtoF = document.getElementById('btnCtoF');
const resultadoFahrenheitSpan = document.getElementById('resultadoFahrenheit');

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9);
}

function celsiusToFahrenheit(celsius) {
    return (celsius * (9 / 5)) + 32;
}

btnFtoC.addEventListener('click', () => {
    const fahrenheit = parseFloat(inputFahrenheit.value);

    if (isNaN(fahrenheit)) {
        resultadoCelsiusSpan.textContent = "Error: Por favor, introduce un número válido.";
        return;
    }

    const celsius = fahrenheitToCelsius(fahrenheit);
    resultadoCelsiusSpan.textContent = `${celsius.toFixed(2)} °C`;
});

btnCtoF.addEventListener('click', () => {
    const celsius = parseFloat(inputCelsius.value);

    if (isNaN(celsius)) {
        resultadoFahrenheitSpan.textContent = "Error: Por favor, introduce un número válido.";
        return;
    }

    const fahrenheit = celsiusToFahrenheit(celsius);
    resultadoFahrenheitSpan.textContent = `${fahrenheit.toFixed(2)} °F`;
});

// --- FUNCIONALIDAD: Conversor de Masa (Libras - Kilos) ---

const LBS_POR_KG = 2.20462;

const inputLibras = document.getElementById('inputLibras');
const btnLbsToKg = document.getElementById('btnLbsToKg');
const resultadoKilosSpan = document.getElementById('resultadoKilos');

const inputKilos = document.getElementById('inputKilos');
const btnKgToLbs = document.getElementById('btnKgToLbs');
const resultadoLibrasSpan = document.getElementById('resultadoLibras');

function librasToKilos(libras) {
    return libras / LBS_POR_KG;
}

function kilosToLibras(kilos) {
    return kilos * LBS_POR_KG;
}

btnLbsToKg.addEventListener('click', () => {
    const libras = parseFloat(inputLibras.value);

    if (isNaN(libras)) {
        resultadoKilosSpan.textContent = "Error: Por favor, introduce un número válido.";
        return;
    }

    const kilos = librasToKilos(libras);
    resultadoKilosSpan.textContent = `${kilos.toFixed(2)} kg`;
});

btnKgToLbs.addEventListener('click', () => {
    const kilos = parseFloat(inputKilos.value);

    if (isNaN(kilos)) {
        resultadoLibrasSpan.textContent = "Error: Por favor, introduce un número válido.";
        return;
    }

    const libras = kilosToLibras(kilos);
    resultadoLibrasSpan.textContent = `${libras.toFixed(2)} lbs`;
});


// --- FUNCIONALIDAD: Conversor de Volumen (Litros - Galones) ---

const inputLitros = document.getElementById('inputLitros');
const btnLitrosToGalones = document.getElementById('btnLitrosToGalones');
const resultadoGalonesSpan = document.getElementById('resultadoGalones');

const inputGalones = document.getElementById('inputGalones');
const btnGalonesToLitros = document.getElementById('btnGalonesToLitros');
const resultadoLitrosSpan = document.getElementById('resultadoLitros');

function litrosToGalones(litros) {
    return litros / LITROS_POR_GALON;
}

function galonesToLitros(galones) {
    return galones * LITROS_POR_GALON;
}

btnLitrosToGalones.addEventListener('click', () => {
    const litros = parseFloat(inputLitros.value);

    if (isNaN(litros)) {
        resultadoGalonesSpan.textContent = "Error: Por favor, introduce un número válido.";
        return;
    }

    const galones = litrosToGalones(litros);
    resultadoGalonesSpan.textContent = `${galones.toFixed(2)} gal`;
});

btnGalonesToLitros.addEventListener('click', () => {
    const galones = parseFloat(inputGalones.value);

    if (isNaN(galones)) {
        resultadoLitrosSpan.textContent = "Error: Por favor, introduce un número válido.";
        return;
    }

    const litros = galonesToLitros(galones);
    resultadoLitrosSpan.textContent = `${litros.toFixed(2)} L`;
});


// --- FUNCIONALIDAD: Conversor de Velocidad (Km/h - Millas/h) ---

const inputKmH = document.getElementById('inputKmH');
const btnKmHToMph = document.getElementById('btnKmHToMph');
const resultadoMphSpan = document.getElementById('resultadoMph');

const inputMph = document.getElementById('inputMph');
const btnMphToKmH = document.getElementById('btnMphToKmH');
const resultadoKmHSpan = document.getElementById('resultadoKmH');

function kmhToMph(kmh) {
    return kmh / KMH_POR_MPH;
}

function mphToKmh(mph) {
    return mph * KMH_POR_MPH;
}

btnKmHToMph.addEventListener('click', () => {
    const kmh = parseFloat(inputKmH.value);

    if (isNaN(kmh)) {
        resultadoMphSpan.textContent = "Error: Por favor, introduce un número válido.";
        return;
    }

    const mph = kmhToMph(kmh);
    resultadoMphSpan.textContent = `${mph.toFixed(2)} mph`;
});

btnMphToKmH.addEventListener('click', () => {
    const mph = parseFloat(inputMph.value);

    if (isNaN(mph)) {
        resultadoKmHSpan.textContent = "Error: Por favor, introduce un número válido.";
        return;
    }

    const kmh = mphToKmh(mph);
    resultadoKmHSpan.textContent = `${kmh.toFixed(2)} km/h`;
});


// --- FUNCIONALIDAD: Conversor de Almacenamiento Digital (Dropdown) ---

const storageUnitFromSelect = document.getElementById('storageUnitFrom');
const storageUnitToSelect = document.getElementById('storageUnitTo');
const storageValueInput = document.getElementById('storageValue');
const btnConvertStorage = document.getElementById('btnConvertStorage');
const storageResultSpan = document.getElementById('storageResult');

function convertStorage(fromUnit, toUnit, value) {
    const units = {
        bytes: 1, // Base: 1 byte
        kilobytes: BYTES_POR_KB, // 1024 bytes por KB
        megabytes: BYTES_POR_MB, // 1024 * 1024 bytes por MB
        gigabytes: BYTES_POR_GB,
        terabytes: BYTES_POR_TB,
        bits: 1 / BITS_POR_BYTE // 1 byte = 8 bits, entonces 1 bit = 1/8 bytes
    };

    if (!units.hasOwnProperty(fromUnit) || !units.hasOwnProperty(toUnit) || isNaN(value)) {
        return NaN; // Retorna NaN si las unidades no son válidas o el valor no es un número
    }

    // Paso 1: Convertir el valor de la unidad de origen a bytes (unidad base intermedia)
    const valueInBytes = value * units[fromUnit];

    // Paso 2: Convertir los bytes a la unidad de destino
    const result = valueInBytes / units[toUnit];

    return result;
}

btnConvertStorage.addEventListener('click', () => {
    const fromUnit = storageUnitFromSelect.value;
    const toUnit = storageUnitToSelect.value;
    const value = parseFloat(storageValueInput.value);

    if (isNaN(value)) {
        storageResultSpan.textContent = "Error: Por favor, introduce un número válido.";
        return;
    }

    const convertedValue = convertStorage(fromUnit, toUnit, value);

    if (isNaN(convertedValue)) {
        storageResultSpan.textContent = "Error en la conversión.";
        return;
    }

    // Obtener la abreviatura de la unidad de destino para mostrar
    let unitLabel = '';
    switch (toUnit) {
        case 'bytes': unitLabel = 'Bytes'; break;
        case 'kilobytes': unitLabel = 'KB'; break;
        case 'megabytes': unitLabel = 'MB'; break;
        case 'gigabytes': unitLabel = 'GB'; break;
        case 'terabytes': unitLabel = 'TB'; break;
        case 'bits': unitLabel = 'Bits'; break;
        default: unitLabel = ''; // Fallback
    }

    // Formatear el resultado. Los bits y bytes suelen ser enteros, las demás con 2 decimales.
    let formattedResult;
    if (toUnit === 'bytes' || toUnit === 'bits') {
        formattedResult = convertedValue.toFixed(0);
    } else {
        formattedResult = convertedValue.toFixed(2);
    }

    storageResultSpan.textContent = `${formattedResult} ${unitLabel}`;
});


// --- FUNCIONALIDAD: Conversor de Divisas Bidireccional ---

// Referencias a elementos HTML
const currencyFromSelect = document.getElementById('currencyFrom');
const currencyToSelect = document.getElementById('currencyTo');
const currencyAmountInput = document.getElementById('currencyAmount'); // <-- Input para el monto
const btnConvertCurrency = document.getElementById('btnConvertCurrency');
const currencyResultSpan = document.getElementById('currencyResult');

// ** IMPORTANTE: Reemplaza "TU_API_KEY_AQUI" con tu clave real de ExchangeRate-API **
const API_KEY = "208cb4ece171068644d99e95"; // <-- ¡¡PON TU CLAVE AQUÍ!!
const BASE_CURRENCY_API = "USD"; // Usaremos USD como moneda base para la API
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY_API}`;

let currentExchangeRates = {}; // Aquí se almacenarán las tasas obtenidas de la API

// Tasas de cambio de EJEMPLO (se usarán si la API falla)
// Estos valores NO son reales y son solo para fallback.
const FALLBACK_EXCHANGE_RATES = {
    "USD": {
        "ARS": 950.00, // 1 USD = 950 ARS
        "EUR": 0.92,   // 1 USD = 0.92 EUR (o 1 EUR = 1/0.92 USD)
        "GBP": 0.79    // 1 USD = 0.79 GBP (o 1 GBP = 1/0.79 USD)
    },
    "EUR": {
        "USD": 1.0869, // 1 EUR = 1/0.92 USD
        "ARS": 1020.00, // 1 EUR = 1020 ARS
        "GBP": 0.8587   // 1 EUR = 0.8587 GBP
    },
    "GBP": {
        "USD": 1.2658, // 1 GBP = 1/0.79 USD
        "ARS": 1200.00, // 1 GBP = 1200 ARS
        "EUR": 1.1645   // 1 GBP = 1/0.86 EUR
    },
    "ARS": {
        "USD": 0.001052, // 1 ARS = 1/950 USD
        "EUR": 0.000980, // 1 ARS = 1/1020 EUR
        "GBP": 0.000833  // 1 ARS = 1/1200 GBP
    }
};

// Función para obtener las tasas de cambio de la API
async function fetchAndSetExchangeRates() {
    currencyResultSpan.textContent = "Cargando tasas de cambio...";
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const data = await response.json();

        if (data.result === "success") {
            const ratesFromAPI = data.conversion_rates;
            
            currentExchangeRates = {
                "USD": {
                    "ARS": ratesFromAPI.ARS,
                    "EUR": ratesFromAPI.EUR,
                    "GBP": ratesFromAPI.GBP,
                    "USD": 1 
                },
                "EUR": {
                    "USD": 1 / ratesFromAPI.EUR,
                    "ARS": (1 / ratesFromAPI.EUR) * ratesFromAPI.ARS,
                    "GBP": (1 / ratesFromAPI.EUR) * ratesFromAPI.GBP,
                    "EUR": 1
                },
                "GBP": {
                    "USD": 1 / ratesFromAPI.GBP,
                    "ARS": (1 / ratesFromAPI.GBP) * ratesFromAPI.ARS,
                    "EUR": (1 / ratesFromAPI.GBP) * ratesFromAPI.EUR,
                    "GBP": 1
                },
                "ARS": {
                    "USD": 1 / ratesFromAPI.ARS,
                    "EUR": (1 / ratesFromAPI.ARS) * ratesFromAPI.EUR,
                    "GBP": (1 / ratesFromAPI.ARS) * ratesFromAPI.GBP,
                    "ARS": 1
                }
            };
            console.log("Tasas de cambio cargadas desde la API:", currentExchangeRates);
            currencyResultSpan.textContent = "Tasas actualizadas. ¡Listo para convertir!";

        } else {
            throw new Error(`API respondió con error: ${data.result} - ${data['error-type'] || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error("Error al obtener las tasas de cambio de la API:", error);
        currentExchangeRates = FALLBACK_EXCHANGE_RATES; // Usar tasas de fallback si falla la API
        currencyResultSpan.textContent = "Error al cargar tasas desde la API. Usando tasas de ejemplo.";
    }
}


// Función para convertir divisas (usando las tasas cargadas)
function convertCurrency(amount, fromCurrency, toCurrency) {
    const rates = Object.keys(currentExchangeRates).length > 0 ? currentExchangeRates : FALLBACK_EXCHANGE_RATES;

    if (isNaN(amount) || amount < 0) {
        return NaN;
    }

    if (fromCurrency === toCurrency) {
        return amount;
    }

    if (rates[fromCurrency] && rates[fromCurrency][toCurrency]) {
        return amount * rates[fromCurrency][toCurrency];
    } else {
        let amountInBaseCurrency;
        if (fromCurrency === BASE_CURRENCY_API) {
            amountInBaseCurrency = amount;
        } else if (rates[fromCurrency] && rates[fromCurrency][BASE_CURRENCY_API]) {
            amountInBaseCurrency = amount * rates[fromCurrency][BASE_CURRENCY_API];
        } else {
            console.error(`Tasa de conversión de ${fromCurrency} a ${BASE_CURRENCY_API} no disponible.`);
            return NaN;
        }

        if (toCurrency === BASE_CURRENCY_API) {
            return amountInBaseCurrency;
        } else if (rates[BASE_CURRENCY_API] && rates[BASE_CURRENCY_API][toCurrency]) {
            return amountInBaseCurrency * rates[BASE_CURRENCY_API][toCurrency];
        } else {
            console.error(`Tasa de conversión de ${BASE_CURRENCY_API} a ${toCurrency} no disponible.`);
            return NaN;
        }
    }
}


btnConvertCurrency.addEventListener('click', () => {
    // Para el cálculo, siempre limpiar el input de cualquier separador de miles (puntos)
    // y asegurar que el separador decimal sea un punto para parseFloat.
    const fromCurrency = currencyFromSelect.value;
    const toCurrency = currencyToSelect.value;
    const amount = parseFloat(currencyAmountInput.value.replace(/\./g, '').replace(/,/g, '.')); // Elimina puntos de miles y convierte coma a punto decimal

    if (isNaN(amount) || amount < 0) {
        currencyResultSpan.textContent = "Error: Por favor, introduce un monto válido y positivo.";
        return;
    }

    const convertedValue = convertCurrency(amount, fromCurrency, toCurrency);

    if (isNaN(convertedValue)) {
        currencyResultSpan.textContent = "Error en la conversión. Monedas no soportadas o datos inválidos.";
    } else {
        // Formatear el resultado con puntos para miles y comas para decimales para la visualización (es-AR)
        currencyResultSpan.textContent = `${convertedValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`;
    }
});


// --- FUNCIONALIDAD DE FORMATO DE INPUT DE DIVISAS (SIMPLIFICADA) ---

currencyAmountInput.addEventListener('input', (event) => {
    const input = event.target;
    let value = input.value;
    const originalSelectionStart = input.selectionStart;

    // 1. Limpiar el valor: permitir solo dígitos y UN punto decimal.
    // Reemplazar comas por puntos para tener un formato consistente internamente.
    value = value.replace(/,/g, '.'); // Cambiar comas a puntos

    // Remover todos los caracteres que no sean dígitos o un punto decimal
    let cleanedValue = '';
    let hasDecimal = false;
    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        if (char >= '0' && char <= '9') {
            cleanedValue += char;
        } else if (char === '.' && !hasDecimal) {
            cleanedValue += char;
            hasDecimal = true;
        }
    }
    value = cleanedValue;

    // Remover ceros iniciales, a menos que el valor sea "0" o "0."
    if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
        value = value.substring(1);
    }
    if (value === '') {
        value = ''; // Mantener vacío si no hay nada
    } else if (value === '.') {
        value = '0.'; // Si solo se escribe '.', convertir a '0.'
    }

    input.value = value;

    // Ajustar la posición del cursor (simplificado)
    // Básicamente, si el valor se acortó, mover el cursor a la izquierda la misma cantidad.
    // Si el valor se mantuvo igual o se alargó, la posición del cursor no cambia drásticamente.
    const newLength = input.value.length;
    let newCursorPosition = originalSelectionStart - (oldLength - newLength);
    
    // Asegurarse de que el cursor no salte más allá del final o antes del inicio
    newCursorPosition = Math.max(0, Math.min(newCursorPosition, newLength));
    input.setSelectionRange(newCursorPosition, newCursorPosition);
});


// --- Bloque DOMContentLoaded (asegura que el DOM esté cargado) ---
document.addEventListener('DOMContentLoaded', (event) => {
    // Inicialización de Conversores (se mantienen como estaban)
    // Longitud
    if (inputPies.value === "" && inputPulgadas.value === "") {
        resultadoCmSpan.textContent = "Ingresa pies y pulgadas para convertir.";
    } else {
        btnPyPtoCm.click();
    }

    if (inputCm.value === "") {
        resultadoPyP_Span.textContent = "Ingresa centímetros para convertir.";
    } else {
        btnCmtoPyP.click();
    }

    // Temperaturas
    if (inputFahrenheit.value === "") {
        resultadoCelsiusSpan.textContent = "Ingresa Fahrenheit para convertir.";
    } else {
        btnFtoC.click();
    }

    if (inputCelsius.value === "") {
        resultadoFahrenheitSpan.textContent = "Ingresa Celsius para convertir.";
    } else {
        btnCtoF.click();
    }

    // Masa
    if (inputLibras.value === "") {
        resultadoKilosSpan.textContent = "Ingresa libras para convertir.";
    } else {
        btnLbsToKg.click();
    }

    if (inputKilos.value === "") {
        resultadoLibrasSpan.textContent = "Ingresa kilos para convertir.";
    } else {
        btnKgToLbs.click();
    }

    // Volumen
    if (inputLitros.value === "") {
        resultadoGalonesSpan.textContent = "Ingresa litros para convertir.";
    } else {
        btnLitrosToGalones.click();
    }

    if (inputGalones.value === "") {
        resultadoLitrosSpan.textContent = "Ingresa galones para convertir.";
    } else {
        btnGalonesToLitros.click();
    }

    // Velocidad
    if (inputKmH.value === "") {
        resultadoMphSpan.textContent = "Ingresa Km/h para convertir.";
    } else {
        btnKmHToMph.click();
    }

    if (inputMph.value === "") {
        resultadoKmHSpan.textContent = "Ingresa Millas/h para convertir.";
    } else {
        btnMphToKmH.click();
    }

    // Almacenamiento Digital
    storageResultSpan.textContent = "Selecciona unidades y un valor para convertir.";

    // Divisas
    fetchAndSetExchangeRates(); // <-- ¡Llamada a la API al cargar la página!
});