function log(nachricht) {
    let p = document.createElement("p");
    p.innerText = "> " + nachricht;
    document.getElementById("protokoll").appendChild(p);
}

function dreiStellig(zahl) {
    return zahl.toString().padStart(3, "0");
}

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

function modPow(basis, exp, modulo) {
    let ergebnis = 1n;
    basis = basis % modulo;
    while (exp > 0n) {
        if (exp % 2n === 1n) ergebnis = (ergebnis * basis) % modulo;
        exp = exp / 2n;
        basis = (basis * basis) % modulo;
    }
    return ergebnis;
}

const g = BigInt(zufaelligePrimzahl(5, 20));  
const p = BigInt(zufaelligePrimzahl(50, 200)); 
document.getElementById("festgelegteWerte").innerText = `Festgelegte Werte: g = ${g}, p = ${p}`;
document.querySelectorAll(".hilfe-g").forEach(el => el.innerText = g);
document.querySelectorAll(".hilfe-p").forEach(el => el.innerText = p);
let teilKeyAlice = null;
let teilKeyBob = null;
let aliceGesendet = false;
let bobGesendet = false;
document.getElementById("btn-berechne-alice").addEventListener("click", function () {
    let eingabe = document.getElementById("eingabe-alice").value;
    if (eingabe === "") {
        alert("Bitte geben Sie eine geheime Zahl für Alice ein.");
        return;
    }
    teilKeyAlice = modPow(g, BigInt(eingabe), p);
    document.getElementById("ausgabe-alice").innerText = dreiStellig(teilKeyAlice);
    document.getElementById("btn-berechne-alice").disabled = true;
    document.getElementById("btn-sende-alice").disabled = false;
});
document.getElementById("btn-berechne-bob").addEventListener("click", function () {
    let eingabe = document.getElementById("eingabe-bob").value;
    if (eingabe === "") {
        alert("Bitte geben Sie eine geheime Zahl für Bob ein.");
        return;
    }
    teilKeyBob = modPow(g, BigInt(eingabe), p);
    document.getElementById("ausgabe-bob").innerText = dreiStellig(teilKeyBob);
    document.getElementById("btn-berechne-bob").disabled = true;
    document.getElementById("btn-sende-bob").disabled = false;
    document.querySelectorAll(".hilfe-pubB").forEach(el => el.innerText = teilKeyBob);
});

document.getElementById("btn-sende-alice").addEventListener("click", function () {
    this.disabled = true;
    aliceGesendet = true;
    log("Alice sendet Teil-Key: " + dreiStellig(teilKeyAlice));
    pruefeBeideGesendet();
});

document.getElementById("btn-sende-bob").addEventListener("click", function () {
    this.disabled = true;
    bobGesendet = true;
    log("Bob sendet Teil-Key: " + dreiStellig(teilKeyBob));
    pruefeBeideGesendet();
});

function pruefeBeideGesendet() {
    if (aliceGesendet && bobGesendet) {
        document.getElementById("ergebnis-bereich").style.display = "block";
        log("Beide Werte empfangen. Berechnen Sie das gemeinsame Geheimnis!");
    }
}

document.getElementById("calc-btn").addEventListener("click", function () {
    let basis = document.getElementById("calc-base").value;
    let exp   = document.getElementById("calc-exp").value;
    let mod   = document.getElementById("calc-mod").value;
    if (basis === "" || exp === "" || mod === "") return;
    let ergebnis = modPow(BigInt(basis), BigInt(exp), BigInt(mod));
    document.getElementById("calc-result").innerText = ergebnis.toString();
});

document.getElementById("btn-pruefe").addEventListener("click", function () {
    let a = BigInt(document.getElementById("eingabe-alice").value);
    let b = BigInt(document.getElementById("eingabe-bob").value);
    let eingabe = document.getElementById("eingabe-geheimnis").value;
    if (eingabe === "") {
        alert("Bitte geben Sie das gemeinsame Geheimnis ein.");
        return;
    }
    let ergebnisAlice = modPow(teilKeyBob, a, p);
    let ergebnisBob   = modPow(teilKeyAlice, b, p);
    let code = dreiStellig(ergebnisAlice);
    if (eingabe !== code) {
        log("Falscher Code. Versuchen Sie es nochmal.");
        return;
    }
    this.disabled = true;
    document.getElementById("ergebnis-zahl").innerText = code;
    log("Erfolg! Das gemeinsame Geheimnis lautet: " + code);
    let schloss = document.getElementById("schloss");
    schloss.src = "../img/lock_open.svg";
    schloss.classList.add("schloss-aufgehen");
    document.getElementById("ergebnis-bereich").classList.add("erfolg-leuchten");
});