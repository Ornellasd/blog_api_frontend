const messageForm = document.querySelector('#message-form');
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
/*
function handleSubmit(event) {
  //event.preventDefault();

  const data = new FormData(event.target);

  //const value = data.get('post-title');
  const value = Object.fromEntries(data.entries());

  console.log({ value });
}
*/



const postForm = (body) => {
  return fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
}

const handleSubmit = (e) => {
  e.preventDefault();
  const body = JSON.stringify(Object.fromEntries(new FormData(e.target)));

  postForm(body);
}


messageForm.addEventListener('submit', handleSubmit);
//fetchMessages('http://localhost:3002/messages');