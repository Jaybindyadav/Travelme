
const wip = document.querySelector('.wip');
const loginlink = document.querySelector('.login-link');
const registerlink = document.querySelector('.register-link');

registerlink.addEventListener('click', ()=> {
    wip.classList.add('active');
});

loginlink.addEventListener('click', ()=> {
    wip.classList.remove('active');
});



