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

// ── Video facade + custom controls ──────────────────────────
const videoFacade  = document.getElementById('videoFacade');
const videoEmbed   = document.getElementById('videoEmbed');

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

(function initVideoControls() {
    const video      = document.getElementById('videoPlayer');
    const controls   = document.getElementById('videoControls');
    const progressArea = document.getElementById('vcProgressArea');
    const fill       = document.getElementById('vcFill');
    const thumb      = document.getElementById('vcThumb');
    const playBtn    = document.getElementById('vcPlayPause');
    const playIcon   = document.getElementById('vcPlayIcon');
    const timeEl     = document.getElementById('vcTime');
    const muteBtn    = document.getElementById('vcMute');
    const volIcon    = document.getElementById('vcVolIcon');
    const fsBtn      = document.getElementById('vcFullscreen');
    const fsIcon     = document.getElementById('vcFsIcon');
    const wrap       = document.getElementById('videoEmbed');

    if (!video) return;

    // ── Helpers ──────────────────────────────────────────────
    const fmt = s => {
        const m = Math.floor((s || 0) / 60);
        const sec = String(Math.floor((s || 0) % 60)).padStart(2, '0');
        return `${m}:${sec}`;
    };

    const setProgress = pct => {
        fill.style.width  = `${pct * 100}%`;
        thumb.style.left  = `${pct * 100}%`;
    };

    const posFromEvent = e => {
        const rect = progressArea.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    };

    // ── Play / pause ─────────────────────────────────────────
    const syncPlayIcon = () => {
        playIcon.className = video.paused ? 'fa-solid fa-play' : 'fa-solid fa-pause';
        controls.classList.toggle('paused', video.paused);
    };

    playBtn.addEventListener('click', () => video.paused ? video.play() : video.pause());
    video.addEventListener('play',  syncPlayIcon);
    video.addEventListener('pause', syncPlayIcon);
    video.addEventListener('ended', syncPlayIcon);

    // Click on video itself toggles play/pause
    video.addEventListener('click', () => video.paused ? video.play() : video.pause());

    // ── Progress bar ─────────────────────────────────────────
    video.addEventListener('timeupdate', () => {
        if (!video.duration) return;
        setProgress(video.currentTime / video.duration);
        timeEl.textContent = `${fmt(video.currentTime)} / ${fmt(video.duration)}`;
    });

    video.addEventListener('loadedmetadata', () => {
        timeEl.textContent = `0:00 / ${fmt(video.duration)}`;
    });

    let dragging = false;

    const seekTo = e => {
        if (!video.duration) return;
        const pos = posFromEvent(e);
        video.currentTime = pos * video.duration;
        setProgress(pos);
    };

    progressArea.addEventListener('mousedown',  e => { dragging = true; progressArea.classList.add('dragging'); seekTo(e); });
    progressArea.addEventListener('touchstart', e => { dragging = true; progressArea.classList.add('dragging'); seekTo(e); }, { passive: true });

    document.addEventListener('mousemove',  e => { if (dragging) seekTo(e); });
    document.addEventListener('touchmove',  e => { if (dragging) seekTo(e); }, { passive: true });
    document.addEventListener('mouseup',  () => { dragging = false; progressArea.classList.remove('dragging'); });
    document.addEventListener('touchend', () => { dragging = false; progressArea.classList.remove('dragging'); });

    // ── Mute ────────────────────────────────────────────────
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        volIcon.className = video.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
    });

    // ── Fullscreen ──────────────────────────────────────────
    fsBtn.addEventListener('click', () => {
        const el = wrap;
        if (!document.fullscreenElement) {
            (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
        } else {
            (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        }
    });

    document.addEventListener('fullscreenchange', () => {
        const isFs = !!document.fullscreenElement;
        fsIcon.className = isFs ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
    });

    // ── Auto-hide controls ───────────────────────────────────
    let hideTimer;
    const showControls = () => {
        controls.style.opacity = '1';
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            if (!video.paused) controls.style.opacity = '';
        }, 3000);
    };
    wrap.addEventListener('mousemove', showControls);
    wrap.addEventListener('touchstart', showControls, { passive: true });
    wrap.addEventListener('mouseleave', () => { if (!video.paused) controls.style.opacity = ''; });
})();

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
