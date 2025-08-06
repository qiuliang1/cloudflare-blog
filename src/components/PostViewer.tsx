import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography, Space, Tag, Divider, Empty } from 'antd';
import { CalendarOutlined, FileTextOutlined } from '@ant-design/icons';
import { PostViewerProps } from '../types';

const { Title, Text, Paragraph } = Typography;

const PostViewer: React.FC<PostViewerProps> = ({ post }) => {
  if (!post) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        padding: 32
      }}>
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 120 }}
          description={
            <Space direction="vertical" size={8}>
              <Title level={4} type="secondary">选择一篇文章开始阅读</Title>
              <Text type="secondary">从左侧菜单中选择文章，或上传新的 Markdown 文件</Text>
            </Space>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '32px 40px',
      maxWidth: 1000,
      margin: '0 auto',
      height: '100%',
      overflow: 'auto'
    }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <div>
          <Title level={1} style={{ marginBottom: 16 }}>
            {post.title}
          </Title>
          
          <Space size={16} wrap>
            <Space size={8}>
              <CalendarOutlined style={{ color: '#8c8c8c' }} />
              <Text type="secondary">{post.date}</Text>
            </Space>
            {post.fileName && (
              <Space size={8}>
                <FileTextOutlined style={{ color: '#8c8c8c' }} />
                <Tag color="blue">{post.fileName}</Tag>
              </Space>
            )}
          </Space>
        </div>
        
        <Divider />
        
        <div style={{ lineHeight: 1.8 }}>
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <Title level={2} style={{ marginTop: 32, marginBottom: 16 }}>
                  {children}
                </Title>
              ),
              h2: ({ children }) => (
                <Title level={3} style={{ marginTop: 24, marginBottom: 12 }}>
                  {children}
                </Title>
              ),
              h3: ({ children }) => (
                <Title level={4} style={{ marginTop: 20, marginBottom: 8 }}>
                  {children}
                </Title>
              ),
              p: ({ children }) => (
                <Paragraph style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
                  {children}
                </Paragraph>
              ),
              code: ({ children, className }) => {
                const isInline = !className || !className.includes('language-');
                return isInline ? (
                  <code style={{
                    backgroundColor: '#f5f5f5',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontSize: 14,
                    fontFamily: 'Monaco, Consolas, monospace',
                    color: '#d63384'
                  }}>
                    {children}
                  </code>
                ) : (
                  <pre style={{
                    backgroundColor: '#1f1f1f',
                    color: '#f8f8f2',
                    padding: 16,
                    borderRadius: 8,
                    overflow: 'auto',
                    marginBottom: 16,
                    fontSize: 14,
                    fontFamily: 'Monaco, Consolas, monospace'
                  }}>
                    <code>{children}</code>
                  </pre>
                );
              },
              blockquote: ({ children }) => (
                <div style={{
                  borderLeft: '4px solid #1890ff',
                  paddingLeft: 16,
                  paddingTop: 8,
                  paddingBottom: 8,
                  marginBottom: 16,
                  backgroundColor: '#f0f8ff',
                  fontStyle: 'italic',
                  color: '#595959'
                }}>
                  {children}
                </div>
              ),
              ul: ({ children }) => (
                <ul style={{ 
                  paddingLeft: 24, 
                  marginBottom: 16,
                  lineHeight: 1.8
                }}>
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol style={{ 
                  paddingLeft: 24, 
                  marginBottom: 16,
                  lineHeight: 1.8
                }}>
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li style={{ marginBottom: 4, color: '#333' }}>
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong style={{ fontWeight: 600 }}>
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em style={{ fontStyle: 'italic', color: '#1890ff' }}>
                  {children}
                </em>
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </Space>
    </div>
  );
};

export default PostViewer;