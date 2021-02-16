const messageModal = document.querySelector('#newMessageDialog');
const messageForm = document.querySelector('#message-form');
const newMessageModalBtn = document.querySelector('#new-message-modal-btn');
const closeModalBtn = document.querySelector('#close-dialog-btn');
const messagesContainer = document.querySelector('#message-container');

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
       <a class="nes-btn is-success is-small" id="delete-confirm-${messageNum}">Yes</a>
       <a class="nes-btn is-error is-small" id="delete-cancel-${messageNum}">No</a>
     </div>
   </div>`;

   return messageMarkup;
}

const createDeleteMessageControls = (messageNum) => {
  const commenceDeleteBtn = document.querySelector(`#delete-message-${messageNum}`);
  const confirmControlsContainer = document.querySelector(`#confirm-controls-${messageNum}`);
  const confirmDeleteBtn = document.querySelector(`#delete-confirm-${messageNum}`);
  const cancelDeleteBtn = document.querySelector(`#delete-cancel-${messageNum}`);
  
  commenceDeleteBtn.addEventListener('click', () => {
    deleteControlsToggle(commenceDeleteBtn, confirmControlsContainer)
  });
  
  confirmDeleteBtn.addEventListener('click', () => {
    console.log('delete');
  });

  cancelDeleteBtn.addEventListener('click', () => {
    console.log('whoops');
    deleteControlsToggle(commenceDeleteBtn, confirmControlsContainer);
  });
}

const deleteControlsToggle = (commenceDeleteBtn, confirmControlsContainer) => {
  if(confirmControlsContainer.style.display !== 'block') {
    confirmControlsContainer.style.display = 'block';
    commenceDeleteBtn.style.display = 'none';
  } else {
    confirmControlsContainer.style.display = 'none';
    commenceDeleteBtn.style.display = 'inline-block';
  }
}

const handleDelete = (deleteBtn, container) => {
 
}

const displayMessages = (data) => {
  let messageNum = 1;

  data.forEach(obj => {
    messagesContainer.insertAdjacentHTML('beforeend', createMessageMarkup(obj, messageNum));
    createDeleteMessageControls(messageNum);    
    messageNum++;
  });
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

