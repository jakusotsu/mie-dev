document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('session-date');
    const timeInput = document.getElementById('session-time');
    const addButton = document.getElementById('add-session-button');

    const validateInputs = () => {
        const dateValue = dateInput.value;
        const timeValue = timeInput.value;

        if (dateValue && timeValue) {
            addButton.disabled = false;
        } else {
            addButton.disabled = true;
        }
    };

    dateInput.addEventListener('input', validateInputs);
    timeInput.addEventListener('input', validateInputs);

    // Initial validation on page load
    validateInputs();
});
