document.querySelectorAll('.formula-box').forEach(div => {
    const inputs = div.querySelectorAll('input');
    const formulaElement = div.querySelector('formula');
    if (!formulaElement) return;
    const formula = formulaElement.getAttribute('evaluator');
    const output = div.querySelector('output');
    const formulaText = div.querySelector('.formula-text');

    // Inject the formula explicitly above each formula box
    formulaText.textContent = `Formula: ${formula}`;

    function calculate() {
        let values = {};
        let invalidInput = false;

        inputs.forEach(input => {
            const value = parseFloat(input.value);
            if (isNaN(value) && input.value !== "") {
                invalidInput = true;
            }
            values[input.id] = isNaN(value) ? 0 : value;
        });

        if (invalidInput) {
            output.textContent = "Invalid input";
            return;
        }

        try {
            output.textContent = new Function(...Object.keys(values), `return ${formula}`)(...Object.values(values));
        } catch (e) {
            output.textContent = "Error";
        }
    }

    inputs.forEach(input => input.addEventListener('input', calculate));
});