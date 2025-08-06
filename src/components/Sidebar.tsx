import React from 'react';
import { Input, List, Typography, Space, Empty } from 'antd';
import { SearchOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons';
import { SidebarProps } from '../types';

const { Title, Text } = Typography;

const Sidebar: React.FC<SidebarProps> = ({ 
  posts, 
  onPostSelect, 
  selectedPost, 
  searchTerm, 
  onSearchChange,
  collapsed
}) => {
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      height: '100%', 
      padding: collapsed ? '16px 8px' : '16px 20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {!collapsed && (
        <>
          <Title level={4} style={{ 
            color: 'white', 
            marginBottom: 16, 
            textAlign: 'center' 
          }}>
            📚 博客文章
          </Title>
          
          <Input
            placeholder="搜索文章..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ marginBottom: 16 }}
            allowClear
          />
        </>
      )}
      
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        paddingRight: collapsed ? 0 : 4
      }}>
        {filteredPosts.length === 0 ? (
          !collapsed && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Text style={{ color: '#ffffff80' }}>
                  {searchTerm ? '没有找到匹配的文章' : '暂无文章'}
                </Text>
              }
            />
          )
        ) : (
          <List
            dataSource={filteredPosts}
            renderItem={(post) => (
              <List.Item
                key={post.id}
                onClick={() => onPostSelect(post)}
                style={{
                  cursor: 'pointer',
                  padding: collapsed ? '8px 4px' : '12px 16px',
                  margin: '0 0 8px 0',
                  borderRadius: 6,
                  backgroundColor: selectedPost?.id === post.id 
                    ? 'rgba(24, 144, 255, 0.1)' 
                    : 'transparent',
                  border: selectedPost?.id === post.id 
                    ? '1px solid #1890ff' 
                    : '1px solid transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (selectedPost?.id !== post.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPost?.id !== post.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ width: '100%' }}>
                  {collapsed ? (
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      color: selectedPost?.id === post.id ? '#1890ff' : '#ffffff80'
                    }}>
                      <FileTextOutlined style={{ fontSize: 16 }} />
                    </div>
                  ) : (
                    <Space direction="vertical" size={4} style={{ width: '100%' }}>
                      <Text 
                        strong 
                        style={{ 
                          color: selectedPost?.id === post.id ? '#1890ff' : 'white',
                          fontSize: 14
                        }}
                        ellipsis={{ tooltip: post.title }}
                      >
                        {post.title}
                      </Text>
                      <Space size={8}>
                        <CalendarOutlined style={{ 
                          color: '#ffffff60', 
                          fontSize: 12 
                        }} />
                        <Text style={{ 
                          color: '#ffffff60', 
                          fontSize: 12 
                        }}>
                          {post.date}
                        </Text>
                      </Space>
                      <Text 
                        style={{ 
                          color: '#ffffff80', 
                          fontSize: 12,
                          lineHeight: 1.4
                        }}
                        ellipsis={{ tooltip: post.content.substring(0, 200) }}
                      >
                        {post.content.substring(0, 100)}...
                      </Text>
                    </Space>
                  )}
                </div>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;