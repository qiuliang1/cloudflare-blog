// worker/index.ts
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App'; // 导入您的 App 组件

export default {
  async fetch(request: Request, env: Env) {
    // 服务端渲染 React 组件为 HTML 字符串
    const appHtml = ReactDOMServer.renderToString(React.createElement(App));
    
    // 返回完整的 HTML 响应
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>React on Cloudflare</title>
          <link rel="stylesheet" href="/index.css"> <!-- 引入样式 -->
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script src="/client.js"></script> <!-- 客户端脚本 -->
        </body>
      </html>
    `;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  },
};