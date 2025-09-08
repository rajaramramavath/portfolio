// Load JSON section
async function loadSection(id, file, templateFn) {
  try {
    const res = await fetch(`data/${file}`);
    if (!res.ok) throw new Error(`${file} not found`);
    const data = await res.json();
    document.getElementById(id).innerHTML = templateFn(data);
  } catch (err) {
    console.error(`Error loading ${file}:`, err);
    document.getElementById(id).innerHTML = `<div class="text-red-500">Failed to load ${file}</div>`;
  }
}

// Templates
const aboutTemplate = () => `
  <div class="max-w-3xl mx-auto text-center py-12">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">About Me</h2>
    <p class="text-gray-600">
      I am a Computer Science (Cyber Security) student passionate about building secure systems,
      solving challenging problems, and creating practical solutions.
    </p>
  </div>
`;

const educationTemplate = (items) => `
  <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-2">🎓 Education</h2>
  <div class="mt-6 space-y-4">
    ${items.map(e => `
      <div class="bg-slate-50 border-l-4 border-blue-600 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-900">${e.title}</h3>
        <p class="text-sm text-gray-600 mt-1">${e.years} • CGPA: ${e.cgpa}</p>
      </div>
    `).join('')}
  </div>
`;

// Colored skills
const colorClasses = ["bg-red-100 text-red-700 border-red-200","bg-green-100 text-green-700 border-green-200","bg-blue-100 text-blue-700 border-blue-200","bg-yellow-100 text-yellow-700 border-yellow-200","bg-purple-100 text-purple-700 border-purple-200"];
const skillsTemplate = (items) => `
  <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-2">⚡ Skills</h2>
  <div class="mt-6 flex flex-wrap gap-3">
    ${items.map((s, idx) => {
      const color = colorClasses[idx % colorClasses.length];
      return `<span class="inline-flex items-center gap-2 px-4 py-2 ${color} border rounded-full text-sm font-medium hover:opacity-90 transition">
                ${s.name} <span class="text-xs opacity-80">(${s.level})</span>
              </span>`;
    }).join('')}
  </div>
`;

const projectsTemplate = (items) => `
  <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-2">💻 Projects</h2>
  <div class="mt-6 grid gap-4">
    ${items.map(p => `
      <div class="p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
        <h3 class="text-lg font-semibold text-gray-900">${p.name}</h3>
        <p class="text-sm text-gray-600 mt-1">${p.description}</p>
      </div>
    `).join('')}
  </div>
`;

const achievementsTemplate = (items) => `
  <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-2">🏆 Achievements</h2>
  <ul class="mt-6 space-y-3">
    ${items.map(p => `
      <div class="p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
        <h3 class="text-lg font-semibold text-gray-900">${p.name}</h3>
        <p class="text-sm text-gray-600 mt-1">${p.description}</p>
      </div>
    `).join('')}
  </ul>
`;

const contactTemplate = () => `
  <div class="max-w-3xl mx-auto text-center py-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>

    <div class="flex flex-col md:flex-row md:justify-center md:gap-12 gap-6 flex-wrap">
      <!-- Email -->
      <div class="flex items-center gap-2 justify-center">
        <img src="assets/mail.png" alt="Email" class="w-6 h-6">
        <a class="text-blue-600 underline" href="mailto:rajaram.cube@gmail.com">your.email@example.com</a>
      </div>

      <!-- GitHub -->
      <div class="flex items-center gap-2 justify-center">
        <img src="assets/github.png" alt="GitHub" class="w-6 h-6">
        <a class="text-blue-600 underline" href="https://github.com/yourusername">github.com/rajaramramavath</a>
      </div>

      <!-- LinkedIn -->
      <div class="flex items-center gap-2 justify-center">
        <img src="assets/linkedin.png" alt="LinkedIn" class="w-6 h-6">
        <a class="text-blue-600 underline" href="https://linkedin.com/in/rajaramramavath">linkedin.com/in/yourprofile</a>
      </div>

      <!-- WhatsApp -->
      <div class="flex items-center gap-2 justify-center">
        <img src="assets/whats.png" alt="WhatsApp" class="w-6 h-6">
        <a class="text-green-600 underline" href="https://wa.me/917013174884">+91 70131 74884</a>
      </div>
    </div>
  </div>
`;



// Typing effect for hero
function typingEffect() {
  const roles = ["Aspiring Cybersecurity Engineer", "Developer", "Problem Solver"];
  const el = document.getElementById('typing-text');
  let roleIndex = 0, charIndex = 0;
  const typingSpeed = 90, erasingSpeed = 45, delayBetweenRoles = 1400;

  function typeRole() {
    if (charIndex < roles[roleIndex].length) {
      el.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeRole, typingSpeed);
    } else {
      setTimeout(eraseRole, delayBetweenRoles);
    }
  }

  function eraseRole() {
    if (charIndex > 0) {
      el.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseRole, erasingSpeed);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, typingSpeed);
    }
  }
  setTimeout(typeRole, 700);
}

// Overlay lines typing
function overlayLinesEffect() {
  const lines = document.querySelectorAll('.background-overlay .line');
  lines.forEach((line, idx) => {
    const text = line.dataset.text || "";
    let c = 0;
    function step() {
      if (c < text.length) {
        line.textContent += text.charAt(c);
        c++;
        setTimeout(step, 30);
      }
    }
    setTimeout(step, idx * 500);
  });
}

// Mobile menu
function mobileMenuHandler() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));
}

// Smooth scroll and active nav
function navHandler() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section[id]')).map(s => ({id: s.id, top: s.offsetTop}));

  function refreshSectionTops() {
    sections.forEach(obj => {
      const el = document.getElementById(obj.id);
      obj.top = el ? el.offsetTop : 0;
    });
  }

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    let currentId = sections[0].id;
    for (const s of sections) if (scrollPos >= s.top) currentId = s.id;
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === `#${currentId}`) link.classList.add('active', 'text-blue-600');
      else link.classList.remove('active', 'text-blue-600');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) { e.preventDefault(); window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }); }
    });
  });

  refreshSectionTops();
  updateActiveNav();
  window.addEventListener('resize', refreshSectionTops);
  window.addEventListener('scroll', updateActiveNav);
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('about').innerHTML = aboutTemplate();
  document.getElementById('contact').innerHTML = contactTemplate();

  loadSection("education", "education.json", educationTemplate);
  loadSection("skills", "skills.json", skillsTemplate);
  loadSection("projects", "projects.json", projectsTemplate);
  loadSection("achievements", "ach.json", achievementsTemplate);

  typingEffect();
  overlayLinesEffect();
  mobileMenuHandler();
  navHandler();
});

