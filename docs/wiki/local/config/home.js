export const HOME_CARD_LIMIT = 8;
export const HOME_MAX_EXPANDED = 20;
export const CORE_FEATURED = ['交织时间线','托马斯','特蕾莎','萨比娜','弗兰茨'];
export const PREFACE_IDS = [];
export const APPENDIX_IDS = [];
export const HOME_SECTIONS = [
  {label:'交织叙事',subtitle:'十二个时间切片，并看同一阶段里的不同命运',type:'overview',featuredOnly:true,ids:['交织时间线'],limit:1},
  {label:'人物与关系',subtitle:'同一个世界，不同的选择',type:'person',featuredOnly:true,ids:['托马斯','特蕾莎','萨比娜','弗兰茨'],limit:4},
  {label:'核心概念',subtitle:'从抽象命题，返回具体处境',type:'concept',featuredOnly:false,limit:8},
];
export const SKIP_TYPES = new Set(['chapter','meta','list']);
