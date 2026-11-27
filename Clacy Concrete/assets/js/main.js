/**
 * Clacy Concrete &mdash; Concrete Website Template Scripts
 * Handles mobile nav, dropdowns, pop-up quote modal, FAQ accordions, and form demos.
 */
(function () {
  'use strict';

  // Mobile menu toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Mobile dropdown toggle for Services
  document.querySelectorAll('.nav-item.has-dropdown > .nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 820) {
        const parent = link.parentElement;
        if (!parent.classList.contains('open')) {
          e.preventDefault();
          parent.classList.add('open');
        }
      }
    });
  });

  // Pop-up Quote Modal
  const modal = document.getElementById('quote-modal');
  const openModalBtns = document.querySelectorAll('.open-quote-modal');
  const closeModalBtn = modal ? modal.querySelector('.modal-close') : null;
  const modalServiceSelect = modal ? modal.querySelector('select[name="service"]') : null;

  function openModal(preselectedService) {
    if (!modal) return;
    if (preselectedService && modalServiceSelect) {
      modalServiceSelect.value = preselectedService;
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input, select, textarea');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Estimate / Contact Form Handler (Demo Mode)
  document.querySelectorAll('form.estimate-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      const nameInput = form.querySelector('input[name="name"]');
      const nameVal = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'there';

      if (feedback) {
        feedback.textContent =
          'Thank you, ' +
          nameVal +
          '! Your estimate request has been received by Clacy Concrete. A concrete specialist will contact you within 2 business hours. For immediate assistance, call 0477 855 582.';
        feedback.classList.add('visible');
      }
      form.reset();
    });
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
})();
