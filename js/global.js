function toggleTheme() {
  const body = document.body;
  const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
  document.querySelector('[data-theme-toggle]')?.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.setAttribute('data-theme', savedTheme || (prefersDark ? 'dark' : 'light'));
}

initializeTheme();

  const navbarHTML = `
    <nav class="navbar">
      <div class="nav-container">
        <a href="#" class="logo">Brand</a>

        <ul class="nav-links" id="navLinks">
          <li class="nav-link"><a href="#home">Home</a></li>
          <li class="nav-link"><a href="#about">About</a></li>
          <li class="nav-link"><a href="#services">Services</a></li>
          <li class="nav-link"><a href="#contact">Contact</a></li>
        </ul>

        <a href="#" class="cta-button">Get Started</a>

        <div class="mobile-menu" id="mobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML('afterbegin', navbarHTML);

  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.getElementById('navLinks');

  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.boxShadow = window.pageYOffset > 0 
      ? '0 2px 20px rgba(0, 0, 0, 0.1)' 
      : 'none';
  });