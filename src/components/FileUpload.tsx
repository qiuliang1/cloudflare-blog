import React, { useRef } from 'react';
import { Button, message, Space } from 'antd';
import { UploadOutlined, FileMarkdownOutlined } from '@ant-design/icons';
import { FileUploadProps, BlogPost } from '../types';

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.toLowerCase().endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const fileName = file.name.replace(/\.md$/i, '');
        
        const newPost: BlogPost = {
          id: Date.now(),
          title: fileName,
          content: content,
          date: new Date().toLocaleDateString('zh-CN'),
          fileName: file.name
        };
        
        onFileUpload(newPost);
        message.success(`成功上传文章：${fileName}`);
      };
      reader.readAsText(file);
    } else {
      message.error('请选择 .md 格式的文件');
    }
    
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Space>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".md"
        style={{ display: 'none' }}
      />
      <Button 
        type="primary"
        icon={<UploadOutlined />}
        onClick={handleUploadClick}
        size="middle"
      >
        上传 MD 文件
      </Button>
      <Space>
        <FileMarkdownOutlined style={{ color: '#1890ff' }} />
        <span style={{ color: '#8c8c8c', fontSize: 14 }}>
          支持 Markdown 格式文件
        </span>
      </Space>
    </Space>
  );
};

export default FileUpload;