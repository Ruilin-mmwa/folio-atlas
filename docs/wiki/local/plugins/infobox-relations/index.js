/* infobox-relations — 本地修复：infobox 的「核心关系」字段渲染为 [object Object]
 *
 * 根因：共享插件 public/plugins/infobox/index.js 的通用数组处理
 *   val.map(v => linkifyValue(v)).join(' · ')
 * 只支持标量数组；而 person schema 的 relations 是 {name, relation} 对象数组，
 * linkifyValue 对对象 String() 后即得 [object Object]。
 *
 * 本插件通过 onInfobox hook 找到核心关系行，用 front.relations 重写为
 * 「名字链接 + 关系描述」。
 * 不修改共享引擎；本地修复仅对本 wiki 生效（RFC-stoic-0006）。
 */
import { FIELD_LABELS } from '@wiki/local/config/infobox.js';

const RELATION_LABEL = (FIELD_LABELS && FIELD_LABELS.relations) || '核心关系';

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/* 复刻 registry.js resolvePageId 的解析逻辑（避免依赖引擎模块的部署路径） */
function resolvePageId(raw, registry) {
  if (!raw || !registry?.pages) return null;
  if (raw in registry.pages) return [raw, registry.pages[raw]];
  if (registry.alias_index && raw in registry.alias_index) {
    const pid = registry.alias_index[raw];
    return [pid, registry.pages[pid]];
  }
  if (raw.includes('/')) {
    const tail = raw.split('/', 2)[1];
    if (tail in registry.pages) return [tail, registry.pages[tail]];
    if (registry.alias_index && tail in registry.alias_index) {
      const pid = registry.alias_index[tail];
      return [pid, registry.pages[pid]];
    }
  }
  return null;
}

export default {
  async init(core) {
    core.hooks.onInfobox.add((rows, front) => {
      const rels = front?.relations;
      if (!Array.isArray(rels) || rels.length === 0) return rows;
      return rows.map((row) => {
        if (typeof row !== 'string') return row;
        const m = row.match(/^<tr><th>([^<]*)<\/th><td>([\s\S]*)<\/td><\/tr>$/);
        if (!m) return row;
        const th = m[1];
        const td = m[2];
        const isRelationRow = th === RELATION_LABEL || td.includes('[object Object]');
        if (!isRelationRow) return row;
        const cells = rels
          .map((rel) => {
            const isObj = rel && typeof rel === 'object';
            const name = isObj ? (rel.name ?? '') : rel;
            const relation = isObj ? (rel.relation ?? '') : '';
            if (!name) return null;
            const resolved = resolvePageId(String(name), core.registry);
            const nameHtml = resolved
              ? `<a href="#${encodeURIComponent(resolved[0])}">${esc(String(name))}</a>`
              : esc(String(name));
            return relation
              ? `${nameHtml} <span class="ib-rel">${esc(String(relation))}</span>`
              : nameHtml;
          })
          .filter(Boolean);
        return `<tr><th>${esc(th)}</th><td>${cells.join(' · ')}</td></tr>`;
      });
    });
  },
};
