const fs = require('fs');
const path = require('path');

// 页面名称列表
const pages = [
  'Qnzdgz',
  'Txl',
  'Dsj',
  'Jgys',
  'Jbzdgz',
  'Rlt',
  'Dyk',
  'Pingan',
  'Changtong',
  'Wenming',
  'Manyi'
];

// 目标文件夹路径（你项目里的 views 文件夹）
const viewsDir = path.join(__dirname, 'src/views');

// Vue 单文件组件模板
const vueTemplate = name => `
<template>
  <div class="${name.toLowerCase()}-page">
    <h1>${name} 页面</h1>
  </div>
</template>

<script>
export default {
  name: "${name}"
}
</script>

<style scoped>
.${name.toLowerCase()}-page {
  padding: 20px;
  color: #333;
}
</style>
`;

pages.forEach(name => {
  const filePath = path.join(viewsDir, `${name}.vue`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, vueTemplate(name), 'utf8');
    console.log(`✅ Created: ${filePath}`);
  } else {
    console.log(`⚠️ Already exists: ${filePath}`);
  }
});
