// 1. Module Imports
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
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const phoneVal = document.getElementById('phone').value;

      // 10-Digit Mobile Validation
      if (phoneVal.length !== 10) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Phone Number',
          text: 'Please enter a valid 10-digit mobile number.',
          confirmButtonColor: '#3B82F6'
        });
        return;
      }

      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      const formData = {
        name: document.getElementById('name').value,
        phone: phoneVal,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        createdAt: serverTimestamp()
      };

      try {
        await addDoc(collection(db, "inquiries"), formData);
        
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you! Your message has been sent successfully.',
          confirmButtonColor: '#3B82F6'
        });
        
        contactForm.reset();
      } catch (error) {
        console.error("Error adding document: ", error);
        
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Error sending message. Please check Firestore Rules.',
          confirmButtonColor: '#3B82F6'
        });
      } finally {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.disabled = false;
      }
    });
  }
});
