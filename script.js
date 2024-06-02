document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('surveyForm');
    const successMessage = document.getElementById('successMessage');
    const formSummary = document.getElementById('formSummary');
    const userName = document.getElementById('userName');
    const existingInsuranceRadios = document.getElementsByName('existingInsurance');
    const existingInsuranceDetails = document.querySelector('.existing-insurance-details');
    const reasonNoInsurance = document.querySelector('.reason-no-insurance');

    existingInsuranceRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'yes') {
                existingInsuranceDetails.classList.remove('hidden');
                reasonNoInsurance.classList.add('hidden');
            } else {
                existingInsuranceDetails.classList.add('hidden');
                reasonNoInsurance.classList.remove('hidden');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            form.classList.add('fadeOut');
            setTimeout(() => {
                form.classList.add('hidden');
                displayFormSummary();
                successMessage.classList.remove('hidden');
            }, 500);
        }
    });

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const age = document.getElementById('age').value.trim();
        const gender = document.getElementById('gender').value;
        const insuranceType = document.getElementById('insuranceType').value;
        const existingInsurance = document.querySelector('input[name="existingInsurance"]:checked').value;
        let isValid = true;

        if (name === '' || email === '' || age === '' || gender === '' || insuranceType === '' || !existingInsurance) {
            alert('Please fill in all required fields.');
            isValid = false;
        }

        if (existingInsurance === 'yes') {
            const vehicleType = document.getElementById('vehicleType').value;
            if (vehicleType === '') {
                alert('Please select the vehicle type.');
                isValid = false;
            }
        }

        if (existingInsurance === 'no') {
            const reason = document.getElementById('reason').value.trim();
            if (reason === '') {
                alert('Please provide a reason for not having insurance.');
                isValid = false;
            }
        }

        return isValid;
    }

    function displayFormSummary() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const insuranceType = document.getElementById('insuranceType').value;
        const existingInsurance = document.querySelector('input[name="existingInsurance"]:checked').value;
        let vehicleType = '';
        let reason = '';

        if (existingInsurance === 'yes') {
            vehicleType = document.getElementById('vehicleType').value;
        } else {
            reason = document.getElementById('reason').value;
        }

        let summaryHtml = `
            <h3>Form Summary</h3>
            <p><strong>Full Name:</strong> ${name}</p>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Type of Insurance Needed:</strong> ${insuranceType}</p>
            <p><strong>Do you have existing vehicle insurance?</strong> ${existingInsurance === 'yes' ? 'Yes' : 'No'}</p>
        `;

        if (existingInsurance === 'yes') {
            summaryHtml += `<p><strong>Vehicle Type:</strong> ${vehicleType}</p>`;
        } else {
            summaryHtml += `<p><strong>Reason for not having insurance:</strong> ${reason}</p>`;
        }

        const comments = document.getElementById('comments').value;
        if (comments) {
            summaryHtml += `<p><strong>Additional Comments:</strong> ${comments}</p>`;
        }

        userName.textContent = name;
        formSummary.innerHTML = summaryHtml;
    }
});
