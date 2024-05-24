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
                    // If the response is successful, do something (e.g., show a success message)
                    console.log('Coin added successfully!');
                } else {
                    // If there is an error, handle it accordingly
                    console.error('Failed to add coin:', response.statusText);
                }
            })
            .catch(error => console.error('Error adding coin:', error));
        } else {
            // Handle case when ID input is empty
            console.error('ID is required');
        }
    });


    // Add event listener for coin by name
    const addCoinFormByName = document.getElementById("add-coin-by-name");
    addCoinFormByName.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const nameInput = document.getElementById('coin-name');
        const name = nameInput.value.trim();
        if (name) {
            // Make a call to your backend API to add the new coin
            fetch('/api/coin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ crypto_name: name })
            })
            .then(response => {
                if (response.ok) {
                    // If the response is successful, do something (e.g., show a success message)
                    console.log('Coin added successfully!');
                } else {
                    // If there is an error, handle it accordingly
                    console.error('Failed to add coin:', response.statusText);
                }
            })
            .catch(error => console.error('Error adding coin:', error));
        } else {
            // Handle case when ID input is empty
            console.error('ID is required');
        }
    });
});
