export interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  fileName?: string;
  excerpt?: string;
}

export interface SearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export interface SidebarProps {
  posts: BlogPost[];
  onPostSelect: (post: BlogPost) => void;
  selectedPost: BlogPost | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  collapsed: boolean;
}

export interface FileUploadProps {
  onFileUpload: (post: BlogPost) => void;
}

export interface PostViewerProps {
  post: BlogPost | null;
}