// LiveSK.in Interactivity Script
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Sticky Navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
      }
    }
  });

  // Counter Animation
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length > 0) {
    let animated = false;
    window.addEventListener('scroll', () => {
      const statsSection = document.getElementById('stats-section');
      if (statsSection) {
        const pos = statsSection.getBoundingClientRect().top;
        if (pos < window.innerHeight && !animated) {
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const inc = target / 40;
            const updateCount = () => {
              count += inc;
              if (count < target) {
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 40);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
          });
          animated = true;
        }
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      faqItems.forEach(i => {
        if (i !== item) i.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });
});
