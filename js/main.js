/**
 * Okaz Manpower Recruitment - Client Interactivity & Conversion Logic
 * Jurisdiction: Doha, State of Qatar
 * Zero Emoji Policy: Pure vector SVGs & clean string literals exclusively
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initPortfolioLightbox();
  initSmoothScroll();
});

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Interactive Booking & WhatsApp Inquiry Generator
 */
function initBookingGenerator() {
  const bookingBtn = document.getElementById('submitBookingBtn');
  if (!bookingBtn) return;

  bookingBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const serviceSelect = document.getElementById('bookingService');
    const nationalitySelect = document.getElementById('bookingNationality');
    const contractSelect = document.getElementById('bookingContract');
    const expSelect = document.getElementById('bookingExperience');

    const serviceVal = serviceSelect ? serviceSelect.value : 'غير محدد';
    const nationalityVal = nationalitySelect ? nationalitySelect.value : 'غير محدد';
    const contractVal = contractSelect ? contractSelect.value : 'غير محدد';
    const expVal = expSelect ? expSelect.value : 'غير محدد';

    const message = [
      'السلام عليكم شركة عكاظ لجلب الأيدي العاملة،',
      'أود الاستفسار وطلب السير الذاتية المتاحة للبيانات التالية:',
      '- الخدمة المطلوبة: ' + serviceVal,
      '- الجنسية المفضلة: ' + nationalityVal,
      '- نوع الطلب: ' + contractVal,
      '- مستوى الخبرة: ' + expVal,
      'يرجى إفادتي بالعمالة المتوفرة وتفاصيل الضمان والرسوم. شاكر ومقدر لكم.'
    ].join('\n');

    const encodedMessage = encodeURIComponent(message);
    const targetUrl = 'https://wa.me/97466001471?text=' + encodedMessage;

    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  });
}

/**
 * Portfolio Image Lightbox Modal
 */
function initPortfolioLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (!modal || !modalImg) return;

  function openLightbox(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt || 'إعلان شركة عكاظ';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modalImg.src = '';
    document.body.style.overflow = '';
  }

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.portfolio-thumb');
      if (img) {
        const fullSrc = img.getAttribute('data-full') || img.src;
        openLightbox(fullSrc, img.alt);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * FAQ Accordion Toggle
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Smooth Scrolling for In-Page Anchor Links
 */
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
