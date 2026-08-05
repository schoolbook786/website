// 1. Module Imports (Top Par Move Kiya Gaya Hai)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXhYxABCftsf0rWUMxmr547MW59SmBIQs",
  authDomain: "livesk1.firebaseapp.com",
  projectId: "livesk1",
  storageBucket: "livesk1.firebasestorage.app",
  messagingSenderId: "604215093301",
  appId: "1:604215093301:web:dce97642bcab21f01da97c",
  measurementId: "G-7LM168G57M"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
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
    if (question) {
      question.addEventListener('click', () => {
        faqItems.forEach(i => {
          if (i !== item) i.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    }
  });

  // Contact Form Submission Handler (Firebase)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        createdAt: serverTimestamp()
      };

      try {
        await addDoc(collection(db, "inquiries"), formData);
        alert("Success! Your message has been sent successfully.");
        contactForm.reset();
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error sending message. Please try again.");
      } finally {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.disabled = false;
      }
    });
  }
});
