import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('interest-form');
  const nextBtn = document.getElementById('next-btn');
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const successMsg = document.getElementById('success-message');

  // Step 1 Validation & Transition
  nextBtn.addEventListener('click', () => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const signupCard = document.querySelector('.signup-card');

    if (name.checkValidity() && email.checkValidity()) {
      // Lock current height
      const startHeight = signupCard.offsetHeight;
      signupCard.style.height = `${startHeight}px`;

      step1.classList.add('fade-out');

      setTimeout(() => {
        step1.classList.add('hidden');
        step2.classList.remove('hidden');

        // Calculate new height
        // We need to temporarily unset height to measure, but we want to animate to it.
        // Clone the node or use a hidden way to measure is safer, but for simplicity:
        signupCard.style.height = 'auto';
        const targetHeight = signupCard.offsetHeight;
        signupCard.style.height = `${startHeight}px`; // Reset to start

        // Force reflow
        signupCard.offsetHeight;

        // Animate to target
        signupCard.style.height = `${targetHeight}px`;

        step2.classList.add('fade-in');

        // Cleanup after animation
        setTimeout(() => {
          signupCard.style.height = 'auto';
        }, 500); // Match CSS transition duration
      }, 300); // Match fade-out duration
    } else {
      form.reportValidity();
    }
  });

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form Data:', data);

    // Simulate API call
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      step2.classList.add('hidden');
      successMsg.classList.remove('hidden');
      successMsg.classList.add('fade-in');

      // Reset (optional)
      // form.reset();
    }, 1500);
  });

  // Glitch Effect for Hero Title (Optional enhancement)
  const glitchText = document.querySelector('.glitch');
  if (glitchText) {
    setInterval(() => {
      glitchText.classList.add('active');
      setTimeout(() => {
        glitchText.classList.remove('active');
      }, 200);
    }, 3000);
  }

  // Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
});

