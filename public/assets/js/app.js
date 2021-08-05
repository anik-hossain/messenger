function $(selector) {
    return document.querySelector(selector);
}

// Modal
if ($('#new-conversation')) {
    $('#new-conversation').addEventListener('click', () => {
        $('.modal').classList.toggle('active');
    });
    $('.messenger, .conversation').addEventListener('click', (e) => {
        if (e.target.id != 'new-conversation') {
            $('.modal').classList.remove('active');
            $('.user-list').style.display = 'none';
        }
    });
}

// Delete User
async function deleteUser(id) {
    let response = await fetch(`/users/${id}`, {
        method: 'DELETE',
    });

    let result = await response.json();

    if (result.errors) {
        console.log(result.errors);
    } else {
        document.getElementById(id).remove();
    }
}

// Logout
async function logout() {
    fetch('/', { method: 'DELETE' });
    setTimeout(() => {
        window.location.replace('/');
    }, 1000);
}

// Search User
const duration = 1000;
const input = $('#search-input');
let typingTimer;
let users_placeholder;

async function search_users() {
    let response = await fetch('/messeges/search', {
        method: 'POST',
        body: JSON.stringify({
            user: input.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    // get response
    let result = await response.json();

    // handle error and response
    if (result.errors) {
        const errorplaceholder = document.querySelector('p.error');
        errorplaceholder.textContent = result.errors.common.msg;
        errorplaceholder.style.display = 'block';
    } else {
        if (result.length > 0) {
            let generatedHtml = '<ul>';
            result.forEach((user) => {
                const avatar = user.avatar
                    ? './uploads/avatars/' + user.avatar
                    : './img/default_user.png';
                generatedHtml += `<li onclick="createConversation('${user._id}', '${user.name}', '${user.avatar}')">
                <img src="${avatar}" />
              <span class="name">${user.name}</span>
          </li>`;
            });
            generatedHtml += '</ul>';
            users_placeholder.innerHTML = generatedHtml;
            users_placeholder.style.display = 'block';
        }
    }
}

if (input) {
    users_placeholder = document.querySelector('.user-list');
    input.addEventListener('keyup', function () {
        clearTimeout(typingTimer);
        // reset
        users_placeholder.style.display = 'none';
        if (input.value) {
            typingTimer = setTimeout(search_users, duration); //user is "finished typing," send search request
        }
    });

    input.addEventListener('keydown', function () {
        clearTimeout(typingTimer);
    });
}

// create Conversation
async function createConversation(participant_id, name, avatar) {
    try {
        const response = await fetch('/messeges/conversation', {
            method: 'POST',
            body: JSON.stringify({
                participant: name,
                id: participant_id,
                avatar: avatar != 'undefined' ? avatar : null,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const result = response.json();
        if (!result.errors) {
            // reset
            users_placeholder.style.display = 'none';
            input.value = name;
            // reload the page after 1 second
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            throw new Error(result.errors.common.msg);
        }
    } catch (err) {
        console.log(err);
    }
}

// get messages of a conversation
async function getMessages(conversation_id, current_conversation_name) {
    let response = await fetch(`/messages/id/${conversation_id}`);
    const result = await response.json();

    if (!result.errors && result.data) {
        form.style.visibility = 'visible';

        const { data, user, conversation_id } = result;

        participant = data.participant;
        current_conversation_id = conversation_id;

        if (data.messages) {
            let allMessages = '';

            if (data.messages.length > 0) {
                data.messages.forEach((message) => {
                    let senderAvatar = message.sender.avatar
                        ? `./uploads/avatars/${message.sender.avatar}`
                        : './img/nophoto.png';
                    const messageClass =
                        message.sender.id === loggedinUserId
                            ? 'you-message'
                            : 'other-message';
                    const showAvatar =
                        message.sender.id === loggedinUserId
                            ? ''
                            : `<img src="${senderAvatar}" alt="${message.sender.name}" />`;

                    // message attachments
                    let attachments = '<div class="attachments">';

                    if (message.attachment && message.attachment.length > 0) {
                        message.attachment.forEach((attachment) => {
                            attachments += `<img src="./uploads/attachments/${attachment}" /> `;
                        });
                    }

                    attachments += '</div>';

                    // final message html
                    let messageHTML = `<div class="message-row ${messageClass}"><div class="message-content">
                      ${showAvatar}
                      <div class="message-text">${message.text}</div>
                      ${attachments}
                      <div class="message-time">${moment(
                          message.date_time
                      ).fromNow()}</div>
                    </div></div>`;

                    allMessages += messageHTML;
                    messageContainer.innerHTML = allMessages;
                });
            } else if (data.messages.length === 0) {
                messageContainer.innerHTML = '<div class="message-row"></div>';
            }

            chatTitleContainer.textContent = current_conversation_name;
        }
    } else {
        // messagesFailureToast.showToast();
    }
}
