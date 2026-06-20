// ============ ADMIN PANEL LOGIC ============
const ADMIN_PASSWORD = 'sayed2026'; // Default password
const STORAGE_KEY = 'sayed_portfolio_projects';
const AUTH_KEY = 'sayed_admin_auth';

const DEFAULT_PROJECTS = [
  { id: 'p1', title: 'منصة الكاش باك الذكية', desc: 'منصة تجارة إلكترونية متكاملة بنظام كاش باك ذكي ولوحة تحكم تحليلية متقدمة لإدارة آلاف المنتجات والطلبات.', tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Redis'], icon: '🛍️', image: null, gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)', demo: '#', code: '#', status: 'published' },
  { id: 'p2', title: 'مساعد ذكي بالـ AI', desc: 'تطبيق محادثة بالذكاء الاصطناعي يدعم اللغة العربية بمعالجة لغوية متقدمة وتكامل مع نماذج GPT-4.', tags: ['Python', 'FastAPI', 'OpenAI', 'WebSocket'], icon: '🤖', image: null, gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)', demo: '#', code: '#', status: 'published' },
  { id: 'p3', title: 'نظام إدارة المطاعم', desc: 'نظام POS متكامل لإدارة المطاعم مع تطبيق موبايل للعملاء ولوحة تحكم للموظفين والإدارة.', tags: ['React Native', 'Node.js', 'MongoDB'], icon: '🍔', image: null, gradient: 'linear-gradient(135deg, #f97316, #ef4444)', demo: '#', code: '#', status: 'published' },
  { id: 'p4', title: 'منصة كورسات تفاعلية', desc: 'منصة تعلم إلكتروني بفيديوهات تفاعلية واختبارات وشهادات معتمدة ودردشة مباشرة مع المدربين.', tags: ['Vue.js', 'Django', 'WebRTC', 'AWS'], icon: '🎓', image: null, gradient: 'linear-gradient(135deg, #10b981, #06b6d4)', demo: '#', code: '#', status: 'published' }
];

function getProjects() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {}
  // Seed defaults
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  return DEFAULT_PROJECTS;
}

function saveProjects(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

// ============ AUTH ============
function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === '1';
}

function handleLogin(e) {
  e.preventDefault();
  const pwd = document.getElementById('login-password').value;
  const err = document.getElementById('login-error');
  if (pwd === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, '1');
    showDashboard();
  } else {
    err.textContent = '❌ كلمة المرور غير صحيحة';
    err.classList.remove('hidden');
    setTimeout(() => err.classList.add('hidden'), 3000);
  }
}
window.handleLogin = handleLogin;

function handleLogout() {
  sessionStorage.removeItem(AUTH_KEY);
  location.reload();
}
window.handleLogout = handleLogout;

function showDashboard() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  renderProjects();
  updateStats();
}

// Auto-login if already authenticated
if (isAuthenticated()) {
  showDashboard();
}

// ============ STATS ============
function updateStats() {
  const projects = getProjects();
  document.getElementById('stat-total').textContent = projects.length;
  document.getElementById('stat-published').textContent = projects.filter(p => p.status === 'published').length;
  document.getElementById('stat-drafts').textContent = projects.filter(p => p.status === 'draft').length;
  const allTags = new Set();
  projects.forEach(p => p.tags.forEach(t => allTags.add(t)));
  document.getElementById('stat-tags').textContent = allTags.size;
}

// ============ RENDER PROJECTS ============
function renderProjects() {
  const list = document.getElementById('projects-list');
  const empty = document.getElementById('empty-state');
  const search = document.getElementById('search-input')?.value.toLowerCase().trim() || '';

  let projects = getProjects();
  if (search) {
    projects = projects.filter(p =>
      p.title.toLowerCase().includes(search) ||
      p.desc.toLowerCase().includes(search) ||
      p.tags.some(t => t.toLowerCase().includes(search))
    );
  }

  if (projects.length === 0) {
    list.innerHTML = '';
    list.classList.add('hidden');
    empty.classList.remove('hidden');
    return;
  }

  list.classList.remove('hidden');
  empty.classList.add('hidden');
  list.innerHTML = '';

  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'admin-project-card';
    const imgStyle = p.image
      ? `background-image: url('${p.image}'); background-size: cover; background-position: center;`
      : `background: ${p.gradient};`;
    const iconContent = p.image ? '' : `<span>${p.icon || '🚀'}</span>`;
    const statusLabel = p.status === 'published' ? '📢 منشور' : '📝 مسودة';

    card.innerHTML = `
      <div class="admin-project-thumb" style="${imgStyle}">
        <span class="status-pill ${p.status}">${statusLabel}</span>
        ${iconContent}
      </div>
      <div class="p-4">
        <h3 class="font-bold text-sm mb-1.5 line-clamp-1">${escapeHtml(p.title)}</h3>
        <p class="text-xs text-gray-400 leading-relaxed mb-3" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escapeHtml(p.desc)}</p>
        <div class="flex flex-wrap gap-1 mb-3">
          ${p.tags.slice(0,3).map(t => `<span class="tag" style="font-size:0.6rem;padding:0.15rem 0.5rem;">${escapeHtml(t)}</span>`).join('')}
          ${p.tags.length > 3 ? `<span class="tag" style="font-size:0.6rem;padding:0.15rem 0.5rem;">+${p.tags.length - 3}</span>` : ''}
        </div>
        <div class="flex gap-1.5 flex-wrap">
          <button onclick="editProject('${p.id}')" class="action-btn edit">
            <i class="fas fa-edit"></i> تعديل
          </button>
          <button onclick="togglePublish('${p.id}')" class="action-btn toggle">
            <i class="fas fa-${p.status === 'published' ? 'eye-slash' : 'eye'}"></i>
            ${p.status === 'published' ? 'إخفاء' : 'نشر'}
          </button>
          <button onclick="askDelete('${p.id}')" class="action-btn delete">
            <i class="fas fa-trash"></i> حذف
          </button>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}
window.renderProjects = renderProjects;

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

// ============ MODAL CRUD ============
let currentImage = null;

function openProjectModal(project = null) {
  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-title');
  const form = document.getElementById('project-form');
  form.reset();
  currentImage = null;
  document.getElementById('image-preview').classList.add('hidden');
  document.getElementById('image-preview-empty').classList.remove('hidden');
  document.getElementById('clear-image-btn').classList.add('hidden');

  if (project) {
    title.textContent = '✏️ تعديل المشروع';
    document.getElementById('project-id').value = project.id;
    document.getElementById('p-title').value = project.title;
    document.getElementById('p-icon').value = project.icon || '';
    document.getElementById('p-desc').value = project.desc;
    document.getElementById('p-tags').value = project.tags.join(', ');
    document.getElementById('p-demo').value = project.demo === '#' ? '' : (project.demo || '');
    document.getElementById('p-code').value = project.code === '#' ? '' : (project.code || '');
    document.getElementById('p-gradient').value = project.gradient || 'linear-gradient(135deg, #8b5cf6, #ec4899)';
    document.getElementById('p-status').value = project.status || 'published';
    if (project.image) {
      currentImage = project.image;
      const img = document.getElementById('image-preview');
      img.src = project.image;
      img.classList.remove('hidden');
      document.getElementById('image-preview-empty').classList.add('hidden');
      document.getElementById('clear-image-btn').classList.remove('hidden');
    }
  } else {
    title.textContent = '➕ إضافة مشروع جديد';
    document.getElementById('project-id').value = '';
  }
  modal.classList.remove('hidden');
}
window.openProjectModal = openProjectModal;

function closeProjectModal() {
  document.getElementById('project-modal').classList.add('hidden');
}
window.closeProjectModal = closeProjectModal;

function previewImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    showToast('الصورة كبيرة جدًا. الحد الأقصى 2MB', 'error');
    e.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = (ev) => {
    currentImage = ev.target.result;
    const img = document.getElementById('image-preview');
    img.src = currentImage;
    img.classList.remove('hidden');
    document.getElementById('image-preview-empty').classList.add('hidden');
    document.getElementById('clear-image-btn').classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}
window.previewImage = previewImage;

function clearImage() {
  currentImage = null;
  document.getElementById('p-image').value = '';
  document.getElementById('image-preview').classList.add('hidden');
  document.getElementById('image-preview-empty').classList.remove('hidden');
  document.getElementById('clear-image-btn').classList.add('hidden');
}
window.clearImage = clearImage;

function saveProject(e) {
  e.preventDefault();
  const id = document.getElementById('project-id').value || ('p' + Date.now());
  const project = {
    id,
    title: document.getElementById('p-title').value.trim(),
    icon: document.getElementById('p-icon').value.trim() || '🚀',
    desc: document.getElementById('p-desc').value.trim(),
    tags: document.getElementById('p-tags').value.split(',').map(t => t.trim()).filter(Boolean),
    demo: document.getElementById('p-demo').value.trim() || '#',
    code: document.getElementById('p-code').value.trim() || '#',
    image: currentImage,
    gradient: document.getElementById('p-gradient').value,
    status: document.getElementById('p-status').value
  };

  if (project.tags.length === 0) {
    showToast('أضف تقنية واحدة على الأقل', 'error');
    return;
  }

  const projects = getProjects();
  const existing = projects.findIndex(p => p.id === id);
  if (existing >= 0) {
    projects[existing] = project;
    showToast('✅ تم تحديث المشروع بنجاح');
  } else {
    projects.unshift(project);
    showToast('🎉 تم إضافة المشروع بنجاح');
  }

  saveProjects(projects);
  closeProjectModal();
  renderProjects();
  updateStats();
}
window.saveProject = saveProject;

function editProject(id) {
  const project = getProjects().find(p => p.id === id);
  if (project) openProjectModal(project);
}
window.editProject = editProject;

function togglePublish(id) {
  const projects = getProjects();
  const p = projects.find(x => x.id === id);
  if (!p) return;
  p.status = p.status === 'published' ? 'draft' : 'published';
  saveProjects(projects);
  renderProjects();
  updateStats();
  showToast(p.status === 'published' ? '📢 تم النشر' : '📝 تم النقل إلى المسودات');
}
window.togglePublish = togglePublish;

let pendingDeleteId = null;
function askDelete(id) {
  pendingDeleteId = id;
  document.getElementById('confirm-modal').classList.remove('hidden');
}
window.askDelete = askDelete;

function closeConfirmModal() {
  document.getElementById('confirm-modal').classList.add('hidden');
  pendingDeleteId = null;
}
window.closeConfirmModal = closeConfirmModal;

function confirmDelete() {
  if (!pendingDeleteId) return;
  const projects = getProjects().filter(p => p.id !== pendingDeleteId);
  saveProjects(projects);
  closeConfirmModal();
  renderProjects();
  updateStats();
  showToast('🗑️ تم حذف المشروع');
}
window.confirmDelete = confirmDelete;

// ============ EXPORT ============
function exportData() {
  const data = JSON.stringify(getProjects(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sayed-projects-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 تم تصدير البيانات');
}
window.exportData = exportData;

// ============ TOAST ============
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('error');
  if (type === 'error') t.classList.add('error');
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}
window.showToast = showToast;

// Close modals on outside click
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', (e) => {
    if (e.target === m) {
      if (m.id === 'project-modal') closeProjectModal();
      else if (m.id === 'confirm-modal') closeConfirmModal();
    }
  });
});

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeConfirmModal();
  }
});
