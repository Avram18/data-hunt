const zeichenEingabeFeld = document.getElementById("zeichen-eingabe");
const hashWertFeld = document.getElementById("hash-wert");
const alphabet = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 10,
    'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 'r': 18, 's': 19, 't': 20,
    'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26
};
function berechneHash(eingabe) {
    result = "";
    for (let i = 0; i < eingabe.length; i++) {
        const zeichen = eingabe[i].toLowerCase();
        if (!alphabet[zeichen]) {
            if (zeichen === " ") {
                result += "0";
                continue;
            }
            console.log(`Das eingegebene Zeichen "${zeichen}" ist nicht im Alphabet enthalten.`);
        }
        let wert = alphabet[zeichen] * (i + 1);
        result += `${wert}`;
    }
    return result;
}
zeichenEingabeFeld.addEventListener("input", function () {
    const eingabe = zeichenEingabeFeld.value;
    hashWertFeld.value = berechneHash(eingabe);
});