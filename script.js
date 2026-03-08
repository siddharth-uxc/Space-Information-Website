// ==================== NAVIGATION ====================
function navigateTo(page) {
    window.location.href = page;
}

// ==================== LOADING SCREEN ====================
window.addEventListener('load', () => {
    const loader = document.getElementById('loadingScreen');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 800);
    }
});

// ==================== STARFIELD CANVAS ====================
(function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let stars = [];
    const STAR_COUNT = 250;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.8 + 0.2,
                alpha: Math.random(),
                alphaDir: (Math.random() * 0.008 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
                speed: Math.random() * 0.15 + 0.02,
                hue: Math.random() < 0.7 ? 200 : (Math.random() < 0.5 ? 260 : 40)
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.alpha += s.alphaDir;
            if (s.alpha <= 0.1 || s.alpha >= 1) s.alphaDir *= -1;
            s.alpha = Math.max(0.1, Math.min(1, s.alpha));

            s.y += s.speed;
            if (s.y > canvas.height + 5) {
                s.y = -5;
                s.x = Math.random() * canvas.width;
            }

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${s.hue}, 80%, 85%, ${s.alpha})`;
            ctx.fill();

            if (s.radius > 1.2) {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${s.hue}, 80%, 85%, ${s.alpha * 0.08})`;
                ctx.fill();
            }
        });
        requestAnimationFrame(drawStars);
    }

    resize();
    createStars();
    drawStars();
    window.addEventListener('resize', () => { resize(); createStars(); });
})();

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
}

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
}

// ==================== SCROLL-TO-TOP BUTTON ====================
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== SCROLL REVEAL ====================
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ==================== MODAL ====================
const modal = document.getElementById('factModal');
const closeBtn = document.querySelector('.close-modal');

if (closeBtn) {
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
}

window.addEventListener('click', (event) => {
    if (event.target === modal) modal.style.display = 'none';
});

function showModal(celestialBody) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    const facts = {
        sun: {
            title: 'More Amazing Sun Facts!',
            content: `<ul>
                <li>The Sun's core pressure is 250 billion times Earth's atmospheric pressure</li>
                <li>Produces energy equivalent to 100 billion nuclear bombs per second</li>
                <li>Will become a red giant in 5 billion years, consuming Mercury, Venus, and possibly Earth</li>
                <li>Contains 99.86% of all mass in the Solar System</li>
                <li>Solar wind travels at 400-500 km/s</li>
                <li>Ancient Egyptians worshipped the Sun as god Ra</li>
                <li>Solar energy reaches Earth at 1,366 watts per square meter</li>
                <li>The Sun completes one rotation every 25-35 days depending on latitude</li>
            </ul>`
        },
        mercury: {
            title: 'More Mercury Facts!',
            content: `<ul>
                <li>Mercury has no atmosphere to trap heat, causing extreme temperature swings</li>
                <li>Named after the Roman messenger god due to its fast movement across the sky</li>
                <li>Has a 3:2 spin-orbit resonance (rotates 3 times for every 2 orbits)</li>
                <li>Caloris Basin is one of the largest impact craters in the Solar System</li>
                <li>Surface resembles Earth's Moon with many craters</li>
                <li>MESSENGER spacecraft orbited Mercury from 2011-2015</li>
                <li>Has a weak magnetic field about 1% of Earth's</li>
                <li>Water ice found in permanently shadowed polar craters</li>
            </ul>`
        },
        venus: {
            title: 'More Venus Facts!',
            content: `<ul>
                <li>A day on Venus is longer than its year!</li>
                <li>Rotates backwards (retrograde rotation) compared to most planets</li>
                <li>Surface pressure is 92 times that of Earth</li>
                <li>Thick clouds reflect 70% of sunlight, making it the brightest planet</li>
                <li>Soviet Venera probes landed on Venus in 1970s-80s</li>
                <li>Has over 1,600 major volcanoes</li>
                <li>No moons or rings</li>
                <li>Clouds are made of sulfuric acid droplets</li>
            </ul>`
        },
        earth: {
            title: 'More Earth Facts!',
            content: `<ul>
                <li>Earth is the densest planet in the Solar System</li>
                <li>Magnetic field extends 58,000 km into space</li>
                <li>Only planet with active plate tectonics</li>
                <li>Water covers 71% of surface (97% is salt water)</li>
                <li>Rotates at 1,670 km/h at the equator</li>
                <li>Orbits the Sun at 107,000 km/h</li>
                <li>Has 8.7 million species (only 1.2 million identified)</li>
                <li>The only known planet with life</li>
            </ul>`
        },
        mars: {
            title: 'More Mars Facts!',
            content: `<ul>
                <li>Has the largest dust storms in the Solar System</li>
                <li>Olympus Mons is 2.5 times taller than Mt. Everest</li>
                <li>Two moons (Phobos and Deimos) are captured asteroids</li>
                <li>Phobos orbits so close it will crash into Mars in 50 million years</li>
                <li>Evidence of ancient river valleys and lake beds</li>
                <li>Perseverance rover searching for signs of ancient life</li>
                <li>NASA plans human missions in the 2030s</li>
                <li>Gravity is 38% of Earth's</li>
            </ul>`
        },
        jupiter: {
            title: 'More Jupiter Facts!',
            content: `<ul>
                <li>Great Red Spot is shrinking (was 3× Earth's diameter, now 1.3×)</li>
                <li>Has 95 confirmed moons as of 2023</li>
                <li>Europa's subsurface ocean may harbor life</li>
                <li>Io is the most volcanically active body in Solar System</li>
                <li>Ganymede is larger than Mercury</li>
                <li>Protects inner planets by deflecting comets and asteroids</li>
                <li>Juno spacecraft studying Jupiter since 2016</li>
                <li>Has faint ring system discovered by Voyager 1</li>
            </ul>`
        },
        saturn: {
            title: 'More Saturn Facts!',
            content: `<ul>
                <li>Rings are made of billions of ice particles (size: dust to house)</li>
                <li>Rings are only 10-100 meters thick but 280,000 km wide</li>
                <li>Has 146 confirmed moons (most in Solar System)</li>
                <li>Titan has thick atmosphere and liquid methane lakes</li>
                <li>Enceladus shoots water geysers from subsurface ocean</li>
                <li>Hexagonal storm at north pole is wider than Earth</li>
                <li>Cassini spacecraft studied Saturn for 13 years (2004-2017)</li>
                <li>Could float in a giant bathtub of water</li>
            </ul>`
        },
        uranus: {
            title: 'More Uranus Facts!',
            content: `<ul>
                <li>Only planet that rotates on its side (98° tilt)</li>
                <li>Extreme seasons: each pole gets 42 years of sunlight then 42 years of darkness</li>
                <li>Discovered by William Herschel in 1781 with telescope</li>
                <li>Has 13 faint rings discovered in 1977</li>
                <li>27 known moons named after Shakespeare and Alexander Pope characters</li>
                <li>Coldest planetary atmosphere in Solar System (-224°C)</li>
                <li>Voyager 2 is only spacecraft to visit (1986)</li>
                <li>Takes 84 Earth years to orbit the Sun</li>
            </ul>`
        },
        neptune: {
            title: 'More Neptune Facts!',
            content: `<ul>
                <li>Discovered through mathematical calculations before being seen</li>
                <li>Strongest winds in Solar System (2,100 km/h)</li>
                <li>14 known moons, largest is Triton</li>
                <li>Triton orbits backwards (retrograde), likely a captured object</li>
                <li>Triton has nitrogen geysers</li>
                <li>Great Dark Spot was a storm similar to Jupiter's Great Red Spot</li>
                <li>Has 6 faint rings named after astronomers</li>
                <li>Takes 165 Earth years to complete one orbit</li>
            </ul>`
        },
        moon: {
            title: 'More Moon Facts!',
            content: `<ul>
                <li>12 humans have walked on the Moon (1969-1972)</li>
                <li>Moon's gravity creates ocean tides on Earth</li>
                <li>Always shows same face to Earth (tidally locked)</li>
                <li>Moving away from Earth at 3.8 cm per year</li>
                <li>No atmosphere means no wind or weather</li>
                <li>Footprints will last millions of years</li>
                <li>Formed 4.5 billion years ago from giant impact with Earth</li>
                <li>Apollo missions brought back 382 kg of Moon rocks</li>
            </ul>`
        },
        blackhole: {
            title: 'More Black Hole Facts!',
            content: `<ul>
                <li>First direct image captured in 2019 (M87* black hole)</li>
                <li>Event horizon is the point of no return</li>
                <li>Spaghettification stretches objects near black holes</li>
                <li>Time slows down near event horizon (time dilation)</li>
                <li>Supermassive black holes power quasars</li>
                <li>Sagittarius A* is 4 million solar masses at Milky Way center</li>
                <li>LIGO detected first gravitational waves in 2015</li>
                <li>Stephen Hawking predicted black holes emit radiation</li>
            </ul>`
        },
        milkyway: {
            title: 'More Milky Way Facts!',
            content: `<ul>
                <li>Contains 100-400 billion stars</li>
                <li>Diameter is 100,000-200,000 light-years</li>
                <li>Solar System is 26,000 light-years from galactic center</li>
                <li>Takes 225-250 million years for Sun to orbit galaxy once</li>
                <li>Will collide with Andromeda galaxy in 4.5 billion years</li>
                <li>Part of Local Group (50+ galaxies)</li>
                <li>Most mass is invisible dark matter</li>
                <li>Has 4 major spiral arms</li>
            </ul>`
        },
        comet: {
            title: 'More Comet Facts!',
            content: `<ul>
                <li>Halley's Comet visible from Earth every 75-76 years (next: 2061)</li>
                <li>Nucleus is typically 1-10 km wide</li>
                <li>Coma (atmosphere) can be 1 million km wide</li>
                <li>Have two tails: dust tail and ion (plasma) tail</li>
                <li>May have delivered water and organic compounds to early Earth</li>
                <li>Rosetta mission landed on comet 67P in 2014</li>
                <li>Short-period comets come from Kuiper Belt</li>
                <li>Over 3,700 known comets in our Solar System</li>
            </ul>`
        }
    };

    const data = facts[celestialBody];
    if (data) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        modal.style.display = 'block';
    }
}

// ==================== SPACE QUIZ ====================
const quizQuestions = [
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Mars", "Jupiter", "Mercury"],
        correct: 1
    },
    {
        question: "What is the largest planet in our Solar System?",
        options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
        correct: 2
    },
    {
        question: "How long does light from the Sun take to reach Earth?",
        options: ["1 minute", "8 minutes", "30 minutes", "1 hour"],
        correct: 1
    },
    {
        question: "Which celestial body has the strongest winds in the Solar System?",
        options: ["Jupiter", "Saturn", "Neptune", "Uranus"],
        correct: 2
    },
    {
        question: "What type of galaxy is the Milky Way?",
        options: ["Elliptical", "Irregular", "Barred spiral", "Ring"],
        correct: 2
    },
    {
        question: "Which moon of Jupiter might harbor life in its subsurface ocean?",
        options: ["Io", "Ganymede", "Callisto", "Europa"],
        correct: 3
    },
    {
        question: "What is at the center of a black hole?",
        options: ["A star", "A singularity", "Dark matter", "A neutron star"],
        correct: 1
    },
    {
        question: "Which planet rotates on its side with a 98° tilt?",
        options: ["Neptune", "Saturn", "Uranus", "Pluto"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function initQuiz() {
    const container = document.getElementById('quizContent');
    const progress = document.getElementById('quizProgress');
    if (!container || !progress) return;

    // Build progress dots
    progress.innerHTML = quizQuestions.map((_, i) =>
        `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
    ).join('');

    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('quizContent');
    if (!container) return;

    answered = false;
    const q = quizQuestions[currentQuestion];

    container.innerHTML = `
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">
            ${q.options.map((opt, i) =>
                `<div class="quiz-option" data-index="${i}" onclick="selectAnswer(${i})">${opt}</div>`
            ).join('')}
        </div>
        <button class="quiz-btn" id="quizNextBtn" onclick="nextQuestion()" disabled>Next →</button>
    `;
}

function selectAnswer(index) {
    if (answered) return;
    answered = true;

    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const dots = document.querySelectorAll('.quiz-progress .dot');
    const nextBtn = document.getElementById('quizNextBtn');

    options.forEach((opt, i) => {
        opt.classList.add('disabled');
        if (i === q.correct) opt.classList.add('correct-answer');
        if (i === index && i !== q.correct) opt.classList.add('wrong-answer');
    });

    if (index === q.correct) {
        score++;
        dots[currentQuestion].classList.add('correct');
    } else {
        dots[currentQuestion].classList.add('wrong');
    }

    dots[currentQuestion].classList.remove('active');
    nextBtn.disabled = false;

    if (currentQuestion === quizQuestions.length - 1) {
        nextBtn.textContent = 'See Results';
    }
}

function nextQuestion() {
    currentQuestion++;
    const dots = document.querySelectorAll('.quiz-progress .dot');

    if (currentQuestion >= quizQuestions.length) {
        showResults();
        return;
    }

    dots[currentQuestion].classList.add('active');
    showQuestion();
}

function showResults() {
    const container = document.getElementById('quizContent');
    if (!container) return;

    const pct = Math.round((score / quizQuestions.length) * 100);
    let message = '';
    if (pct === 100) message = '🎉 Perfect score! You are a true space expert!';
    else if (pct >= 75) message = '🚀 Impressive! You really know your cosmos!';
    else if (pct >= 50) message = '🌟 Good job! Keep exploring the universe!';
    else message = '🔭 Keep learning — the cosmos has so much to teach!';

    container.innerHTML = `
        <div class="quiz-result">
            <div class="score">${score}/${quizQuestions.length}</div>
            <div class="score-text">${message}</div>

            <div class="quiz-save-form" id="quizSaveForm">
                <label for="quizPlayerName">Save your score to the leaderboard</label>
                <div class="save-row">
                    <input type="text" id="quizPlayerName" placeholder="Enter your name" maxlength="30">
                    <button class="quiz-save-btn" onclick="saveQuizScore()">💾 Save</button>
                </div>
                <div id="quizSaveMsg"></div>
            </div>

            <div id="quizLeaderboardArea">${renderLeaderboard()}</div>

            <button class="quiz-btn" onclick="restartQuiz()" style="margin-top:24px;">Try Again</button>
        </div>
    `;
}

function saveQuizScore() {
    const nameInput = document.getElementById('quizPlayerName');
    const msgEl = document.getElementById('quizSaveMsg');
    const name = nameInput ? nameInput.value.trim() : '';

    if (!name) {
        msgEl.innerHTML = '<span style="color: #ff006e; font-size:0.85rem;">Please enter your name.</span>';
        nameInput.focus();
        return;
    }

    // Get existing scores from localStorage
    let scores = [];
    try {
        scores = JSON.parse(localStorage.getItem('galaxyQuizScores')) || [];
    } catch (e) { scores = []; }

    // Add new score
    scores.push({
        name: name,
        score: score,
        total: quizQuestions.length,
        date: new Date().toISOString()
    });

    // Sort by score (descending), keep top 10
    scores.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));
    scores = scores.slice(0, 10);

    localStorage.setItem('galaxyQuizScores', JSON.stringify(scores));

    // Show success
    msgEl.innerHTML = '<div class="quiz-save-success">✅ Score saved successfully!</div>';
    nameInput.disabled = true;
    document.querySelector('.quiz-save-btn').disabled = true;
    document.querySelector('.quiz-save-btn').style.opacity = '0.4';

    // Refresh leaderboard
    const lbArea = document.getElementById('quizLeaderboardArea');
    if (lbArea) lbArea.innerHTML = renderLeaderboard();
}

function renderLeaderboard() {
    let scores = [];
    try {
        scores = JSON.parse(localStorage.getItem('galaxyQuizScores')) || [];
    } catch (e) { scores = []; }

    if (scores.length === 0) {
        return `
            <div class="quiz-leaderboard">
                <h4>🏆 Leaderboard</h4>
                <div class="leaderboard-empty">No scores yet. Be the first!</div>
            </div>
        `;
    }

    const top5 = scores.slice(0, 5);
    const medals = ['🥇', '🥈', '🥉', '4.', '5.'];

    return `
        <div class="quiz-leaderboard">
            <h4>🏆 Leaderboard</h4>
            <ul class="leaderboard-list">
                ${top5.map((s, i) => `
                    <li>
                        <span class="lb-rank">${medals[i]}</span>
                        <span class="lb-name">${escapeHtml(s.name)}</span>
                        <span class="lb-score">${s.score}/${s.total}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    initQuiz();
}

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', initQuiz);

// ==================== CONTACT FORM ====================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !message) return;

        // Save to localStorage
        let messages = [];
        try {
            messages = JSON.parse(localStorage.getItem('galaxyContactMessages')) || [];
        } catch (e) { messages = []; }

        messages.push({
            name,
            email,
            subject: subject || '(No subject)',
            message,
            date: new Date().toISOString()
        });

        localStorage.setItem('galaxyContactMessages', JSON.stringify(messages));

        // Show success
        contactForm.style.display = 'none';
        const successEl = document.getElementById('contactSuccess');
        if (successEl) successEl.style.display = 'block';

        // Reset after 4 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            if (successEl) successEl.style.display = 'none';
        }, 4000);
    });
});
