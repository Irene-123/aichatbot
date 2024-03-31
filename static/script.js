function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    appendMessage('You: ' + userInput);

    // Call your backend API to get a response
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Display the response from the backend
        appendMessage('ChatGPT: ' + data.response);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Clear input field
    document.getElementById('user-input').value = '';
}

function appendMessage(message) {
    var chatDisplay = document.getElementById('chat-display');
    var messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatDisplay.appendChild(messageElement);
}
