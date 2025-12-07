import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// 允许跨域，支持 JSON 和 文本请求体
app.use(cors());
app.use(express.json());
app.use(express.text());

// 静态资源服务：让浏览器能访问到 dist 目录下的 SDK
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.static(__dirname));

// 接收错误上报的接口
app.post('/error-report', (req, res) => {
  console.log('\n🚨 ================= 收到错误上报 ================= 🚨');
  console.log('时间:', new Date().toLocaleString());
  // 如果是 sendBeacon 发来的，通常是 text/plain，尝试解析 JSON
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      console.warn('无法解析上报数据:', body);
    }
  }
  console.log(JSON.stringify(body, null, 2));
  console.log('-----------------------------------------------------\n');
  res.status(200).send('ok');
});

app.listen(port, () => {
  console.log(`\n🚀 测试服务已启动！`);
  console.log(`👉 请访问: http://localhost:${port}/index.html\n`);
});
