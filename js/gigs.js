(function () {
    async function loadGigs() {
        const container = document.getElementById('gigs-list');
        if (!container) return;

        if (typeof FIREBASE_DB_URL === 'undefined' || FIREBASE_DB_URL.includes('YOUR-PROJECT')) {
            container.innerHTML = '<div class="col-12 text-center"><p class="gig-empty">Gig listings coming soon.</p></div>';
            return;
        }

        try {
            const res  = await fetch(`${FIREBASE_DB_URL}/gigs.json`);
            const data = await res.json();

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const gigs = data
                ? Object.entries(data)
                    .map(([id, gig]) => ({ id, ...gig }))
                    .filter(gig => new Date(gig.date + 'T00:00:00') >= today)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                : [];

            if (gigs.length === 0) {
                container.innerHTML = `
                    <div class="col-12 text-center">
                        <p class="gig-empty">No upcoming gigs scheduled right now —
                        <a href="#contact">get in touch to book us</a> for your event.</p>
                    </div>`;
                return;
            }

            container.innerHTML = gigs.map(gig => {
                const d       = new Date(gig.date + 'T12:00:00');
                const dayName = d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();
                const dayNum  = d.getDate();
                const month   = d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
                const year    = d.getFullYear();
                return `
                <div class="col-sm-6 col-lg-4 fade-up">
                    <div class="gig-card">
                        <div class="gig-date-block">
                            <span class="gig-day-name">${dayName}</span>
                            <span class="gig-day-num">${dayNum}</span>
                            <span class="gig-month-year">${month} ${year}</span>
                        </div>
                        <div class="gig-body">
                            <p class="gig-venue">${gig.venue}</p>
                            ${gig.time    ? `<p class="gig-time">${gig.time}</p>` : ''}
                            ${gig.details ? `<p class="gig-details">${gig.details}</p>` : ''}
                        </div>
                    </div>
                </div>`;
            }).join('');

        } catch (e) {
            container.innerHTML = '<div class="col-12 text-center"><p class="gig-empty">Could not load upcoming gigs.</p></div>';
        }
    }

    document.addEventListener('DOMContentLoaded', loadGigs);
})();
