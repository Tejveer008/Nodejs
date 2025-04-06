document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const formData = new FormData(event.target); // Get the form data
    const url = formData.get('url'); // Get the URL from the form data
    const shortUrl = formData.get('shortCode'); // Get the short URL from the form data

    console.log(url,shortUrl); // Log the URL to be shortened
    
});