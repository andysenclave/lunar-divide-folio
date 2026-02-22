'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useHoverState } from '../../hooks';
import type { BlogPost } from '../../types';
import { BlogPreview, BlogInfo, BlogModal } from './components';

interface BlogCardProps {
  blog: BlogPost;
  index: number;
}

const BlogCard = ({ blog, index }: BlogCardProps) => {
  const { colors } = useTheme();
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <MotionDiv
        className="overflow-hidden"
        style={{
          background: `${colors.bgSecondary}95`,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '10px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => setIsModalOpen(true)}
      >
        <BlogPreview
          image={blog.image}
          title={blog.title}
          isHovered={isHovered}
        />
        <BlogInfo title={blog.title} date={blog.date} />
      </MotionDiv>

      {isModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <BlogModal blog={blog} onClose={() => setIsModalOpen(false)} />,
          document.body,
        )}
    </>
  );
};

export default BlogCard;
