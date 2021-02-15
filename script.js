const messageModal = document.querySelector('#newMessageDialog');
const messageForm = document.querySelector('#message-form');
const newMessageModalBtn = document.querySelector('#new-message-modal-btn');
const closeModalBtn = document.querySelector('#close-dialog-btn');
let messagesContainer = document.querySelector('#message-container');

async function fetchMessages(messagesEndpoint) {
  const response = await fetch(messagesEndpoint);
  const data = await response.json();

  return data;
}

const createMessageMarkup = (messageObj, messageNum) => {
  const messageMarkup = 
  `<div class="nes-container with-title message-box" id="message-${messageNum}">
     <p class="title">${messageObj.title}</p>
     <p>${messageObj.text}</p>
     <a class="nes-btn is-error is-small" id="delete-message-${messageNum}">Delete</a>
     <div class="confirm-controls-container" id="confirm-controls-${messageNum}">
       <button class="nes-btn is-success is-small" id="delete-confirm-${messageNum}">Yay</button>
       <a href="http://localhost:3000/message/${messageObj._id}/delete" class="nes-btn is-success is-small">Yes</a>
       <a class="nes-btn is-error is-small">No</a>
     </div>
   </div>`;

   return messageMarkup;
}

const displayMessages = (data) => {
  let messageNum = 1;

  data.forEach(obj => {
    console.log(createMessageMarkup(obj, messageNum));

    //messagesContainer.insertAdjacentHTML('beforeend', createMessageMarkup(obj. messageNum));
    messagesContainer.insertAdjacentHTML('beforeend', createMessageMarkup(obj, messageNum));

    const confirmControlsContainer = document.querySelector('#confirm-controls-' + messageNum);
    
    document.querySelector(`#delete-message-${messageNum}`).addEventListener('click', (e) => {
      e.target.style.display = 'none';
      confirmControlsContainer.style.display = 'block';
    });

    document.querySelector(`#delete-confirm-${messageNum}`).addEventListener('click', () => {
      console.log('derp');
      fetch('http://localhost:3000/message/${obj._id}/delete');
      fetchMessages('http://localhost:3000/messages').then(data => {
        displayMessages(data);
      });
    });
    
    messageNum++;
  });
}

const deleteMessage = () => {

}

const postForm = (body) => {
  return fetch('http://localhost:3000/message/post', {
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

  messageModal.close();
  postForm(body);
  
  fetchMessages('http://localhost:3000/messages').then(data => {
    displayMessages(data);
  });
}

messageForm.addEventListener('submit', handleSubmit);

newMessageModalBtn.addEventListener('click', () => {
  messageModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
  messageModal.close();
});

fetchMessages('http://localhost:3000/messages').then(data => {
  displayMessages(data);
});

