// Gallery Page interactivity (Student 1)
// Hover feedback, click-to-expand, and close are all JavaScript-driven — required by the
// coursework spec, which explicitly disallows CSS-only (:hover) implementations here.

const thumbs = document.querySelectorAll('.thumb');
const modal = document.getElementById('galleryModal');
const modalContent = modal.querySelector('.modal-content');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

function openModal(thumb) {
    modalImg.src = thumb.dataset.img;
    modalImg.alt = thumb.dataset.title;
    modalTitle.textContent = thumb.dataset.title;
    modalDesc.textContent = thumb.dataset.desc;
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
        openModal(thumb);
    });
    // Keyboard accessibility: Enter or Space also opens the extended view
    thumb.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(thumb);
        }
    });
    // Hover interaction handled via JS event listeners (not a CSS :hover rule)
    thumb.addEventListener('mouseenter', function () {
        thumb.classList.add('thumb-hover');
    });
    thumb.addEventListener('mouseleave', function () {
        thumb.classList.remove('thumb-hover');
    });
    thumb.addEventListener('focus', function () {
        thumb.classList.add('thumb-hover');
    });
    thumb.addEventListener('blur', function () {
        thumb.classList.remove('thumb-hover');
    });
});

document.getElementById('modalClose').addEventListener('click', closeModal);

// Close when clicking the dark overlay outside the modal box
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// User customisation: colour scheme and font style toggles, scoped to the extended view only
document.getElementById('toggleColor').addEventListener('click', function () {
    modalContent.classList.toggle('alt-color');
});
document.getElementById('toggleFont').addEventListener('click', function () {
    modalContent.classList.toggle('alt-font');
});
