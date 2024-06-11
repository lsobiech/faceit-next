import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostDetail from './PostDetail'; // Adjust the import path as necessary
import { Post, User } from '../../interfaces'; // Adjust the import path as necessary

// Mock data
const mockPost: Post = {
  id: 1,
  title: 'Mock Post Title',
  body: 'This is a mock post body.',
  userId: 0
};

const mockAuthor: User = {
  id: 1,
  name: 'Mock Author Name',
  email: 'mockauthor@example.com',
  username: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: ''
    }
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: ''
  }
};

describe('PostDetail Component', () => {
  it('should render the home link', () => {
    render(<PostDetail post={mockPost} />);
    expect(screen.getByText('< Home')).toBeInTheDocument();
    expect(screen.getByText('< Home').closest('a')).toHaveAttribute('href', '/');
  });

  it('should render the author details if author is provided', () => {
    render(<PostDetail post={mockPost} author={mockAuthor} />);
    expect(screen.getByAltText(`Avatar of ${mockAuthor.name}`)).toBeInTheDocument();
    expect(screen.getByText(mockAuthor.name)).toBeInTheDocument();
  });

  it('should render the post details if post is provided', () => {
    render(<PostDetail post={mockPost} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
  });

  it('should not render author details if author is not provided', () => {
    render(<PostDetail post={mockPost} />);
    expect(screen.queryByAltText(`Avatar of ${mockAuthor.name}`)).not.toBeInTheDocument();
    expect(screen.queryByText(mockAuthor.name)).not.toBeInTheDocument();
  });

  it('should render correctly without author', () => {
    const { container } = render(<PostDetail post={mockPost} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with author', () => {
    const { container } = render(<PostDetail post={mockPost} author={mockAuthor} />);
    expect(container).toMatchSnapshot();
  });
});
