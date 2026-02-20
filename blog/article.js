/* blog/article.js — shared JS for all blog articles: gallery, lightbox, swipe fix */

(function() {
    var lastSwipeTime = 0;

    /* === Gallery / Carousel === */
    document.querySelectorAll('[data-gallery]').forEach(function(gallery) {
        var slides = gallery.querySelectorAll('.gallery-slide');
        if (!slides.length) return;

        var dotsContainer = gallery.querySelector('.gallery-dots');
        var captionEl = gallery.querySelector('.gallery-caption');
        var prevBtn = gallery.querySelector('.gallery-arrow--prev');
        var nextBtn = gallery.querySelector('.gallery-arrow--next');
        var current = 0;

        slides.forEach(function(_, i) {
            var dot = document.createElement('div');
            dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', function() { goTo(i); });
            dotsContainer.appendChild(dot);
        });

        function goTo(index) {
            slides[current].classList.remove('active');
            dotsContainer.children[current].classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');
            dotsContainer.children[current].classList.add('active');
            if (captionEl) captionEl.textContent = slides[current].dataset.caption || '';
        }

        if (captionEl) captionEl.textContent = slides[0].dataset.caption || '';

        if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); });

        /* Swipe with browser back-swipe prevention */
        var startX = 0, startY = 0, swiping = false;
        var slidesContainer = gallery.querySelector('.gallery-slides');

        slidesContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            swiping = false;
        }, {passive: true});

        slidesContainer.addEventListener('touchmove', function(e) {
            if (!swiping) {
                var dx = Math.abs(e.touches[0].clientX - startX);
                var dy = Math.abs(e.touches[0].clientY - startY);
                if (dx > dy && dx > 10) {
                    swiping = true;
                }
            }
            if (swiping) {
                e.preventDefault();
            }
        }, {passive: false});

        slidesContainer.addEventListener('touchend', function(e) {
            if (swiping) {
                lastSwipeTime = Date.now();
                var diff = startX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
            }
        });
    });

    /* === Lightbox === */
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<img src="" alt=""><button class="lightbox-close" aria-label="Закрыть">\u00d7</button>';
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector('img');

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.article img').forEach(function(img) {
        img.addEventListener('click', function() {
            if (Date.now() - lastSwipeTime < 300) return;
            openLightbox(img.src, img.alt);
        });
    });

    lightbox.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
})();
