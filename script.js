/* =============================================
   PORTFOLIO JAVASCRIPT
   Pratham Sharma — Interactive Portfolio
   ============================================= */

// ── Constants ──────────────────────────────────────────────
const GITHUB_USERNAME = 'L-Pratham77';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_API = `${GITHUB_API}/repos?sort=updated&per_page=30`;

// Language color map
const LANG_COLORS = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#2b7489',
  'C++': '#f34b7d', C: '#555555', Java: '#b07219', Go: '#00ADD8',
  Rust: '#dea584', HTML: '#e34c26', CSS: '#563d7c', Ruby: '#701516',
  Swift: '#ffac45', Kotlin: '#F18E33', Dart: '#00B4AB', Shell: '#89e051',
  Vue: '#41b883', R: '#198CE7', MATLAB: '#e16737', null: '#8b949e'
};

// ── DOM Ready ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initHero();
  initReveal();
  initSkillBars();
  initGitHub();
  initContactForm();
  initFilterButtons();
});

// ── PARTICLE CANVAS ────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * 1.5 + 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.color = Math.random() > 0.6 ? '#a855f7' : Math.random() > 0.5 ? '#22d3ee' : '#ffffff';
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.05 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }
  loop();
}

// ── NAVBAR ─────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ── HERO ANIMATIONS ────────────────────────────────────────
function initHero() {
  // Role rotator
  const roles = [
    'Robotics Engineer', 'AI/ML Developer', 'IoT Specialist',
    'Drone Enthusiast', 'Computer Vision Dev', 'Embedded Systems Dev',
    'Electronics Engineer'
  ];
  let roleIdx = 0;
  const roleEl = document.getElementById('role-rotator');

  if (roleEl) {
    setInterval(() => {
      roleEl.style.opacity = '0';
      roleEl.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        roleIdx = (roleIdx + 1) % roles.length;
        roleEl.textContent = roles[roleIdx];
        roleEl.style.opacity = '1';
        roleEl.style.transform = 'translateY(0)';
      }, 300);
    }, 2500);

    roleEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  }
}

// ── SCROLL REVEAL ──────────────────────────────────────────
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => obs.observe(el));
}

// ── SKILL BARS ────────────────────────────────────────────
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const w = entry.target.dataset.width;
        entry.target.style.width = w + '%';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => obs.observe(bar));
}

// ── GITHUB API ────────────────────────────────────────────
let allRepos = [];
let currentFilter = 'all';

async function initGitHub() {
  await Promise.all([fetchProfile(), fetchRepos()]);
}

async function fetchProfile() {
  try {
    const res = await fetch(GITHUB_API);
    const data = await res.json();
    
    const reposEl = document.querySelector('#gh-repos-count .gh-stat-num');
    const followersEl = document.querySelector('#gh-followers-count .gh-stat-num');
    const followingEl = document.querySelector('#gh-following-count .gh-stat-num');

    if (reposEl) animateCount(reposEl, data.public_repos || 0);
    if (followersEl) animateCount(followersEl, data.followers || 0);
    if (followingEl) animateCount(followingEl, data.following || 0);
  } catch (e) {
    console.warn('Could not fetch GitHub profile:', e);
  }
}

async function fetchRepos() {
  const grid = document.getElementById('gh-repos-grid');
  if (!grid) return;

  try {
    const res = await fetch(REPOS_API);
    if (!res.ok) throw new Error('API error');
    allRepos = await res.json();

    // Filter out forks and some utility repos for cleaner display
    allRepos = allRepos.filter(r => !r.fork);

    grid.innerHTML = '';
    renderRepos(allRepos);
  } catch (e) {
    grid.innerHTML = `
      <div class="gh-loading">
        <p>⚠️ Could not load repos. <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" style="color:var(--primary)">View on GitHub →</a></p>
      </div>`;
  }
}

function renderRepos(repos) {
  const grid = document.getElementById('gh-repos-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!repos.length) {
    grid.innerHTML = `<div class="gh-loading"><p>No repositories found for this filter.</p></div>`;
    return;
  }

  repos.forEach((repo, i) => {
    const card = document.createElement('a');
    card.href = repo.html_url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'repo-card';
    card.style.animationDelay = `${i * 60}ms`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    const langColor = LANG_COLORS[repo.language] || LANG_COLORS[null];
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

    card.innerHTML = `
      <div class="repo-header">
        <span class="repo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
          </svg>
        </span>
        <span class="repo-name">${repo.name}</span>
      </div>
      <p class="repo-desc">${repo.description || 'No description provided.'}</p>
      ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="repo-homepage" onclick="event.stopPropagation()">🔗 Live Demo</a>` : ''}
      <div class="repo-meta">
        ${repo.language ? `
          <span class="repo-lang">
            <span class="lang-dot" style="background:${langColor}"></span>
            ${repo.language}
          </span>` : ''}
        <span class="repo-stars">⭐ ${repo.stargazers_count}</span>
        <span class="repo-forks">🍴 ${repo.forks_count}</span>
        <span class="repo-updated">${updatedDate}</span>
      </div>
    `;

    grid.appendChild(card);

    // Animate in with delay
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 60 + 50);
  });
}

// ── FILTER BUTTONS ────────────────────────────────────────
function initFilterButtons() {
  const btns = document.querySelectorAll('.gh-filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      currentFilter = lang;

      const filtered = lang === 'all'
        ? allRepos
        : allRepos.filter(r => r.language === lang);
      
      renderRepos(filtered);
    });
  });
}

// ── CONTACT FORM ──────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('form-success');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span>';

    // Simulate send (since no backend)
    await new Promise(r => setTimeout(r, 1500));

    btn.innerHTML = '<span>Sent! ✓</span>';
    successEl?.classList.add('show');
    form.reset();

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/></svg>';
      successEl?.classList.remove('show');
    }, 4000);
  });
}

// ── COUNTER ANIMATION ────────────────────────────────────
function animateCount(el, target) {
  let current = 0;
  const step = Math.ceil(target / 30);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current;
  }, 40);
}

// ── SMOOTH SCROLL ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── CURSOR GLOW EFFECT ────────────────────────────────────
(function() {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0; transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(cursor);
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
})();
