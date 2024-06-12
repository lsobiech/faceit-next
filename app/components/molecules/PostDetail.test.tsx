import React from 'react';
import { render, screen } from '@testing-library/react';
import PostDetail from './PostDetail';
import { Post } from '../../interfaces';

const mockPost: Post = {
  id: 1,
  title: "Test Post",
  body: "This is a test post.",
  userId: 0,
};

describe('PostDetail Component', () => {
  it('should render the home link', () => {
    render(<PostDetail post={mockPost} />);
    expect(screen.getByText('< Home')).toBeInTheDocument();
    expect(screen.getByText('< Home').closest('a')).toHaveAttribute('href', '/');
  });

  it('should render the post title', () => {
    render(<PostDetail post={mockPost} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });

  it('should render the post body', () => {
    render(<PostDetail post={mockPost} />);
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
  });

  it("should render correctly with author", () => {
    const { container } = render(<PostDetail post={mockPost} />);
    expect(container).toMatchSnapshot();
  });
});
