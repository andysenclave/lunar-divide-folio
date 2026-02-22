'use client';

import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion';
import BlogCard from '../../BlogCard';
import SubsectionTitle from './SubsectionTitle';
import type { BlogPost } from '../../../types';

interface BlogsSectionProps {
  blogs: BlogPost[];
  showTitle: boolean;
  isVisible: boolean;
}

const BlogsSection = ({
  blogs,
  showTitle,
  isVisible,
}: BlogsSectionProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <MotionDiv
          key="blogs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ marginBottom: '64px' }}
        >
          {showTitle && <SubsectionTitle icon="✍">Blogs</SubsectionTitle>}

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: '16px' }}
          >
            {blogs.map((blog, idx) => (
              <BlogCard key={blog.id} blog={blog} index={idx} />
            ))}
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default BlogsSection;
