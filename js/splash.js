// Splash Screen (Student 2) — visible countdown + skip control.
// The actual redirect is handled by the HTML <meta http-equiv="refresh"> tag in the
// document head (required by the coursework spec); this script only drives the
// on-screen "Entering site in 4...3...2...1" countdown and the Skip button.

let secondsLeft = 4;
const countdownEl = document.getElementById('countdown');

const countdownTimer = setInterval(function () {
    secondsLeft -= 1;
    if (secondsLeft <= 0) {
        countdownEl.textContent = '0';
        clearInterval(countdownTimer);
        return;
    }
    countdownEl.textContent = secondsLeft;
}, 1000);

// Skip Intro: go straight to the Home Page and cancel the pending meta-refresh redirect
document.getElementById('skipBtn').addEventListener('click', function () {
    clearInterval(countdownTimer);
    const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
    if (metaRefresh) {
        metaRefresh.remove();
    }
    // The href on this link already sends the user to home.html
});
