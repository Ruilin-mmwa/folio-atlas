// hero.config.js — Hero 背景 SVG 设计
// 不能承受的生命之轻 — 朱砂雅韵主题 (#33)

export function buildHeroBackground() {
  return `<svg class="hero-cosmos" xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 250 90" preserveAspectRatio="xMidYMid slice"
    width="100%" height="100%"
    style="background: var(--bg)">
    <defs>
      <linearGradient id="feather-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.08"/>
      </linearGradient>
      <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--border)" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="var(--border)" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <!-- 地面 — 书脊地平线 -->
    <line x1="30" y1="72" x2="220" y2="72" stroke="var(--border)" stroke-width="0.3" stroke-opacity="0.5"/>
    <rect x="60" y="72" width="130" height="2.5" rx="1" fill="var(--border)" opacity="0.25"/>

    <!-- 羽毛主体 — 轻的象征 -->
    <g transform="translate(125, 34)" opacity="0.82">
      <!-- 羽轴 -->
      <line x1="0" y1="-22" x2="0" y2="24" stroke="var(--accent)" stroke-width="0.55" stroke-linecap="round"/>
      <!-- 左羽片 -->
      <path d="M0 -18 Q-14 -14 -20 -4 Q-24 4 -18 12 L0 8 Z" fill="url(#feather-grad)"/>
      <!-- 右羽片 -->
      <path d="M0 -18 Q14 -12 20 -2 Q24 6 18 14 L0 8 Z" fill="url(#feather-grad)" opacity="0.75"/>
      <!-- 羽尖细线 -->
      <line x1="0" y1="-22" x2="0" y2="-26" stroke="var(--accent)" stroke-width="0.28" stroke-opacity="0.5"/>
    </g>

    <!-- 飘逸曲线 — 轻与重的张力 -->
    <path d="M18 54 Q60 34 94 52 Q128 72 160 48 Q190 24 232 42"
      fill="none" stroke="var(--accent)" stroke-width="0.22" stroke-opacity="0.22"
      stroke-dasharray="3 5"/>

    <!-- 第二道曲线，略低，产生渡海/自由联想 -->
    <path d="M10 62 Q48 44 80 60 Q115 78 148 58 Q182 36 240 50"
      fill="none" stroke="var(--accent)" stroke-width="0.16" stroke-opacity="0.14"/>

    <!-- 散点 — 星尘/思想碎片 -->
    <circle cx="0" cy="0" r="0.45" fill="var(--accent)" opacity="0.25"/>
    <circle cx="0" cy="0" r="0.35" fill="var(--accent)" opacity="0.18"/>
    <circle cx="0" cy="0" r="0.5" fill="var(--accent)" opacity="0.15"/>
    <g transform="translate(42, 28)">
      <circle cx="0" cy="0" r="0.45" fill="var(--accent)" opacity="0.25"/>
    </g>
    <g transform="translate(95, 18)">
      <circle cx="0" cy="0" r="0.35" fill="var(--accent)" opacity="0.22"/>
    </g>
    <g transform="translate(168, 22)">
      <circle cx="0" cy="0" r="0.4" fill="var(--accent)" opacity="0.2"/>
    </g>
    <g transform="translate(205, 32)">
      <circle cx="0" cy="0" r="0.35" fill="var(--accent)" opacity="0.18"/>
    </g>
    <g transform="translate(72, 42)">
      <circle cx="0" cy="0" r="0.3" fill="var(--accent)" opacity="0.15"/>
    </g>
    <g transform="translate(178, 44)">
      <circle cx="0" cy="0" r="0.5" fill="var(--accent)" opacity="0.14"/>
    </g>
    <g transform="translate(130, 48)">
      <circle cx="0" cy="0" r="0.38" fill="var(--accent)" opacity="0.12"/>
    </g>
    <g transform="translate(52, 50)">
      <circle cx="0" cy="0" r="0.4" fill="var(--accent)" opacity="0.1"/>
    </g>
  </svg>`;
}

export function startHeroAnimation() {
  // CSS animation via keyframes injected into document
  const style = document.createElement('style');
  style.textContent = `
    @keyframes feather-drift {
      0%, 100% { transform: translate(125px, 34px); }
      25% { transform: translate(126px, 32px); }
      50% { transform: translate(124px, 35px); }
      75% { transform: translate(127px, 33px); }
    }
    @keyframes particle-fade {
      0%, 100% { opacity: 0.12; }
      50% { opacity: 0.28; }
    }
    .hero-svg-feather { animation: feather-drift 8s ease-in-out infinite; }
    .hero-svg-particle { animation: particle-fade 4s ease-in-out infinite; }
  `;
  document.head.appendChild(style);
}
