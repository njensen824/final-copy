document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-bar');
    const login = document.getElementById('login');

    menuToggle.addEventListener('click', function() {
        console.log("clicked");
        nav.classList.toggle('active');
        login.classList.toggle('active');
    });
});