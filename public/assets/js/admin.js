document.addEventListener('DOMContentLoaded', () => {
    const addCoinFormById = document.getElementById("add-coin-by-id");
    addCoinFormById.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const idInput = document.getElementById('coin-id');
        const id = idInput.value.trim();
        if (id) {
            // Make a call to your backend API to add the new coin
            fetch('/api/coin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ crypto_id: id })
            })
            .then(response => {
                if (response.ok) {
                    // If the response is successful, show a success message
                    showAlert(true, 'alert-primary', addCoinFormById);
                    console.log('Coin added successfully!');
                } else {
                    // If there is an error, show an error message
                    showAlert(false, 'alert-danger', addCoinFormById);
                    console.error('Failed to add coin:', response.statusText);
                }
            })
            .catch(error => {
                // If there is an error, show an error message
                showAlert(false, 'alert-danger', addCoinFormById);
                console.error('Error adding coin:', error);
            });
        } else {
            // Handle case when ID input is empty
            console.error('ID is required');
        }
    });

    // Add event listener for deleting a coin
    const deleteCoinFormById = document.getElementById("delete-coin-by-id");
    deleteCoinFormById.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const idInput = document.getElementById('coin-id-delete');
        const id = idInput.value.trim();
        if (id) {
            // Make a call to your backend API to delete the coin
            fetch(`/api/coin/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    // If the response is successful, show a success message
                    showAlert(true, 'alert-primary', deleteCoinFormById);
                    console.log('Coin deleted successfully!');
                } else {
                    // If there is an error, show an error message
                    showAlert(false, 'alert-danger', deleteCoinFormById);
                    console.error('Failed to delete coin:', response.statusText);
                }
            })
            .catch(error => {
                // If there is an error, show an error message
                showAlert(false, 'alert-danger', deleteCoinFormById);
                console.error('Error deleting coin:', error);
            });
        } else {
            // Handle case when ID input is empty
            console.error('ID is required');
        }
    });
});

// Function to create and show an alert
function showAlert(success, alertClass, formElement) {
    const message = success ? 'Coin action successful!' : 'Coin action failed!';
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', alertClass, 'alert-dismissible');
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    setTimeout(() => {
        alertDiv.remove();
    }, 1500);
    
    formElement.appendChild(alertDiv);
}

