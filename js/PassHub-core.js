/* LIFEHUB: PASSHUB CORE (FINAL) */

// --- 1. CONFIGURATION ---
const USER_CONFIG = {
    name: "jen",                 
    passcode: "JNieca12",               
    securityAnswer: "tinkerbell"      
};

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyD4AwI1GwDvtx8y6yx6We-oSzV92GGCEvE",
    authDomain: "access-vault-a3d09.firebaseapp.com",
    databaseURL: "https://access-vault-a3d09-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "access-vault-a3d09",
    storageBucket: "access-vault-a3d09.firebasestorage.app",
    messagingSenderId: "43855013406",
    appId: "1:43855013406:web:6a954853b8c14ec785b00f",
    measurementId: "G-Q925D3PS6V"
};

// --- 2. INITIALIZE FIREBASE ---
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    console.log("PassHub: Firebase Secured.");
} else {
    console.error("PassHub: Firebase failed to load.");
}

// --- 3. DOM ELEMENTS ---
const loginCard = document.getElementById('login-card');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const verifyBtn = document.getElementById('verify-btn');
const unlockBtn = document.getElementById('unlock-btn');
const inputName = document.getElementById('entry-name');
const inputPass = document.getElementById('entry-pass');
const inputAnswer = document.getElementById('entry-answer');
const errorMsg = document.getElementById('error-msg');

// --- 4. GATE LOGIC ---

// Layer 1: Name & Password
if(verifyBtn) {
    verifyBtn.addEventListener('click', () => {
        const userName = inputName.value.toLowerCase().trim();
        const userPass = inputPass.value;

        if (userName === USER_CONFIG.name && userPass === USER_CONFIG.passcode) {
            clearError();
            transitionToStep2(); // <--- The function causing your error is defined below now
        } else {
            triggerShake("Identity not recognized.");
            inputPass.value = ''; 
        }
    });

    // Allow "Enter" key for Step 1
    inputPass.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') verifyBtn.click();
    });
}

// Layer 2: Security Question
if(unlockBtn) {
    unlockBtn.addEventListener('click', () => {
        const userAnswer = inputAnswer.value.toLowerCase().trim();
        if (userAnswer === USER_CONFIG.securityAnswer) {
            grantAccess();
        } else {
            triggerShake("Verification Failed.");
        }
    });

    // Allow "Enter" key for Step 2
    inputAnswer.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') unlockBtn.click();
    });
}

// --- 5. HELPER FUNCTIONS ---

// Transition UI to Step 2
function transitionToStep2() {
    step1.style.opacity = '0';
    setTimeout(() => {
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
        step2.style.opacity = '0';
        // Fade in Step 2
        setTimeout(() => {
            step2.style.opacity = '1';
            inputAnswer.focus();
        }, 50);
    }, 300);
}

// Go Back to Step 1
window.resetGate = function() {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    step1.style.opacity = '1';
    clearError();
};

// Grant Access (With Security Token)
function grantAccess() {
    // 1. ISSUE THE WRISTBAND (Session Token)
    sessionStorage.setItem('PH_ACCESS_TOKEN', 'authorized_user_jen');
    
    // 2. ANIMATE OUT
    loginCard.style.transform = 'scale(0.95)';
    loginCard.style.opacity = '0';
    
    setTimeout(() => {
        // 3. REDIRECT
        window.location.href = "PassHub-landing_page.html";
    }, 500);
}

// Error Handling
function triggerShake(msg) {
    errorMsg.textContent = msg;
    loginCard.classList.add('shake');
    setTimeout(() => loginCard.classList.remove('shake'), 400);
}

function clearError() {
    errorMsg.textContent = "";
}