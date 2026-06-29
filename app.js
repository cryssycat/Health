const dateInput = document.getElementById("date");
const sysInput = document.getElementById("sys");
const diaInput = document.getElementById("dia");
const pulseInput = document.getElementById("pulse");
const sugarInput = document.getElementById("sugar");
const fastingInput = document.getElementById("fasting");
const positionInput = document.getElementById("position");
const cuffInput = document.getElementById("cuff");
const notesInput = document.getElementById("notes");
const saveButton = document.getElementById("save");
const status = document.getElementById("status");

dateInput.value = new Date().toISOString().slice(0, 16);

saveButton.addEventListener("click", async () => {
    status.textContent = "Saving...";

    const body = {
        date: dateInput.value,
        systolic: Number(sysInput.value),
        diastolic: Number(diaInput.value),
        pulse: Number(pulseInput.value),
        bloodSugar: Number(sugarInput.value),
        fasting: fastingInput.checked,
        position: positionInput.value,
        cuff: cuffInput.value,
        notes: notesInput.value
    };

    try {
        const response = await fetch("https://sbrewhealth.crysthigpen.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        status.textContent = "✅ Saved!";
    } catch (err) {
        console.error(err);
        status.textContent = "❌ " + err.message;
    }
});
