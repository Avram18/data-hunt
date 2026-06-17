const zeichenEingabeFeld = document.getElementById("zeichen-eingabe");
const hashWertFeld = document.getElementById("hash-wert");
const randomStringFeld = document.getElementById("random-string");
const hashOutputFeld = document.getElementById("hash-output");
const oldValueFeld = document.getElementById("old-string-field");
const oldHashFeld = document.getElementById("old-hash-field");
const subtleObject = crypto.subtle;
const charValues = {
    ' ': 0, 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 10,
    'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 'r': 18, 's': 19, 't': 20,
    'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26
};
function berechneHash(eingabe) {
    let result = "";
    for (let i = 0; i < eingabe.length; i++) {
        const zeichen = eingabe[i].toLowerCase();
        if (charValues[zeichen] === undefined) {
            console.log(`Das eingegebene Zeichen "${zeichen}" ist nicht in den zulässigen Zeichen enthalten.`);
        }
        let wert = charValues[zeichen] * (i + 1);
        result += `${wert}`;
    }
    return result;
}

function generateRandomString() {
    let result = '';
    let length = Math.floor(Math.random() * 100) + 5; 
    let amountOfKeys = Object.keys(charValues).length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * amountOfKeys);
        if (i % (Math.floor(Math.random() * 3) + 2) === 0)    
            result += Object.keys(charValues)[randomIndex].toUpperCase();
        else 
            result += Object.keys(charValues)[randomIndex];
    }
    randomStringFeld.value = result;
}

async function updateHashOutput(value) {
    const hashBuffer = await crypto.subtle.digest(
        "SHA-512",
        new TextEncoder().encode(value)
    );
    const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

    return hashHex;
}

let newValueRequired;
let lastValue = "";
let lastHash = "";

zeichenEingabeFeld.addEventListener("input", function () {
    const eingabe = zeichenEingabeFeld.value;
    hashWertFeld.value = berechneHash(eingabe);
});

randomStringFeld.addEventListener("input", async function () {
    const currentValue = randomStringFeld.value;
    const hashValue = await updateHashOutput(currentValue);
    hashOutputFeld.value = hashValue;
    oldValueFeld.value = lastValue;
    oldHashFeld.value = lastHash;
    lastValue = currentValue;
    lastHash = hashValue;
});

document.addEventListener("DOMContentLoaded", async function () {
    generateRandomString();
    const initialValue = randomStringFeld.value;
    const initialHash = await updateHashOutput(initialValue);
    hashOutputFeld.value = initialHash;
    lastValue = initialValue;
    lastHash = initialHash;
});