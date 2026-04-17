// Navbar: transparent → dark on scroll
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 80);
});

// Close mobile nav when a link is clicked
document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const collapse = document.getElementById('navbarNav');
        if (collapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(collapse)?.hide();
        }
    });
});

// Fade-up on scroll using IntersectionObserver
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay || 0, 10);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
    });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// Click-to-play video facade
const videoFacade = document.getElementById('videoFacade');
const videoEmbed  = document.getElementById('videoEmbed');
if (videoFacade) {
    const activate = () => {
        videoFacade.style.display = 'none';
        videoEmbed.classList.remove('d-none');
        const video = document.getElementById('videoPlayer');
        video.play();
    };
    videoFacade.addEventListener('click', activate);
    videoFacade.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
}

// Booking form: client-side validation + success message
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!bookingForm.checkValidity()) {
        bookingForm.classList.add('was-validated');
        return;
    }
    // TODO: replace this block with a real form submission (e.g. Formspree, Netlify Forms)
    formSuccess.classList.remove('d-none');
    bookingForm.reset();
    bookingForm.classList.remove('was-validated');
    setTimeout(() => formSuccess.classList.add('d-none'), 6000);
});
