function istPrimzahl(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function zufaelligePrimzahl(min, max) {
    let primzahlen = [];
    for (let i = min; i <= max; i++) {
        if (istPrimzahl(i)) primzahlen.push(i);
    }
    return primzahlen[Math.floor(Math.random() * primzahlen.length)];
}

let p = 0;
let q = 0;
let n = 0;

function neueAufgabe() {
    p = zufaelligePrimzahl(11, 31);
    do {
        q = zufaelligePrimzahl(11, 31);
    } while (q === p); 
    n = p * q;
    document.getElementById("anzeige-n").innerText = n;
    document.getElementById("calc-n").innerText = n;
    document.getElementById("eingabe-p").value = "";
    document.getElementById("eingabe-q").value = "";
    document.getElementById("rechnung-ergebnis").innerText = "?";
    document.getElementById("rechnung-ergebnis").className = "fw-bold fs-4";
    document.getElementById("status").innerText = "";
    document.getElementById("btn-pruefe").disabled = false;
    document.getElementById("calc-teiler").value = "";
    document.getElementById("calc-result").innerText = "?";
}

function zeigeProdukt() {
    let eP = parseInt(document.getElementById("eingabe-p").value);
    let eQ = parseInt(document.getElementById("eingabe-q").value);
    let span = document.getElementById("rechnung-ergebnis");
    if (isNaN(eP) || isNaN(eQ)) {
        span.innerText = "?";
        span.className = "fw-bold fs-4";
        return;
    }
    span.innerText = eP * eQ;
    span.className = "fw-bold fs-4 " + (eP * eQ === n ? "text-success" : "text-danger");
}

document.getElementById("eingabe-p").addEventListener("input", zeigeProdukt);
document.getElementById("eingabe-q").addEventListener("input", zeigeProdukt);
document.getElementById("btn-pruefe").addEventListener("click", function () {
    let eP = parseInt(document.getElementById("eingabe-p").value);
    let eQ = parseInt(document.getElementById("eingabe-q").value);
    let status = document.getElementById("status");
    if (isNaN(eP) || isNaN(eQ)) {
        status.innerText = "Bitte beide Zahlen eingeben.";
        status.className = "mt-2 mb-0 text-danger";
        return;
    }
    if (eP * eQ !== n) {
        status.innerText = `Das Produkt stimmt nicht. ${eP} × ${eQ} = ${eP * eQ}, nicht ${n}.`;
        status.className = "mt-2 mb-0 text-danger";
        return;
    }
    if (!istPrimzahl(eP) || !istPrimzahl(eQ)) {
        status.innerText = "Das Produkt stimmt, aber mindestens eine der Zahlen ist keine Primzahl.";
        status.className = "mt-2 mb-0 text-warning";
        return;
    }
    status.innerText = `Richtig! ${eP} × ${eQ} = ${n}. Beide sind Primzahlen.`;
    status.className = "mt-2 mb-0 text-success fw-bold";
    this.disabled = true;
});

document.getElementById("calc-btn").addEventListener("click", function () {
    let teiler = parseInt(document.getElementById("calc-teiler").value);
    let ergebnis = document.getElementById("calc-result");
    if (isNaN(teiler) || teiler === 0) {
        ergebnis.innerText = "?";
        return;
    }
    if (n % teiler === 0) {
        ergebnis.innerText = `${n / teiler} (geht auf!)`;
        ergebnis.className = "fw-bold text-success";
    } else {
        ergebnis.innerText = `${(n / teiler).toFixed(2)} (geht nicht auf)`;
        ergebnis.className = "fw-bold text-danger";
    }
});

document.getElementById("btn-neu").addEventListener("click", neueAufgabe);
neueAufgabe();
