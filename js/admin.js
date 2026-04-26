let idToken = null;

async function signIn(email, password) {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, returnSecureToken: true })
        }
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.idToken;
}

async function fetchAllGigs() {
    const res  = await fetch(`${FIREBASE_DB_URL}/gigs.json`);
    const data = await res.json();
    return data
        ? Object.entries(data).map(([id, gig]) => ({ id, ...gig }))
        : [];
}

async function addGig(gigData) {
    const res = await fetch(`${FIREBASE_DB_URL}/gigs.json?auth=${idToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gigData)
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(`${res.status} — ${err.error || 'unknown error'}`);
    }
}

async function deleteGig(id) {
    const res = await fetch(`${FIREBASE_DB_URL}/gigs/${id}.json?auth=${idToken}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete gig');
}

function renderGigs(gigs) {
    const container = document.getElementById('admin-gigs-list');
    if (gigs.length === 0) {
        container.innerHTML = '<p class="admin-empty">No gigs added yet.</p>';
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    gigs.sort((a, b) => new Date(a.date) - new Date(b.date));

    container.innerHTML = gigs.map(gig => {
        const d      = new Date(gig.date + 'T12:00:00');
        const isPast = d < today;
        const dateStr = d.toLocaleDateString('en-GB', {
            weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
        });
        return `
        <div class="admin-gig-row${isPast ? ' admin-gig-past' : ''}">
            <div class="admin-gig-info">
                <span class="admin-gig-date">${dateStr}</span>
                <span class="admin-gig-venue">${gig.venue}</span>
                ${gig.time    ? `<span class="admin-gig-meta">${gig.time}</span>` : ''}
                ${gig.details ? `<span class="admin-gig-meta">${gig.details}</span>` : ''}
                ${isPast      ? '<span class="admin-past-badge">Past</span>' : ''}
            </div>
            <button class="admin-delete-btn" data-id="${gig.id}">Delete</button>
        </div>`;
    }).join('');

    container.querySelectorAll('.admin-delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (!confirm('Delete this gig?')) return;
            btn.disabled = true;
            try {
                await deleteGig(btn.dataset.id);
                await refresh();
            } catch (e) {
                alert('Could not delete: ' + e.message);
                btn.disabled = false;
            }
        });
    });
}

async function refresh() {
    const gigs = await fetchAllGigs();
    renderGigs(gigs);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginScreen  = document.getElementById('login-screen');
    const adminScreen  = document.getElementById('admin-screen');
    const loginForm    = document.getElementById('login-form');
    const loginError   = document.getElementById('login-error');
    const addGigForm   = document.getElementById('add-gig-form');
    const addError     = document.getElementById('add-error');
    const logoutBtn    = document.getElementById('logout-btn');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.textContent = '';
        const email    = document.getElementById('admin-email').value.trim();
        const password = document.getElementById('admin-password').value;
        try {
            idToken = await signIn(email, password);
            loginScreen.style.display = 'none';
            adminScreen.style.display = 'block';
            await refresh();
        } catch (err) {
            loginError.textContent = 'Login failed: ' + err.message;
        }
    });

    addGigForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        addError.textContent = '';
        const gigData = {
            date:    document.getElementById('gig-date').value,
            venue:   document.getElementById('gig-venue').value.trim(),
            time:    document.getElementById('gig-time').value.trim(),
            details: document.getElementById('gig-details').value.trim()
        };
        try {
            await addGig(gigData);
            addGigForm.reset();
            await refresh();
        } catch (err) {
            addError.textContent = 'Could not add gig: ' + err.message;
        }
    });

    logoutBtn.addEventListener('click', () => {
        idToken = null;
        adminScreen.style.display = 'none';
        loginScreen.style.display = 'flex';
    });
});
