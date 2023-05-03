async function getAllBands() {
    // fetch all data from the rest API
    const response = await fetch('http://localhost:3000/bands');
    //convert data to JSON
    const data = await response.json();
    //Display the data
    showBands(data);
}

function showBands(bands) {
    // create html for each band
    let html = '';
    for(let{name,genre} of bands) {
        html += `<p>${name} - ${genre}</p>`;
    }

    //show html in browser
    document.querySelector('#bands').innerHTML = html;
}

async function addBand() {
    // Attach event listener to form
    document.getElementById('bandForm').addEventListener('submit', async (event) =>{
        // Prevent default behaviour of form
        event.preventDefault();

        // Get name and genre from input fields
        const name = document.getElementById('bandName').value;
        const genre = document.getElementById('bandGenre').value;
        
        // Create object to send through POST request
        const band = {
            name: name,
            genre: genre
        };

        // The POST request 
        const response = await fetch('http://localhost:3000/bands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(band)
        });
        // Convert response
        const result = await response.json();
        //Log result
        console.log(result);
        // Show bands again
        getAllBands();

        // Reset the form 
        document.getElementById('bandForm').reset();
    });
}

getAllBands();
addBand();