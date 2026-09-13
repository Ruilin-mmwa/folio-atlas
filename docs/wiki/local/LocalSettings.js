// LocalSettings.js — wiki 本地配置
// 模板位于 $MEMEX_ROOT/docs/dist/LocalSettings.js，复制到 docs/wiki/local/ 后修改。

export const wgSiteName = '书境 FolioAtlas';

// plugins.json 中的插件（不论 core: true/false）默认全部加载，不需要在此列出
// 才能启用——启用与否只看 wgDisabledPlugins（下方）。
//
// wgEnabledPlugins 只用于追加 plugins.json 清单之外的本地实验插件：
// 每项是一个 id，约定加载 local/plugins/<id>/index.js（RFC-stoic-0006）。
export const wgEnabledPlugins = [
  // 本地修复：infobox 的「核心关系」（relations 对象数组）被共享插件渲染成 [object Object]
  // 见 local/plugins/infobox-relations/index.js（RFC-stoic-0006 本地插件机制）
  'infobox-relations',
  'trusted-narrative',
];

// 显式禁用 plugins.json 清单里的某个插件（opt-out）。
// 地图插件无专项地理数据，禁用。
export const wgDisabledPlugins = ['place-map','route-map','geomap','recent','diff','pn-citation','semantic-history','want-button'];
