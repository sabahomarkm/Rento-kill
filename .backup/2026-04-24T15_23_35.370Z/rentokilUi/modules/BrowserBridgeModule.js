// BrowserBridgeModule.js
function bookService(dataString) {
    try {
        // Parse the JSON string sent from the HTML file
        var bookingData = JSON.parse(dataString);
        
        // Get the current active form (e.g., Form2)
        var currentForm = voltmx.application.getCurrentForm();
        
        // Call the integration method inside the form's controller
        if (currentForm && currentForm.processBooking) {
            currentForm.processBooking(bookingData);
        } else {
            alert("Error: processBooking function not found on current form.");
        }
    } catch (e) {
        alert("Failed to parse data from browser widget: " + e.message);
    }
}

function cancelBooking() {
    alert("Booking cancelled.");
    // Add navigation logic if needed
}

function logoutUser() {
    alert("Logging out...");
    // Add logout logic if needed
}//Type your code here