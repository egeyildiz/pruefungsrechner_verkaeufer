document.addEventListener("DOMContentLoaded", () => {
    console.log("Script geladen und DOM bereit!"); // Debug-Ausgabe

    const themeSwitcher = document.getElementById("theme-switcher");
    const berechnenBtn = document.getElementById("berechnen-btn"); // ID statt der Klasse
    const ergebnis = document.getElementById("ergebnis");
    const summeErgebnisse = document.getElementById("summe-ergebnisse");
    const body = document.body;

    // Sicherstellen, dass der Button gefunden wurde
    if (berechnenBtn) {
        console.log("Berechnen-Button gefunden!");

        // Berechnung der Punkte, Ergebnisse und Noten
        berechnenBtn.addEventListener("click", () => {
            console.log("Button geklickt!"); // Debug-Ausgabe
            const punkte = [
                parseFloat(document.getElementById("punkte1").value) || 0,
                parseFloat(document.getElementById("punkte2").value) || 0,
                parseFloat(document.getElementById("punkte3").value) || 0,
                parseFloat(document.getElementById("punkte4").value) || 0,
            ];

            const mepr = [
                parseFloat(document.getElementById("mepr1").value) || 0,
                parseFloat(document.getElementById("mepr2").value) || 0,
                parseFloat(document.getElementById("mepr3").value) || 0,
            ];

            const faktoren = [25, 15, 10, 50];
            let gesamtpunkte = 0;
            let ergebnisSumme = 0; // Variable für die Summe der Ergebnisse

            // Ergebnisse und Noten berechnen
            for (let i = 0; i < 4; i++) {
                const noteField = document.getElementById(`note${i + 1}`);
                const ergebnisField = document.getElementById(`ergebnis1_${i + 1}`);
                let endPunkte = punkte[i];

                if (i < 3 && mepr[i] > 0) {
                    endPunkte = (punkte[i] * 2 + mepr[i]) / 3;
                }

                const ergebnis1 = Math.round(endPunkte * faktoren[i]); // Ergebnis auf ganze Zahl runden
                gesamtpunkte += ergebnis1;
                ergebnisSumme += ergebnis1; // Summe berechnen

                // Ergebnis in Tabelle einfügen
                ergebnisField.textContent = ergebnis1;

                // Note berechnen
                const note = calculateGrade(endPunkte);
                noteField.textContent = note;
            }

            // Summe der Ergebnisse anzeigen
            summeErgebnisse.textContent = Math.round(ergebnisSumme); // Ganze Zahl anzeigen

            // Gesamtergebnis und Status berechnen
            const durchschnittspunkte = gesamtpunkte / 100; // Gewichtung von 100% berücksichtigen
            const bestanden = durchschnittspunkte >= 70;

            // Ergebnis anzeigen
            ergebnis.innerHTML = `
                Ø Punkte: ${durchschnittspunkte.toFixed(2).replace('.', ',')}<br>
                <span class="${bestanden ? 'erfolg' : 'nicht-erfolg'}">
                    ${bestanden ? 'bestanden' : 'nicht bestanden'}
                </span>
            `;
        });
    } else {
        console.error("Berechnen-Button nicht gefunden!");
    }

    // Funktion für Notenberechnung
    function calculateGrade(punkte) {
        if (punkte >= 92) return 1;
        if (punkte >= 81) return 2;
        if (punkte >= 67) return 3;
        if (punkte >= 50) return 4;
        if (punkte >= 30) return 5;
        return 6;
    }
}); 