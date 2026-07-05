// ── Firebase Configuration — Charlotte Wilson Campaign ──────────────────────
var firebaseConfig = {
  apiKey:            "AIzaSyCtJCXA4UmNU3zWq778ZcOPvTOxZE6HRJE",
  authDomain:        "spirit-tree-ceramics.firebaseapp.com",
  projectId:         "spirit-tree-ceramics",
  storageBucket:     "spirit-tree-ceramics.firebasestorage.app",
  messagingSenderId: "820287397307",
  appId:             "1:820287397307:web:0265203ed7e7c638d6389e"
};

// Initialize Firebase — var so db is accessible from all scripts
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
