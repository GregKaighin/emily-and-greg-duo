// ── Firebase configuration ────────────────────────────────────────────────
// Set up a free Firebase project at https://console.firebase.google.com
// then replace these placeholder values with your own.
//
// Steps:
//  1. Create a new Firebase project
//  2. Build → Realtime Database → Create database (start in test mode)
//  3. Authentication → Sign-in method → Enable Email/Password
//  4. Authentication → Users → Add user (your admin email + password)
//  5. Realtime Database → Rules → paste:
//       { "rules": { ".read": true, ".write": "auth != null" } }
//  6. Project Settings → Web API Key → copy to FIREBASE_API_KEY below
//  7. Realtime Database → copy the database URL to FIREBASE_DB_URL below

const FIREBASE_API_KEY = 'YOUR_API_KEY_HERE';
const FIREBASE_DB_URL  = 'https://YOUR-PROJECT-ID-default-rtdb.firebaseio.com';
