// 1. Module Imports (Sabse top par rakhein)
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

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
  

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
