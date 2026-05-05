// Replace with your Google Business Place ID
// Find it at: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
var PLACE_ID = 'YOUR_PLACE_ID';

function initReviews() {
    if (!window.google || !PLACE_ID || PLACE_ID === 'YOUR_PLACE_ID') return;

    var service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(
        { placeId: PLACE_ID, fields: ['reviews'] },
        function (place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) return;
            var reviews = (place.reviews || []).filter(function (r) {
                return r.text && r.text.trim().length > 0;
            });
            if (reviews.length === 0) return;
            buildCarousel(reviews);
            showSection();
        }
    );
}

function buildCarousel(reviews) {
    var inner      = document.querySelector('#testimonialCarousel .carousel-inner');
    var indicators = document.querySelector('#testimonialCarousel .carousel-indicators');
    if (!inner || !indicators) return;

    inner.innerHTML = reviews.map(function (r, i) {
        return (
            '<div class="carousel-item' + (i === 0 ? ' active' : '') + '">' +
                '<div class="testimonial-card mx-auto">' +
                    '<div class="quote-icon"><i class="fa-solid fa-quote-left"></i></div>' +
                    '<p class="testimonial-text">' + esc(r.text) + '</p>' +
                    '<div class="testimonial-author">' +
                        '<div class="stars">' + stars(r.rating) + '</div>' +
                        '<div class="author-avatar">' + initials(r.author_name) + '</div>' +
                        '<p class="author-name">' + esc(r.author_name) + '</p>' +
                        '<p class="author-event">' + esc(r.relative_time_description) + '</p>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }).join('');

    indicators.innerHTML = reviews.map(function (_, i) {
        return (
            '<button type="button" data-bs-target="#testimonialCarousel"' +
            ' data-bs-slide-to="' + i + '"' +
            (i === 0 ? ' class="active" aria-current="true"' : '') +
            ' aria-label="Review ' + (i + 1) + '"></button>'
        );
    }).join('');
}

function showSection() {
    var section = document.getElementById('testimonials');
    var navItem = document.getElementById('reviews-nav-item');
    if (section) section.style.display = '';
    if (navItem) navItem.style.display = '';
}

function stars(rating) {
    var n = Math.round(rating || 0);
    var html = '';
    for (var i = 0; i < 5; i++) {
        html += '<i class="fa-solid fa-star' + (i < n ? '' : ' opacity-25') + '"></i>';
    }
    return html;
}

function initials(name) {
    return (name || '?').split(' ').map(function (w) { return w[0] || ''; })
        .join('').slice(0, 2).toUpperCase();
}

function esc(s) {
    return (s || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
