function $(selector) {
    return document.querySelector(selector);
}

// Modal
if ($('.new-conversation')) {
    $('.new-conversation').addEventListener('click', () => {
        $('.modal').classList.toggle('active');
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
                    : './images/default_user.png';
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
}
