/* =============================================
   VERITAS — Core Application JS
   State, Auth, Articles, Voting, Utils
   ============================================= */

'use strict';

/* ---- STORAGE HELPERS ---- */
const Store = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem('veritas_' + key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem('veritas_' + key, JSON.stringify(val)); } catch {}
  },
  del(key) {
    try { localStorage.removeItem('veritas_' + key); } catch {}
  }
};

/* ---- UNIQUE ID ---- */
function uid(prefix = '') {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ---- SEED DATA ---- */
const SEED_ARTICLES = [
  {
    id: 'art_001', title: 'Internal Memos Reveal Pharmaceutical Giant Suppressed Safety Trial Data for Flagship Drug',
    category: 'Health & Pharmaceuticals', author: 'Anonymous Source', authorId: 'user_anon1',
    date: '2025-11-14', status: 'verified',
    excerpt: 'Over 3,000 pages of internal documents obtained by Veritas show that Harcourt Pharma\'s legal team directed researchers to exclude adverse cardiac events from the published Phase III trial results of Cardivex, approved by regulators in 2023.',
    content: `Over 3,000 pages of internal documents obtained by Veritas show that Harcourt Pharma's legal team directed researchers to exclude adverse cardiac events from the published Phase III trial results of Cardivex, approved by regulators in 2023.\n\nThe documents, authenticated by two independent forensic analysts, include email chains dated between January and August 2022 in which senior vice president Dr. Marcus Heller instructs the clinical team to "reframe endpoint definitions" before final regulatory submission.\n\nOne email reads: "The EMA submission window closes in six weeks. The cardiac signal in the 65+ cohort needs to be reclassified under 'pre-existing condition' category or we lose the timeline."\n\nThe drug has since been prescribed to an estimated 4.2 million patients in the EU and North America. At least 340 post-market adverse cardiac events have been reported to the FDA, though no formal investigation has been launched.\n\nHarcourt Pharma did not respond to requests for comment. The FDA confirmed it had received the documents and would "evaluate their authenticity."`,
    upvotes: 847, downvotes: 23, comments: 142, views: 18420,
    evidenceCount: 12, evidenceTypes: ['document', 'document', 'photo'],
    verifiedBy: 89, disputedBy: 4,
    tags: ['pharma', 'FDA', 'clinical trials', 'corporate misconduct'],
    featured: true
  },
  {
    id: 'art_002', title: 'City Police Department Ran Unauthorized Surveillance Operation on Activist Groups for 18 Months',
    category: 'Law Enforcement', author: 'J. Reyes', authorId: 'user_002',
    date: '2025-11-10', status: 'verified',
    excerpt: 'A former intelligence analyst within the department has provided Veritas with over 800 surveillance logs, location records, and internal briefings documenting a covert program targeting environmental and civil rights organizers.',
    content: `A former intelligence analyst within the department has provided Veritas with over 800 surveillance logs, location records, and internal briefings documenting a covert program targeting environmental and civil rights organizers.\n\nThe program, internally called "Operation Greenwatch," ran from March 2023 to September 2024 without a judicial warrant and in apparent violation of three federal consent decrees governing the department's intelligence activities.\n\nThe documents show that officers tracked the movements of at least 47 named individuals, attended private meetings under false pretenses, and compiled dossiers on organizers' family members, employers, and medical histories.\n\nChief Sandra Morales acknowledged the department "conducted lawful intelligence gathering" but declined to confirm operational specifics. The city's civilian oversight board says it was never informed of the program's existence.\n\nTwo city council members have called for an independent investigation. The ACLU has filed a public records request.`,
    upvotes: 612, downvotes: 41, comments: 98, views: 11230,
    evidenceCount: 8, evidenceTypes: ['document', 'photo'],
    verifiedBy: 67, disputedBy: 11,
    tags: ['surveillance', 'police', 'civil rights', 'government'],
    featured: true
  },
  {
    id: 'art_003', title: 'Defense Contractor Billed Government $2.3B for Work Performed by Overseas Shell Companies',
    category: 'Financial Fraud', author: 'Anonymous', authorId: 'user_anon2',
    date: '2025-11-07', status: 'reviewing',
    excerpt: 'Financial records and subcontracting agreements leaked to Veritas suggest that Arcturus Defense Systems systematically routed federally contracted work through a network of shell entities registered in Cyprus and the Cayman Islands.',
    content: `Financial records and subcontracting agreements leaked to Veritas suggest that Arcturus Defense Systems systematically routed federally contracted work through a network of shell entities registered in Cyprus and the Cayman Islands.\n\nThe company held active DoD contracts worth approximately $4.1 billion between 2021 and 2024, according to publicly available USASpending data. Internal subcontracting records obtained by Veritas show that more than half of that work — billed at domestic labor rates — was performed by overseas entities that exist only on paper.\n\nOne document trail shows a $340 million logistics contract for military base maintenance being invoiced at $850 per hour for "senior systems engineers" whose credentials and existence Veritas has been unable to verify.\n\nThe Pentagon's Inspector General did not respond to a request for comment. Arcturus Defense Systems denied any wrongdoing and said all subcontracting arrangements were "fully disclosed and compliant."`,
    upvotes: 389, downvotes: 67, comments: 54, views: 7890,
    evidenceCount: 6, evidenceTypes: ['document'],
    verifiedBy: 31, disputedBy: 22,
    tags: ['defense', 'fraud', 'government contracts', 'financial'],
    featured: false
  },
  {
    id: 'art_004', title: 'Social Media Platform\'s Internal Research Confirmed Harm to Teen Mental Health — Executives Chose Growth',
    category: 'Technology & Surveillance', author: 'M. Chen', authorId: 'user_003',
    date: '2025-11-03', status: 'verified',
    excerpt: 'Slide decks and research summaries from a major platform\'s internal safety team show that leadership was presented with data linking algorithmic recommendation changes to measurable increases in depressive symptoms in users aged 13–17.',
    content: `Slide decks and research summaries from a major platform's internal safety team show that leadership was presented with data linking algorithmic recommendation changes to measurable increases in depressive symptoms in users aged 13–17.\n\nThe documents, dated Q3 2022, show that a product experiment involving increased recommendation velocity for emotionally charged content drove a 14% increase in session time among teen users — but that the same cohort showed a statistically significant uptick in self-reported negative body image and social comparison scores.\n\nDespite a recommendation from the safety team to "pause and evaluate," executives approved a full rollout of the recommendation changes three weeks later. An internal note attributed to a senior product director reads: "We can monitor and iterate. The growth numbers are too important to pause on right now."\n\nThe platform says it "takes teen safety extremely seriously" and pointed to subsequent safety features launched in 2024. Critics note those features came two years and millions of teenage users after the internal warnings were filed.`,
    upvotes: 1204, downvotes: 88, comments: 267, views: 34100,
    evidenceCount: 15, evidenceTypes: ['document', 'photo'],
    verifiedBy: 134, disputedBy: 18,
    tags: ['big tech', 'mental health', 'teens', 'algorithm'],
    featured: true
  },
  {
    id: 'art_005', title: 'Water Authority Concealed Lead Contamination Reports in Three Districts for Over Two Years',
    category: 'Environmental', author: 'T. Williams', authorId: 'user_004',
    date: '2025-10-28', status: 'verified',
    excerpt: 'Testing records obtained under freedom of information requests reveal that the regional water authority was aware of lead levels exceeding EPA action thresholds in the Eastfield, Norwood, and Carver Park districts since early 2023.',
    content: `Testing records obtained under freedom of information requests reveal that the regional water authority was aware of lead levels exceeding EPA action thresholds in the Eastfield, Norwood, and Carver Park districts since early 2023.\n\nDespite this, the authority continued to issue "all clear" public health notices and failed to notify residents or trigger the mandatory public disclosure requirements under the EPA's Lead and Copper Rule.\n\nInternal emails show that authority director James Colton was briefed on the situation in April 2023. His response, documented in a reply email: "Let's hold this internally until we've assessed remediation costs. No public statement yet."\n\nAn estimated 28,000 residents in the three affected districts have been drinking the water during this period. Pediatric health advocates say children under six who were regularly exposed may require testing for elevated blood lead levels.`,
    upvotes: 2100, downvotes: 12, comments: 394, views: 61200,
    evidenceCount: 22, evidenceTypes: ['document', 'photo', 'document'],
    verifiedBy: 198, disputedBy: 3,
    tags: ['water', 'environment', 'public health', 'local government'],
    featured: false
  },
  {
    id: 'art_006', title: 'Leaked Diplomatic Cables Show Coordinated Pressure Campaign Against International Court Investigators',
    category: 'Government & Politics', author: 'Anonymous', authorId: 'user_anon3',
    date: '2025-10-19', status: 'reviewing',
    excerpt: 'A collection of diplomatic cables obtained by Veritas indicates that representatives from three governments coordinated to discourage ICC member states from cooperating with investigators probing alleged war crimes.',
    content: `A collection of diplomatic cables obtained by Veritas indicates that representatives from three governments coordinated to discourage ICC member states from cooperating with investigators probing alleged war crimes.\n\nThe cables, spanning a six-month period in 2024, document meetings between foreign ministry officials in which specific tactics are discussed: offering bilateral trade incentives to countries that decline interview requests, applying pressure on court-appointed experts through their home institutions, and circulating opposition research targeting lead investigators.\n\nOne cable summarizes a meeting objective as: "Ensure the investigation timeline extends beyond the political window. Procedural delay is the goal."\n\nThe ICC declined to comment on active proceedings. Two of the three governments named in the documents issued blanket denials. The third did not respond.`,
    upvotes: 445, downvotes: 89, comments: 76, views: 9340,
    evidenceCount: 9, evidenceTypes: ['document'],
    verifiedBy: 44, disputedBy: 31,
    tags: ['ICC', 'diplomacy', 'government', 'international'],
    featured: false
  }
];

const SEED_USERS = [
  { id: 'user_001', name: 'Sarah Mitchell', handle: 'smitchell', role: 'journalist', verified: true, submissions: 14, reputation: 920, joined: '2025-01-15', bio: 'Investigative journalist. Follow the money.', avatar: 'SM' },
  { id: 'user_002', name: 'J. Reyes', handle: 'jreyes', role: 'journalist', verified: true, submissions: 9, reputation: 680, joined: '2025-02-03', bio: 'Law enforcement accountability reporter.', avatar: 'JR' },
  { id: 'user_003', name: 'M. Chen', handle: 'mchen', role: 'contributor', verified: true, submissions: 6, reputation: 470, joined: '2025-03-20', bio: 'Tech policy researcher.', avatar: 'MC' },
  { id: 'user_004', name: 'T. Williams', handle: 'twilliams', role: 'journalist', verified: true, submissions: 11, reputation: 810, joined: '2025-01-28', bio: 'Environmental beat. Water rights.', avatar: 'TW' }
];

/* ---- INIT DATA ---- */
function initData() {
  if (!Store.get('articles')) Store.set('articles', SEED_ARTICLES);
  if (!Store.get('users')) Store.set('users', SEED_USERS);
  if (!Store.get('votes')) Store.set('votes', {});
  if (!Store.get('comments')) Store.set('comments', {});
  if (!Store.get('verifies')) Store.set('verifies', {});
}

/* ---- AUTH ---- */
const Auth = {
  current() { return Store.get('current_user'); },
  isLoggedIn() { return !!this.current(); },
  login(user) { Store.set('current_user', user); },
  logout() { Store.del('current_user'); },
  register(name, email, password) {
    const users = Store.get('users', []);
    if (users.find(u => u.email === email)) return { error: 'Email already registered.' };
    const user = {
      id: uid('user_'), name, email, handle: name.toLowerCase().replace(/\s+/g, ''),
      role: 'contributor', verified: false, submissions: 0, reputation: 0,
      joined: new Date().toISOString().slice(0,10), bio: '', avatar: name.slice(0,2).toUpperCase(),
      password // NOTE: plaintext only — this is a frontend demo, not production auth
    };
    users.push(user);
    Store.set('users', users);
    const { password: _, ...safeUser } = user;
    this.login(safeUser);
    return { user: safeUser };
  },
  loginWithCredentials(email, password) {
    const users = Store.get('users', []);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { error: 'Invalid email or password.' };
    const { password: _, ...safeUser } = user;
    this.login(safeUser);
    return { user: safeUser };
  }
};

/* ---- ARTICLES ---- */
const Articles = {
  all() { return Store.get('articles', []); },
  get(id) { return this.all().find(a => a.id === id); },
  save(articles) { Store.set('articles', articles); },
  add(article) { const all = this.all(); all.unshift(article); this.save(all); },
  update(id, patch) {
    const all = this.all();
    const i = all.findIndex(a => a.id === id);
    if (i > -1) { all[i] = { ...all[i], ...patch }; this.save(all); }
  },
  search(q) {
    if (!q) return this.all();
    q = q.toLowerCase();
    return this.all().filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      (a.tags || []).some(t => t.toLowerCase().includes(q))
    );
  },
  byCategory(cat) {
    if (!cat || cat === 'All') return this.all();
    return this.all().filter(a => a.category === cat);
  },
  featured() { return this.all().filter(a => a.featured); },
  pending() { return this.all().filter(a => a.status === 'reviewing'); },
  sorted(by = 'date') {
    const all = this.all();
    if (by === 'votes') return [...all].sort((a,b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    if (by === 'views') return [...all].sort((a,b) => b.views - a.views);
    if (by === 'comments') return [...all].sort((a,b) => b.comments - a.comments);
    return [...all].sort((a,b) => new Date(b.date) - new Date(a.date));
  }
};

/* ---- VOTING ---- */
const Voting = {
  getUserVote(articleId) {
    const user = Auth.current();
    if (!user) return null;
    const votes = Store.get('votes', {});
    return votes[user.id + '_' + articleId] || null;
  },
  vote(articleId, direction) {
    const user = Auth.current();
    if (!user) { showToast('Sign in to vote', 'warning'); return false; }
    const votes = Store.get('votes', {});
    const key = user.id + '_' + articleId;
    const existing = votes[key];
    const article = Articles.get(articleId);
    if (!article) return false;

    let patch = {};
    if (existing === direction) {
      // un-vote
      delete votes[key];
      patch[direction === 'up' ? 'upvotes' : 'downvotes'] = article[direction === 'up' ? 'upvotes' : 'downvotes'] - 1;
    } else {
      if (existing) {
        // switch vote
        patch[existing === 'up' ? 'upvotes' : 'downvotes'] = article[existing === 'up' ? 'upvotes' : 'downvotes'] - 1;
      }
      votes[key] = direction;
      patch[direction === 'up' ? 'upvotes' : 'downvotes'] = article[direction === 'up' ? 'upvotes' : 'downvotes'] + 1;
    }
    Store.set('votes', votes);
    Articles.update(articleId, patch);
    return true;
  },
  verify(articleId, direction) {
    const user = Auth.current();
    if (!user) { showToast('Sign in to verify', 'warning'); return false; }
    const verifies = Store.get('verifies', {});
    const key = user.id + '_verify_' + articleId;
    const existing = verifies[key];
    const article = Articles.get(articleId);
    if (!article) return false;

    let patch = {};
    if (existing === direction) {
      delete verifies[key];
      patch[direction === 'verified' ? 'verifiedBy' : 'disputedBy'] = (article[direction === 'verified' ? 'verifiedBy' : 'disputedBy'] || 0) - 1;
    } else {
      if (existing) {
        patch[existing === 'verified' ? 'verifiedBy' : 'disputedBy'] = (article[existing === 'verified' ? 'verifiedBy' : 'disputedBy'] || 0) - 1;
      }
      verifies[key] = direction;
      patch[direction === 'verified' ? 'verifiedBy' : 'disputedBy'] = (article[direction === 'verified' ? 'verifiedBy' : 'disputedBy'] || 0) + 1;
    }
    Store.set('verifies', verifies);
    Articles.update(articleId, patch);
    return true;
  }
};

/* ---- COMMENTS ---- */
const Comments = {
  get(articleId) {
    const all = Store.get('comments', {});
    return all[articleId] || [];
  },
  add(articleId, text) {
    const user = Auth.current();
    if (!user) { showToast('Sign in to comment', 'warning'); return null; }
    if (!text.trim()) return null;
    const all = Store.get('comments', {});
    if (!all[articleId]) all[articleId] = [];
    const comment = {
      id: uid('cmt_'), text: text.trim(),
      author: user.name, authorId: user.id, avatar: user.avatar,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      upvotes: 0
    };
    all[articleId].unshift(comment);
    Store.set('comments', all);
    Articles.update(articleId, { comments: (Articles.get(articleId)?.comments || 0) + 1 });
    return comment;
  }
};

/* ---- TOAST ---- */
function showToast(msg, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4100);
}

/* ---- FORMAT HELPERS ---- */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
function formatNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}
function trustBadge(status) {
  const map = {
    verified:   ['trust-verified',   'Verified'],
    reviewing:  ['trust-reviewing',  'Under Review'],
    disputed:   ['trust-disputed',   'Disputed'],
    unverified: ['trust-unverified', 'Unverified']
  };
  const [cls, label] = map[status] || map.unverified;
  return `<span class="trust-pill ${cls}">${label}</span>`;
}
function scoreBar(verified, disputed) {
  const total = (verified || 0) + (disputed || 0);
  if (total === 0) return '';
  const pct = Math.round(((verified || 0) / total) * 100);
  return `
    <div style="font-family:var(--mono);font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--gray);margin-bottom:3px;">
      Community Trust: ${pct}% (${verified} verified · ${disputed} disputed)
    </div>
    <div class="trust-bar-wrap"><div class="trust-bar-fill" style="width:${pct}%"></div></div>
  `;
}
function categoryColor(cat) {
  const map = {
    'Government & Politics': '#1a3a5c',
    'Corporate Misconduct': '#4a1a00',
    'Law Enforcement': '#2a2a4a',
    'Environmental': '#1a3a1a',
    'Health & Pharmaceuticals': '#3a1a3a',
    'Financial Fraud': '#4a3a00',
    'Military & Intelligence': '#2a3a2a',
    'Human Rights': '#4a1a1a',
    'Technology & Surveillance': '#1a2a4a',
    'Other': '#3a3a3a'
  };
  return map[cat] || '#3a3a3a';
}

/* ---- HEADER RENDER ---- */
function renderHeader(activePage) {
  const user = Auth.current();
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'submit.html', label: 'Submit' },
    { href: 'verify.html', label: 'Verify' },
  ];
  return `
    <div class="ticker-wrap">
      <div class="ticker-inner">
        ${Array(2).fill(`
          <span>All submissions encrypted</span>
          <span>Evidence reviewed by verified journalists</span>
          <span>Community-powered verification</span>
          <span>Anonymous submissions accepted</span>
          <span>No metadata stored without consent</span>
          <span>Whistleblower protection protocols active</span>
          <span>${Articles.all().length} stories published · ${Articles.all().reduce((s,a)=>s+a.upvotes,0).toLocaleString()} community votes cast</span>
        `).join('')}
      </div>
    </div>
    <header class="site-header">
      <div class="header-inner">
        <div class="header-left">
          <button class="nav-toggle" id="navToggle" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav-links">
            ${pages.map(p => `<li><a href="${p.href}" class="${activePage === p.href ? 'active' : ''}">${p.label}</a></li>`).join('')}
          </ul>
        </div>
        <a href="index.html" class="masthead-link">
          <div class="masthead">VERI<em>TAS</em></div>
          <div class="masthead-sub">Verified Truth Network</div>
        </a>
        <div class="header-right">
          ${user
            ? `<a href="profile.html" class="btn btn-sm">${user.avatar} · ${user.name.split(' ')[0]}</a>
               <button class="btn btn-sm" onclick="handleLogout()">Sign Out</button>`
            : `<button class="btn btn-sm" onclick="openAuthModal('login')">Sign In</button>
               <button class="btn btn-solid btn-sm" onclick="openAuthModal('register')">Join</button>`
          }
        </div>
      </div>
    </header>
    <nav class="mobile-nav" id="mobileNav">
      <button class="mobile-nav-close" id="mobileNavClose">✕</button>
      <ul>
        ${pages.map(p => `<li><a href="${p.href}">${p.label}</a></li>`).join('')}
        ${user
          ? `<li><a href="profile.html">Profile</a></li>
             <li><a href="#" onclick="handleLogout()">Sign Out</a></li>`
          : `<li><a href="#" onclick="openAuthModal('login')">Sign In</a></li>
             <li><a href="#" onclick="openAuthModal('register')">Join Veritas</a></li>`
        }
      </ul>
    </nav>
  `;
}

/* ---- FOOTER RENDER ---- */
function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="masthead">VERI<em style="color:var(--red);font-style:normal">TAS</em></div>
          <p>An independent platform for verified investigative journalism. We believe in evidence, transparency, and the public's right to know.</p>
        </div>
        <div class="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="index.html">Latest Stories</a></li>
            <li><a href="submit.html">Submit Evidence</a></li>
            <li><a href="verify.html">Verify Stories</a></li>
            <li><a href="profile.html">Your Account</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Standards</h4>
          <ul>
            <li><a href="#">Editorial Policy</a></li>
            <li><a href="#">Verification Process</a></li>
            <li><a href="#">Source Protection</a></li>
            <li><a href="#">Corrections</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Security</h4>
          <ul>
            <li><a href="#">SecureDrop</a></li>
            <li><a href="#">PGP Keys</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Legal Fund</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Veritas Network — Independent. Encrypted. Uncompromised.</span>
        <span>Not affiliated with any government, corporation, or political party.</span>
      </div>
    </footer>
  `;
}

/* ---- AUTH MODAL ---- */
function renderAuthModal() {
  return `
    <div class="modal-overlay" id="authModal">
      <div class="modal">
        <button class="modal-close" onclick="closeAuthModal()">✕</button>
        <div class="tabs">
          <button class="tab-btn active" id="loginTab" onclick="switchAuthTab('login')">Sign In</button>
          <button class="tab-btn" id="registerTab" onclick="switchAuthTab('register')">Join Veritas</button>
        </div>

        <div class="tab-panel active" id="loginPanel">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input class="form-input" type="email" id="loginEmail" placeholder="your@email.com" />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input class="form-input" type="password" id="loginPassword" placeholder="••••••••" />
          </div>
          <div id="loginError" class="form-error" style="margin-bottom:12px;"></div>
          <button class="btn btn-solid" style="width:100%;justify-content:center;" onclick="handleLogin()">Sign In</button>
          <p style="font-size:0.82rem;color:var(--gray);margin-top:14px;text-align:center;">
            Demo: use email <strong>demo@veritas.press</strong> password <strong>demo1234</strong>
          </p>
        </div>

        <div class="tab-panel" id="registerPanel">
          <div class="form-group">
            <label class="form-label">Full Name <span class="req">*</span></label>
            <input class="form-input" type="text" id="regName" placeholder="Your name" />
          </div>
          <div class="form-group">
            <label class="form-label">Email <span class="req">*</span></label>
            <input class="form-input" type="email" id="regEmail" placeholder="your@email.com" />
          </div>
          <div class="form-group">
            <label class="form-label">Password <span class="req">*</span></label>
            <input class="form-input" type="password" id="regPassword" placeholder="Min. 8 characters" />
          </div>
          <div id="regError" class="form-error" style="margin-bottom:12px;"></div>
          <button class="btn btn-solid" style="width:100%;justify-content:center;" onclick="handleRegister()">Create Account</button>
          <p style="font-size:0.78rem;color:var(--gray);margin-top:14px;line-height:1.5;">
            By joining, you agree to submit only evidence you believe to be authentic and to abide by our editorial standards.
          </p>
        </div>
      </div>
    </div>
  `;
}

function openAuthModal(tab = 'login') {
  document.getElementById('authModal').classList.add('open');
  switchAuthTab(tab);
}
function closeAuthModal() {
  document.getElementById('authModal').classList.remove('open');
}
function switchAuthTab(tab) {
  document.getElementById('loginTab').classList.toggle('active', tab === 'login');
  document.getElementById('registerTab').classList.toggle('active', tab === 'register');
  document.getElementById('loginPanel').classList.toggle('active', tab === 'login');
  document.getElementById('registerPanel').classList.toggle('active', tab === 'register');
}
function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const result = Auth.loginWithCredentials(email, password);
  if (result.error) {
    document.getElementById('loginError').textContent = result.error;
  } else {
    closeAuthModal();
    showToast('Welcome back, ' + result.user.name.split(' ')[0] + '!', 'success');
    setTimeout(() => window.location.reload(), 600);
  }
}
function handleRegister() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  if (!name || !email || password.length < 8) {
    document.getElementById('regError').textContent = 'Please fill all fields. Password must be 8+ characters.';
    return;
  }
  const result = Auth.register(name, email, password);
  if (result.error) {
    document.getElementById('regError').textContent = result.error;
  } else {
    closeAuthModal();
    showToast('Welcome to Veritas, ' + result.user.name.split(' ')[0] + '!', 'success');
    setTimeout(() => window.location.reload(), 600);
  }
}
function handleLogout() {
  Auth.logout();
  showToast('Signed out.', 'info');
  setTimeout(() => window.location.href = 'index.html', 600);
}

/* ---- MOBILE NAV ---- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mobileNav');
  const close = document.getElementById('mobileNavClose');
  if (toggle) toggle.addEventListener('click', () => nav.classList.add('open'));
  if (close) close.addEventListener('click', () => nav.classList.remove('open'));
}

/* ---- DEMO USER ---- */
function ensureDemoUser() {
  const users = Store.get('users', []);
  if (!users.find(u => u.email === 'demo@veritas.press')) {
    users.push({
      id: 'user_demo', name: 'Demo User', handle: 'demouser',
      email: 'demo@veritas.press', password: 'demo1234',
      role: 'contributor', verified: false, submissions: 0,
      reputation: 0, joined: new Date().toISOString().slice(0,10),
      bio: 'Demo account.', avatar: 'DU'
    });
    Store.set('users', users);
  }
}

/* ---- BOOTSTRAP ---- */
document.addEventListener('DOMContentLoaded', () => {
  initData();
  ensureDemoUser();
  initMobileNav();
  // Close modal on overlay click
  document.addEventListener('click', e => {
    const modal = document.getElementById('authModal');
    if (modal && e.target === modal) closeAuthModal();
  });
  // Keyboard close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAuthModal();
  });
});
