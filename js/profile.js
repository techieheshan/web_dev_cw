// User Profile Page (Student 4)
// Builds a profile entirely through JavaScript prompt() calls — no HTML form — and
// reveals the result progressively using DOM manipulation, per the coursework spec.

// Step/prompt definitions: an array of objects (JS requirement: variables/objects + functions)
const STEPS = [
    {
        id: 1,
        title: 'Step 1: Basics',
        fields: [
            { key: 'name', question: 'What should we call you? (leave blank to skip)' },
            { key: 'username', question: 'Pick a username for your profile: (leave blank to skip)' },
            { key: 'area', question: 'Which area are you based in? (leave blank to skip)' }
        ]
    },
    {
        id: 2,
        title: 'Step 2: Interests',
        fields: [
            { key: 'sdgInterest', question: 'Which part of SDG 4 interests you most? e.g. access, skills, digital divide (leave blank to skip)' },
            { key: 'contentType', question: 'How do you prefer to learn — reading, video, or hands-on? (leave blank to skip)' },
            { key: 'weeklyTime', question: 'Roughly how much time could you give per week? e.g. "1 hour" (leave blank to skip)' }
        ]
    },
    {
        id: 3,
        title: 'Step 3: Actions',
        fields: [
            { key: 'action', question: 'What\'s one action from the Impact Simulator you\'d actually do? (leave blank to skip)' },
            { key: 'goal', question: 'What\'s one goal you have for this term? (leave blank to skip)' },
            { key: 'involvement', question: 'How would you like to get involved — tutoring, donating, volunteering? (leave blank to skip)' }
        ]
    }
];

const TOTAL_PROMPTS = STEPS.reduce(function (sum, step) { return sum + step.fields.length; }, 0);

// profileData holds everything the user has answered so far, keyed by step id
let profileData = {};
let currentStepPointer = 1;

const outputEl = document.getElementById('profileOutput');
const placeholderEl = document.getElementById('profilePlaceholder');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const stepButtons = document.querySelectorAll('.step-btn');

function runStep(stepId) {
    const step = STEPS.find(function (s) { return s.id === stepId; });
    const answers = {};

    step.fields.forEach(function (field) {
        const response = window.prompt(field.question);
        // Conditional logic: null (Cancel) or an empty string both count as "skipped"
        if (response === null || response.trim() === '') {
            answers[field.key] = null;
        } else {
            answers[field.key] = response.trim();
        }
    });

    profileData[stepId] = answers;
    renderProfile();
    updateProgress();
    markStepButton(stepId);
}

function markStepButton(stepId) {
    const btn = document.querySelector('.step-btn[data-step="' + stepId + '"]');
    if (btn) {
        btn.classList.add('step-complete');
        btn.textContent = STEPS.find(function (s) { return s.id === stepId; }).title + ' ✓';
    }
}

function countAnsweredPrompts() {
    let count = 0;
    Object.keys(profileData).forEach(function (stepId) {
        const answers = profileData[stepId];
        Object.keys(answers).forEach(function (key) {
            if (answers[key] !== null) {
                count += 1;
            }
        });
    });
    return count;
}

function updateProgress() {
    const answered = countAnsweredPrompts();
    const percent = Math.round((answered / TOTAL_PROMPTS) * 100);
    progressFill.style.width = percent + '%';
    progressText.textContent = 'Completion: ' + percent + '% (' + answered + '/' + TOTAL_PROMPTS + ' prompts completed)';
}

// DOM manipulation: rebuild the visible profile output from profileData each time it changes
function renderProfile() {
    const visitedSteps = Object.keys(profileData);
    if (visitedSteps.length === 0) {
        placeholderEl.style.display = 'block';
        return;
    }
    placeholderEl.style.display = 'none';

    outputEl.innerHTML = '';

    STEPS.forEach(function (step) {
        if (!profileData[step.id]) {
            return; // this step hasn't been visited yet — reveal nothing for it
        }
        const block = document.createElement('div');
        block.className = 'profile-step-block';

        const heading = document.createElement('h3');
        heading.textContent = step.title;
        block.appendChild(heading);

        step.fields.forEach(function (field) {
            const value = profileData[step.id][field.key];
            const row = document.createElement('div');
            row.className = 'profile-field';

            const label = document.createElement('span');
            label.className = 'field-label';
            label.textContent = field.key + ':';
            row.appendChild(label);

            const valueEl = document.createElement('span');
            if (value === null) {
                valueEl.className = 'field-skipped';
                valueEl.textContent = 'Skipped';
            } else {
                valueEl.className = 'field-value';
                valueEl.textContent = value;
            }
            row.appendChild(valueEl);

            block.appendChild(row);
        });

        outputEl.appendChild(block);
    });
}

// "Start / Continue": runs the next step that hasn't been visited yet, in order
startBtn.addEventListener('click', function () {
    const nextStep = STEPS.find(function (step) { return !profileData[step.id]; });
    if (nextStep) {
        runStep(nextStep.id);
        currentStepPointer = nextStep.id;
    } else {
        window.alert('You\'ve been through all 3 steps — use the step buttons below to revisit and change any answer.');
    }
});

// Revisit any step directly, in any order, and update already-skipped info
stepButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        runStep(Number(btn.dataset.step));
    });
});

resetBtn.addEventListener('click', function () {
    profileData = {};
    outputEl.innerHTML = '';
    outputEl.appendChild(placeholderEl);
    placeholderEl.style.display = 'block';
    updateProgress();
    stepButtons.forEach(function (btn) {
        btn.classList.remove('step-complete');
        const step = STEPS.find(function (s) { return s.id === Number(btn.dataset.step); });
        btn.textContent = step.title;
    });
});

updateProgress();
