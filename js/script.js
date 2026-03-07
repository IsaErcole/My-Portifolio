const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const menuIcon = document.getElementById('menu-icon');

    // Open/close sidebar on click
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        menuBtn.classList.toggle('open'); // add class "open"

        // change the icon based on sidebar state
        if (sidebar.classList.contains('active')) {
            menuIcon.src = './img/close.png'; // close icon
        } else {
            menuIcon.src = './img/menu-hamburguer.png'; // standard icon
        }

    });

    // Close sidebar when clicking a link.
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            menuIcon.src = './img/menu-hamburguer.png'; //get back to default icon
        });
    });

    // Close sidebar when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            sidebar.classList.remove('active');
            menuIcon.src = './img/menu-hamburguer.png'; //get back to default icon
        }
    });