/* Preserve the existing authored timeline with the current Memex renderer.
 * Raw HTML is enabled only for this bundled, reviewed narrative page. It is
 * rejected if active/embed content or unsafe URL attributes are present.
 */
export default {
  init(core) {
    const scrollToSlice = () => {
      let hash;
      try { hash = decodeURIComponent(location.hash.slice(1)); } catch { return; }
      const match = hash.match(/^交织时间线\$(node-[a-z-]+)$/);
      if (match) document.getElementById(match[1])?.scrollIntoView({ block: 'start' });
    };
    document.addEventListener('wiki:pageRendered', () => requestAnimationFrame(scrollToSlice));
    window.addEventListener('hashchange', () => setTimeout(scrollToSlice, 120));
    core.hooks.onBeforeRender.add((body, context) => {
      const narrative = context?.pid === '交织时间线';
      if (narrative) {
        const active = /<\s*\/?\s*(script|iframe|object|embed|style|form|input|button)\b/i;
        const event = /\bon[a-z]+\s*=/i;
        const unsafe = /(?:href|src)\s*=\s*["']\s*(?:javascript|data|vbscript):/i;
        if (active.test(body) || event.test(body) || unsafe.test(body)) {
          throw new Error('Narrative page contains unsupported active content');
        }
      }
      core.md.set({ html: narrative });
      return body;
    });
    core.hooks.onAfterRender.add((html) => {
      core.md.set({ html: false });
      return html;
    });
  },
};
