let messageContainer = document.querySelector('#message-container');

async function fetchMessages(messagesEndpoint) {
  const response = await fetch(messagesEndpoint);
  const data = await response.json();
  console.log(data);

  data.forEach(obj => {
    messageContainer.append(obj['id']);
    messageContainer.append(obj['text']);
  });
}

function postMessage() {
  // Take form fields and turn into json object?
  // how to process json object on backend?
  // Use Get rid of button submit and redo with js logic
  // 
}

//fetchMessages('http://localhost:3002/messages');