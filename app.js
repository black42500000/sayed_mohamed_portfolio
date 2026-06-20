// ============ CONFIG ============
const WHATSAPP_NUMBER = '201090841534'; // 0109... with country code
const STORAGE_KEY = 'sayed_portfolio_projects';

// ============ DEFAULT PROJECTS (used if no saved data) ============
const DEFAULT_PROJECTS = [
  {
    id: 'p-athar',
    title: 'ATHAR Perfumes',
    desc: 'Landing page عربية فاخرة لبراند عطور، تعرض المنتجات والمميزات وآراء العملاء مع نموذج طلب ودفع عبر فودافون كاش وتجربة RTL احترافية.',
    tags: ['Next.js', 'Tailwind CSS', 'Vercel', 'RTL UI'],
    icon: '🌸',
    image: null,
    gradient: 'linear-gradient(135deg, #3f2b1f, #c08a52, #f5d7a1)',
    demo: 'https://athar-amber.vercel.app/',
    code: '#',
    status: 'published'
  },
  {
    id: 'p1',
    title: 'منصة الكاش باك الذكية',
    desc: 'منصة تجارة إلكترونية متكاملة بنظام كاش باك ذكي ولوحة تحكم تحليلية متقدمة لإدارة آلاف المنتجات والطلبات.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Redis'],
    icon: '🛍️',
    image: null,
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    demo: '#',
    code: '#',
    status: 'published'
  },
  {
    id: 'p2',
    title: 'مساعد ذكي بالـ AI',
    desc: 'تطبيق محادثة بالذكاء الاصطناعي يدعم اللغة العربية بمعالجة لغوية متقدمة وتكامل مع نماذج GPT-4.',
    tags: ['Python', 'FastAPI', 'OpenAI', 'WebSocket'],
    icon: '🤖',
    image: null,
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
    demo: '#',
    code: '#',
    status: 'published'
  },
  {
    id: 'p3',
    title: 'نظام إدارة المطاعم',
    desc: 'نظام POS متكامل لإدارة المطاعم مع تطبيق موبايل للعملاء ولوحة تحكم للموظفين والإدارة.',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    icon: '🍔',
    image: null,
    gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
    demo: '#',
    code: '#',
    status: 'published'
  },
  {
    id: 'p4',
    title: 'منصة كورسات تفاعلية',
    desc: 'منصة تعلم إلكتروني بفيديوهات تفاعلية واختبارات وشهادات معتمدة ودردشة مباشرة مع المدربين.',
    tags: ['Vue.js', 'Django', 'WebRTC', 'AWS'],
    icon: '🎓',
    image: null,
    gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
    demo: '#',
    code: '#',
    status: 'published'
  }
];

function getProjects() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return mergeDefaultProjects(JSON.parse(data));
  } catch (e) {}
  return DEFAULT_PROJECTS;
}

function mergeDefaultProjects(savedProjects) {
  const saved = Array.isArray(savedProjects) ? savedProjects : [];
  const savedIds = new Set(saved.map(p => p.id));
  const missingDefaults = DEFAULT_PROJECTS.filter(p => p.id === 'p-athar' && !savedIds.has(p.id));
  if (missingDefaults.length === 0) return saved;
  const merged = [...missingDefaults, ...saved];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

// ============ Cursor Glow ============
const glow = document.getElementById('cursor-glow');
if (glow) {
  document.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

// ============ SKILLS ============
const skills = [
  { name: 'JavaScript', icon: 'fab fa-js-square', color: '#f7df1e' },
  { name: 'TypeScript', icon: 'fas fa-code', color: '#3178c6' },
  { name: 'Python', icon: 'fab fa-python', color: '#3776ab' },
  { name: 'React', icon: 'fab fa-react', color: '#61dafb' },
  { name: 'Next.js', icon: 'fas fa-bolt', color: '#ffffff' },
  { name: 'Vue.js', icon: 'fab fa-vuejs', color: '#42b883' },
  { name: 'Node.js', icon: 'fab fa-node-js', color: '#68a063' },
  { name: 'Tailwind', icon: 'fas fa-wind', color: '#06b6d4' },
  { name: 'MongoDB', icon: 'fas fa-leaf', color: '#47a248' },
  { name: 'PostgreSQL', icon: 'fas fa-database', color: '#336791' },
  { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed' },
  { name: 'AWS', icon: 'fab fa-aws', color: '#ff9900' },
  { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032' },
  { name: 'Figma', icon: 'fab fa-figma', color: '#a855f7' },
  { name: 'Linux', icon: 'fab fa-linux', color: '#fcc624' },
  { name: 'GraphQL', icon: 'fas fa-project-diagram', color: '#e535ab' },
  { name: 'Redis', icon: 'fas fa-bolt-lightning', color: '#dc382d' },
  { name: 'Firebase', icon: 'fas fa-fire', color: '#ffca28' },
];

const skillsGrid = document.getElementById('skills-grid');
if (skillsGrid) {
  skills.forEach((s, i) => {
    const tile = document.createElement('div');
    tile.className = 'skill-tile';
    tile.innerHTML = `
      <i class="${s.icon}" style="color: ${s.color}"></i>
      <div class="skill-name">${s.name}</div>
    `;
    skillsGrid.appendChild(tile);
  });
}

// ============ RENDER PROJECTS ============
function renderPublicProjects() {
  const grid = document.getElementById('projects-grid');
  const empty = document.getElementById('empty-projects');
  if (!grid) return;

  const projects = getProjects().filter(p => p.status === 'published');

  if (projects.length === 0) {
    grid.classList.add('hidden');
    empty?.classList.remove('hidden');
    return;
  }

  grid.classList.remove('hidden');
  empty?.classList.add('hidden');
  grid.innerHTML = '';

  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    const imgStyle = p.image
      ? `background-image: url('${p.image}'); background-size: cover; background-position: center;`
      : `background: ${p.gradient};`;
    const iconContent = p.image ? '' : `<span>${p.icon || '🚀'}</span>`;

    card.innerHTML = `
      <div class="project-image ${p.image ? '' : 'project-image-emoji'}" style="${imgStyle}">
        ${iconContent}
      </div>
      <div class="project-body">
        <h3 class="font-bold text-lg mb-2">${escapeHtml(p.title)}</h3>
        <p class="text-gray-400 text-sm leading-relaxed mb-4">${escapeHtml(p.desc)}</p>
        <div class="flex flex-wrap gap-1.5 mb-4">
          ${p.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
        </div>
        <div class="flex gap-2 flex-wrap">
          ${p.demo && p.demo !== '#' ? `<a href="${escapeAttr(p.demo)}" target="_blank" rel="noopener noreferrer" class="link-btn primary"><i class="fas fa-external-link-alt"></i> معاينة</a>` : ''}
          ${p.code && p.code !== '#' ? `<a href="${escapeAttr(p.code)}" target="_blank" rel="noopener noreferrer" class="link-btn outline"><i class="fab fa-github"></i> الكود</a>` : ''}
          <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحبًا سيد، أريد معرفة المزيد عن مشروع: ' + p.title)}" target="_blank" rel="noopener noreferrer" class="link-btn whatsapp">
            <i class="fab fa-whatsapp"></i> استفسار
          </a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function escapeAttr(s) { return escapeHtml(s); }

renderPublicProjects();

// ============ CONTACT FORM (WhatsApp) ============
function handleContactSubmit(e) {
  e.preventDefault();
  const f = e.target;
  const name = f.name.value.trim();
  const phone = f.phone.value.trim();
  const subject = f.subject.value.trim();
  const message = f.message.value.trim();

  const text = `*رسالة جديدة من البورتفوليو*\n\n` +
               `👤 *الاسم:* ${name}\n` +
               (phone ? `📱 *الهاتف:* ${phone}\n` : '') +
               `📌 *الموضوع:* ${subject}\n\n` +
               `💬 *الرسالة:*\n${message}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  showToast('جاري فتح واتساب لإرسال رسالتك... 📲');
  f.reset();
}
window.handleContactSubmit = handleContactSubmit;

// ============ TOAST ============
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('error');
  if (type === 'error') t.classList.add('error');
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}
window.showToast = showToast;

// ============ X BLACK CHATBOT ============
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const quickReplies = document.getElementById('quick-replies');
const chatTooltip = document.getElementById('chat-tooltip');

const responses = {
  greeting: [
    "أهلًا بك! 👋✨ أنا **X BLACK**، المساعد الذكي لسيد محمد.\n\nسعيد بزيارتك! كيف يمكنني مساعدتك اليوم؟",
    "مرحبًا! 🌟 أنا X BLACK، أعرف كل شيء عن سيد ومشاريعه.\n\nاسألني أي شيء تريد معرفته! 💫"
  ],
  about: "**سيد محمد** مطور برمجيات Full-Stack محترف 💼\n\n🎯 يحوّل الأفكار إلى منتجات رقمية\n⚡ خبرة +5 سنوات في التطوير\n🌍 عمل مع +30 عميل في 12 دولة\n💡 شغف بالتقنيات الحديثة والكود النظيف\n\nإيه السؤال الجاي؟ 😊",
  skills: "مهارات سيد التقنية 🚀\n\n**Frontend:**\n• React, Next.js, Vue.js\n• TypeScript, Tailwind CSS\n\n**Backend:**\n• Node.js, Python, Django\n• PostgreSQL, MongoDB, Redis\n\n**DevOps & Cloud:**\n• AWS, Docker, Linux\n• CI/CD, GitHub Actions\n\n**Mobile:**\n• React Native, Flutter 📱",
  projects: "أنجز سيد +50 مشروعًا متنوعًا! 🎯\n\nاتجه لقسم \"الأعمال\" 👇 لاستعراضها كاملة، أو اضغط على أي مشروع لمعرفة التفاصيل!",
  contact: `تواصل مع سيد بسهولة! 📬\n\n📱 **واتساب:** 01090841534\n📞 **اتصال:** 01090841534\n📧 **البريد:** sayed@dev.com\n📍 **الموقع:** القاهرة، مصر 🇪🇬\n\n⏱️ يرد خلال ساعة\n\nاضغط على [راسلني واتساب](https://wa.me/${WHATSAPP_NUMBER}) للتواصل الفوري! 💚`,
  price: "أسعار سيد تنافسية ومرنة! 💰\n\n🎁 **استشارة مجانية:** 30 دقيقة\n💎 **مشاريع صغيرة:** من 500$\n⭐ **مشاريع متوسطة:** 1500-5000$\n🚀 **مشاريع كبيرة:** عرض مخصص\n\nراسله على واتساب للحصول على عرض سعر مخصص! 📩",
  hire: "ممتاز! 🎉 سيد متاح حاليًا لمشاريع جديدة\n\n✅ **خطوات البداية:**\n1. أرسل تفاصيل مشروعك\n2. اجتماع مجاني لفهم المتطلبات\n3. عرض سعر وجدول زمني\n4. بدء التنفيذ 🚀\n\n📱 **واتساب:** 01090841534\nأو املأ نموذج التواصل!",
  experience: "خبرة سيد المهنية 📈\n\n🏆 **+5 سنوات** في تطوير البرمجيات\n🌍 عمل مع شركات من **12 دولة**\n💼 **+30 عميلًا** سعيدًا\n📦 **+50 مشروعًا** ناجحًا\n🎯 معدل رضا العملاء: **98%**",
  thanks: "العفو يا غالي! 😊✨\nيسعدني خدمتك دائمًا.\n\nهل هناك شيء آخر تريد معرفته؟ 🌟",
  who_are_you: "أنا **X BLACK** 🤖✨\nالمساعد الذكي الشخصي لسيد محمد.\n\n💡 مهمتي أن أساعدك في:\n• معرفة المزيد عن سيد\n• استكشاف مهاراته ومشاريعه\n• الإجابة على أسئلتك بسرعة\n• توصيلك لسيد بسهولة\n\nاسألني أي شيء! 🚀",
  default: "هممم 🤔 سؤال مثير!\n\nيمكنني مساعدتك في:\n• 👤 معرفة المزيد عن سيد\n• 💻 استكشاف مهاراته التقنية\n• 🚀 الاطلاع على مشاريعه\n• 📞 التواصل معه\n• 💰 الأسعار والخدمات\n\nاختر من الأزرار بالأسفل أو اسأل بحرية! ✨"
};

const quickOptions = [
  { text: '👤 من هو سيد؟', key: 'about' },
  { text: '💻 مهاراته', key: 'skills' },
  { text: '🚀 مشاريعه', key: 'projects' },
  { text: '📱 واتساب', key: 'contact' },
  { text: '💰 الأسعار', key: 'price' },
  { text: '🤝 وظّفه', key: 'hire' },
  { text: '🤖 من أنت؟', key: 'who_are_you' },
];

function addMsg(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.className = `msg ${sender}`;
  const avatar = sender === 'bot'
    ? `<div class="msg-avatar-sm"><i class="fas fa-comment-dots"></i></div>`
    : `<div class="msg-avatar-sm"><i class="fas fa-user"></i></div>`;

  // Format: **bold**, [text](url), \n
  let formatted = escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#6ee7b7;text-decoration:underline;font-weight:700;">$1</a>')
    .replace(/\n/g, '<br>');

  msg.innerHTML = sender === 'bot'
    ? `${avatar}<div class="msg-bubble">${formatted}</div>`
    : `<div class="msg-bubble">${formatted}</div>${avatar}`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const t = document.createElement('div');
  t.className = 'msg bot';
  t.id = 'typing';
  t.innerHTML = `
    <div class="msg-avatar-sm"><i class="fas fa-comment-dots"></i></div>
    <div class="typing-indicator"><span></span><span></span><span></span></div>
  `;
  chatMessages.appendChild(t);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() { document.getElementById('typing')?.remove(); }

function renderQuick() {
  quickReplies.innerHTML = '';
  quickOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quick-pill';
    btn.textContent = opt.text;
    btn.type = 'button';
    btn.onclick = () => {
      addMsg(opt.text, 'user');
      respond(opt.key);
    };
    quickReplies.appendChild(btn);
  });
}

function detectIntent(text) {
  const t = text.toLowerCase().trim();
  if (/مرحب|اهل|أهل|سلام|هاي|hi|hello|hey|صباح|مساء/.test(t)) return 'greeting';
  if (/من هو سيد|عن سيد|نبذة|تعريف|من سيد|about|من هو/.test(t)) return 'about';
  if (/مهار|تقني|لغ|skill|tech|stack|يعرف|يتقن|يجيد|programming/.test(t)) return 'skills';
  if (/مشروع|أعمال|اعمال|portfolio|project|work|سابق|نماذج/.test(t)) return 'projects';
  if (/تواصل|اتصال|ايميل|إيميل|بريد|contact|email|phone|رقم|واتس|whatsapp/.test(t)) return 'contact';
  if (/سعر|تكلف|اسعار|أسعار|price|cost|كم|فلوس|ميزانية/.test(t)) return 'price';
  if (/وظف|توظيف|اشغل|hire|job|عمل معه|تعاون|اشتغل/.test(t)) return 'hire';
  if (/خبرة|سنوات|تجربة|experience|years|كم سنة/.test(t)) return 'experience';
  if (/شكر|thanks|thank|تمام|ok|حلو|رائع|شكرا/.test(t)) return 'thanks';
  if (/من انت|من أنت|ما اسمك|انت مين|who are you|اسمك ايه/.test(t)) return 'who_are_you';
  return 'default';
}

function respond(key) {
  showTyping();
  setTimeout(() => {
    hideTyping();
    const r = responses[key];
    const text = Array.isArray(r) ? r[Math.floor(Math.random() * r.length)] : r;
    addMsg(text, 'bot');
  }, 700 + Math.random() * 700);
}

if (chatForm) {
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    chatInput.value = '';
    respond(detectIntent(text));
  });
}

let chatOpened = false;
function openChat() {
  chatWindow.classList.add('open');
  chatTooltip?.classList.remove('show');
  if (!chatOpened) {
    chatOpened = true;
    setTimeout(() => {
      addMsg(responses.greeting[0], 'bot');
      renderQuick();
    }, 250);
  }
}
function closeChat() { chatWindow.classList.remove('open'); }

if (chatToggle) {
  chatToggle.addEventListener('click', () => {
    chatWindow.classList.contains('open') ? closeChat() : openChat();
  });
  chatClose?.addEventListener('click', closeChat);

  setTimeout(() => {
    if (!chatOpened && chatTooltip) {
      chatTooltip.classList.add('show');
      setTimeout(() => chatTooltip.classList.remove('show'), 5000);
    }
  }, 2500);
}

// Reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card, .project-card, .skill-tile, .float-card, .contact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Re-observe when new projects are rendered
new MutationObserver(() => {
  document.querySelectorAll('.project-card').forEach(el => {
    if (!el.dataset.observed) {
      el.dataset.observed = '1';
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    }
  });
}).observe(document.getElementById('projects-grid') || document.body, { childList: true });
