document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.nav-link, .navbar-brand, .footer a[href^="#"], .hero a[href^="#"]');

  const updateScrollState = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', updateScrollState);
  updateScrollState();

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const navMenu = document.getElementById('navLinks');
      if (navMenu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    });
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      menuItems.forEach(item => {
        const shouldShow = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !shouldShow);
      });
    });
  });

  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      formMessage.textContent = '';
      return;
    }
    formMessage.textContent = 'Thanks for reaching out! We’ll be in touch soon.';
    formMessage.classList.add('show');
    form.reset();
    form.classList.remove('was-validated');
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});