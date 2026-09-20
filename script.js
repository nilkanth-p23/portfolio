'use strict';

const EMAIL    = 'nilkanthpat23@gmail.com';
const TITLES   = ['Computer Engineer.', 'Frontend Developer.', 'Data Analyst.', 'Rutgers NB Student.'];

/* ── NAV SCROLL ───────────────────────────────────────────────── */
function initNav() {
    const nav      = document.getElementById('nav');
    const sections = [...document.querySelectorAll('section[id]')];
    const links    = [...document.querySelectorAll('.nav-a')];

    window.addEventListener('scroll', () => {
        nav.classList.toggle('s', scrollY > 20);

        let current = sections[0]?.id;
        sections.forEach(s => { if (scrollY >= s.offsetTop - 100) current = s.id; });
        links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + current));
    }, { passive: true });
}

/* ── MOBILE NAV ─────────────────────────────────────────────────
   Toggles the hamburger drawer open/closed.
   ─────────────────────────────────────────────────────────────── */
function initMobileNav() {
    const btn  = document.getElementById('ham');
    const list = document.getElementById('navLinks');

    const close = () => {
        list.classList.remove('open');
        btn.classList.remove('x');
        document.body.style.overflow = '';
    };

    btn.addEventListener('click', () => {
        const open = list.classList.toggle('open');
        btn.classList.toggle('x', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    list.querySelectorAll('.nav-a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('click', e => {
        if (!document.getElementById('nav').contains(e.target)) close();
    });
}

/* ── TYPEWRITER ──────────────────────────────────────────────────
   Cycles through TITLES with a type/delete effect.
   ─────────────────────────────────────────────────────────────── */
function initTypewriter() {
    const el = document.getElementById('flipText');
    if (!el) return;

    let titleIndex = 0;
    let charIndex  = 0;
    let isDeleting = false;

    function tick() {
        const word = TITLES[titleIndex];
        el.textContent = word.slice(0, charIndex);

        if (!isDeleting) {
            charIndex++;
            if (charIndex > word.length) {
                isDeleting = true;
                setTimeout(tick, 1400);
                return;
            }
        } else {
            charIndex--;
            if (charIndex < 0) {
                isDeleting  = false;
                charIndex   = 0;
                titleIndex  = (titleIndex + 1) % TITLES.length;
            }
        }

        setTimeout(tick, isDeleting ? 45 : 80);
    }

    tick();
}
/* ── YEAR ────────────────────────────────────────────────────────
   Writes the current year into #yr.
   ─────────────────────────────────────────────────────────────── */
function initYear() {
    const el = document.getElementById('yr');
    if (el) el.textContent = new Date().getFullYear();
}

/* ── CONTACT FORM ────────────────────────────────────────────────
   Disables the submit button while the form is sending.
   ─────────────────────────────────────────────────────────────── */
function initForm() {
    const form = document.querySelector('.contact form');
    if (!form) return;

    form.addEventListener('submit', () => {
        const btn = document.getElementById('fsub');
        if (btn) {
            btn.textContent = 'Sending…';
            btn.disabled = true;
        }
    });
}

/* ── AI ABOUT-ME CHAT WIDGET ───────────────────────────────────
   A lightweight, fully client-side "trained" assistant: it matches
   visitor questions against a small knowledge base built from the
   resume/projects/skills below and returns the best-scoring answer.
   No API key, no backend — safe to ship on static hosting.

   Want it backed by a real LLM instead? Swap getAnswer() below for
   a fetch() to your own server route (e.g. a Vercel/Next.js API
   route that calls the OpenAI or Anthropic API with your key kept
   server-side). Never call a paid LLM API directly from the browser
   with an embedded key — it will get scraped and abused.
   ─────────────────────────────────────────────────────────────── */

const AI_KNOWLEDGE = [
    {
        keywords: ['language', 'languages', 'code in', 'program'],
        answer: "He's most comfortable in <strong>Python, JavaScript, and SQL</strong>, with working experience in HTML/CSS, MATLAB, and Next.js. Python is his go-to for data work; JS/Next.js for full-stack projects."
    },
    {
        keywords: ['skill', 'skills', 'tech stack', 'technolog', 'tools', 'know'],
        answer: "His stack spans a few areas: <strong>Languages</strong> — Python, SQL, JavaScript, HTML/CSS, MATLAB. <strong>Data</strong> — Pandas, NumPy, PostgreSQL, Tableau, Excel, Jupyter. <strong>Web</strong> — Next.js, NextAuth.js, Vercel. <strong>Tools</strong> — Git, GitHub, VS Code, Adobe Creative Suite, plus CAD tools like Fusion 360 and AutoCAD."
    },
    {
        keywords: ['name', 'year'],
        answer: "His name is <strong>Nilkanth Patel</strong>, a <strong>19-year-old</strong> <strong>Computer Engineering</strong> student at <strong>Rutgers University–New Brunswick</strong> focused on building <strong>data-driven systems</strong> and scalable <strong>web applications</strong>. His technical toolkit spans <strong>Languages</strong> like <strong>Python</strong>, <strong>SQL</strong>, and <strong>JavaScript</strong>, paired with <strong>Data & Web</strong> frameworks including <strong>PostgreSQL</strong>, <strong>Next.js</strong>, and <strong>Vercel</strong>. Beyond software development, he pairs developer tools like <strong>Git</strong> and <strong>VS Code</strong> with engineering platforms like <strong>Fusion 360</strong> to design robust, <strong>full-stack solutions</strong>."
    },
    {
        keywords: ['react', 'next.js', 'nextjs', 'frontend', 'front-end', 'web dev'],
        answer: "His main frontend work is in <strong>Next.js</strong> — the Spotify Personality app used 3 custom Next.js API routes with NextAuth.js for OAuth, deployed on Vercel."
    },
    {
        keywords: ['project', 'projects', 'built', 'build', 'portfolio'],
        answer: "He's built a few things: a full-stack <strong>Spotify Personality</strong> web app (Next.js + Spotify OAuth), a <strong>Flight Delay & Airline Performance</strong> analytics pipeline on 5.2M+ flights (Python/PostgreSQL/Tableau), a 3D-printed <strong>Universal Toy Car</strong>, and a <strong>Heat Transfer Analysis</strong> project in MATLAB. Ask about any one by name for more detail."
    },
    {
        keywords: ['spotify'],
        answer: "<strong>Spotify Personality</strong> is a full-stack music-personality app — Spotify OAuth 2.0 login, 3 custom Next.js API routes processing top artists/tracks/playlists, and a responsive multi-page UI on Vercel that maps listening history to 8 personality archetypes."
    },
    {
        keywords: ['flight', 'airline', 'delay', 'tableau', 'data analysis', 'data analyst'],
        answer: "The <strong>Flight Delay & Airline Performance</strong> project analyzed 5.2M+ U.S. flights from BTS government data — normalized PostgreSQL schema, 8 advanced SQL queries, and a 3-page Tableau dashboard. Key finding: Late Aircraft delays drove 41.2% of disruptions across 6 major carriers."
    },
    {
        keywords: ['toy car', 'car', 'id3ea', 'universal design'],
        answer: "The <strong>Universal Toy Car</strong> was a 4-person team project — a 3D-printed electromechanical toy car built in Fusion 360 and printed on a Bambu Lab, meeting 100% of the ID3EA course's universal-design specs."
    },
    {
        keywords: ['heat', 'thermal', 'matlab'],
        answer: "For <strong>Heat Transfer Analysis</strong>, he led a 5-person team through six experimental trials comparing conductive heat transfer across metal/nonmetal stacks, validating results against MATLAB-modeled simulations."
    },
    {
        keywords: ['experience', 'work', 'job', 'career', 'intern', 'internship'],
        answer: "He's currently <strong>Center Director</strong> at Code Ninjas, running 8–10 class blocks a week and managing 4–7 Senseis, after starting there as a <strong>Coding Sensei</strong>. Before that, he was an <strong>Engineering Intern</strong> at NJIT's STEMx program, cutting design iteration time from 2 weeks to 5 days."
    },
    {
        keywords: ['code ninjas', 'sensei', 'teach', 'teaching', 'director'],
        answer: "At <strong>Code Ninjas</strong> he's Center Director, overseeing a roster of 75–110 students and a team of 4–7 Senseis at a 7:1 student-to-instructor ratio. He started as a Coding Sensei teaching JavaScript and Godot through the CREATE curriculum."
    },
    {
        keywords: ['njit', 'stemx'],
        answer: "His NJIT STEMx internship (July 2024) focused on rapid prototyping, robotics, and electronics — he cut design iteration time from 2 weeks to 5 days and delivered 3 production-ready prototypes, presenting to 30+ peers and mentors."
    },
    {
        keywords: ['school', 'university', 'college', 'education', 'study', 'studying', 'gpa', 'major'],
        answer: "He's a <strong>Computer Engineering</strong> student at <strong>Rutgers University</strong> (expected May 2028), holding a 3.5/4.0 GPA and on the Dean's List, with the James and Edna Noe Endowed Scholarship."
    },
    {
        keywords: ['contact', 'email', 'reach', 'hire', 'linkedin', 'github', 'connect'],
        answer: "Best way to reach him is through the <strong>Contact</strong> section below, or directly at <strong>nilkanthpat23@gmail.com</strong>. He's also on LinkedIn and GitHub — links are in the nav and footer."
    },
    {
        keywords: ['who', 'about', 'yourself', 'you'],
        answer: "He's a first-year Computer Engineering student at Rutgers, currently Center Director at Code Ninjas, with hands-on experience in full-stack web dev, data analysis, and rapid prototyping. Ask me about his skills, projects, or experience for specifics."
    },
    {
        keywords: ['volunteer', 'off-tech', 'outside tech', 'community'],
        answer: "<strong>Beyond tech</strong>, he is actively involved in <strong>community leadership and service</strong>. Since July 2021, he has served as a <strong>Youth Mentorship Leader</strong> at <strong>BAPS Shri Swaminarayan Sanstha</strong> in Robbinsville, NJ, mentoring and teaching kids in grades 1–8. He also regularly supports local community initiatives, including <strong>charity walkathons</strong> and <strong>tree-planting drives</strong>."
    },
    {
        keywords: ['free-time', 'hobbies'],
        answer: "In his free time, he stays active by <strong>playing basketball with friends</strong> and following sports closely. He's a big <strong>Los Angeles Lakers</strong> fan, considers <strong>LeBron James</strong> his favorite player, and also tunes in to watch <strong>football</strong>. When unwinding, he's almost always listening to music—his favorite artists include <strong>Drake</strong>, <strong>Don Toliver</strong>, and <strong>The Weeknd</strong>."
    }
];

const AI_FALLBACK = "I don't have a specific answer for that one — but you can ask me about his <strong>skills</strong>, <strong>projects</strong>, <strong>experience</strong>, or <strong>education</strong>. For anything else, the Contact section will get you a real answer from him.";

function getAIAnswer(question) {
    const q = question.toLowerCase();
    let best = null;
    let bestScore = 0;

    AI_KNOWLEDGE.forEach(entry => {
        let score = 0;
        entry.keywords.forEach(kw => {
            if (q.includes(kw)) score += kw.length;
        });
        if (score > bestScore) {
            bestScore = score;
            best = entry;
        }
    });

    return best ? best.answer : AI_FALLBACK;
}

function initAIChat() {
    const messages    = document.getElementById('aiMessages');
    const form        = document.getElementById('aiForm');
    const input       = document.getElementById('aiInput');
    const suggestions = document.getElementById('aiSuggestions');
    if (!form || !messages || !input) return;

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    function addMessage(text, who) {
        const el = document.createElement('div');
        el.className = 'ai-msg ' + (who === 'user' ? 'ai-user' : 'ai-bot');
        el.innerHTML = text;
        messages.appendChild(el);
        scrollToBottom();
    }

    function ask(question) {
        if (!question.trim()) return;

        addMessage(question.replace(/</g, '&lt;'), 'user');
        input.value = '';

        const typing = document.createElement('div');
        typing.className = 'ai-typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(typing);
        scrollToBottom();

        const delay = 500 + Math.random() * 500;
        setTimeout(() => {
            typing.remove();
            addMessage(getAIAnswer(question), 'bot');
        }, delay);
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        ask(input.value);
    });

    if (suggestions) {
        suggestions.querySelectorAll('.ai-chip').forEach(chip => {
            chip.addEventListener('click', () => ask(chip.dataset.q));
        });
    }
}

/* ── INIT ────────────────────────────────────────────────────────
   Run all modules once the DOM is ready.
   ─────────────────────────────────────────────────────────────── */
function init() {
    initNav();
    initMobileNav();
    initTypewriter();
    initYear();
    initForm();
    initAIChat();
}

document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();