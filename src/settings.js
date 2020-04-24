// 将 vue-element-admin 的设置选项转移到 /src/config/index.js 中配置
// 避免多处配置引起混乱
const config = require('./config/index.js')
module.exports = config.Settings
