// WIKI_LANG = zh
// 回填于 BRH58 — 覆盖通用字段 + 各类型专属字段
export const FIELD_LABELS = {
  // 通用字段
  label: '名称', description: '简述',
  // person 专属
  person_role: '角色', fictional: '虚构/历史', relations: '核心关系',
  first_appearance: '首现', last_appearance: '末现',
  // event 专属
  event_type: '事件类型', event_date: '时间', location: '地点',
  participants: '参与人物', key_pns: '关键段落', preceding: '前序事件', following: '后续事件',
  // place 专属
  place_type: '地点类型', country: '国家',
  related_characters: '关联人物', related_events: '关联事件',
  // organization 专属
  org_type: '组织类型', related_characters: '关联人物', related_events: '关联事件',
  // concept 专属
  concept_origin: '概念出处', concept_carriers: '人物载体', related_concepts: '关联概念',
  // list 专属
  list_type: '列表类别', list_scope: '列表范围',
};
export const INFOBOX_SKIP = new Set(['id', 'type', 'quality', 'tags', 'coords', 'aliases', 'image']);
export const FIELD_GROUPS = [
  { label: '基本信息', fields: ['label', 'description'] },
  { label: '人物信息', fields: ['person_role', 'fictional', 'relations', 'first_appearance', 'last_appearance'] },
  { label: '事件信息', fields: ['event_type', 'event_date', 'location', 'participants', 'key_pns', 'preceding', 'following'] },
  { label: '地点信息', fields: ['place_type', 'country', 'related_characters', 'related_events'] },
  { label: '组织信息', fields: ['org_type', 'related_characters', 'related_events'] },
  { label: '概念信息', fields: ['concept_origin', 'concept_carriers', 'related_concepts'] },
  { label: '列表信息', fields: ['list_type', 'list_scope'] },
];
