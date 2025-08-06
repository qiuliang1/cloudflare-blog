import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from './components/Sidebar';
import PostViewer from './components/PostViewer';
import FileUpload from './components/FileUpload';
import { BlogPost } from './types';

const { Header, Sider, Content } = Layout;

function App() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: '欢迎使用博客系统',
      content: `# 欢迎使用博客系统

## 功能特点

这是一个基于 React + TypeScript + Ant Design 构建的博客系统，具有以下功能：

- 📝 支持 Markdown 文件上传
- 🔍 文章搜索功能
- 📱 响应式设计
- 🎨 Ant Design 美观界面

## 如何使用

1. 点击"上传 MD 文件"按钮上传你的 Markdown 文件
2. 使用搜索框快速找到想要阅读的文章
3. 点击左侧文章列表中的任意文章开始阅读

## Markdown 支持

支持标准的 Markdown 语法：

- **粗体文本**
- *斜体文本*
- \`代码片段\`
- [链接](https://example.com)

> 这是一个引用块

\`\`\`javascript
// 代码块示例
console.log('Hello, World!');
\`\`\`

开始上传你的第一篇文章吧！`,
      date: new Date().toLocaleDateString('zh-CN'),
    }
  ]);
  
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(posts[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleFileUpload = (newPost: BlogPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setSelectedPost(newPost);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        width={350}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Sidebar
          posts={posts}
          onPostSelect={handlePostSelect}
          selectedPost={selectedPost}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          collapsed={collapsed}
        />
      </Sider>
      
      <Layout style={{ marginLeft: collapsed ? 80 : 350 }}>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer,
          borderBottom: '1px solid #f0f0f0'
        }}>
          <FileUpload onFileUpload={handleFileUpload} />
        </Header>
        
        <Content style={{ 
          margin: 0, 
          overflow: 'auto',
          background: colorBgContainer 
        }}>
          <PostViewer post={selectedPost} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
