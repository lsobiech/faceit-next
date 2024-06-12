import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PostPreview from "./PostPreview";
import { Post, User } from "../../interfaces";

const mockPost: Post = {
  id: 1,
  title: "Test Post",
  body: "This is a test post.",
  userId: 0,
};

const mockAuthor: User = {
  id: 1,
  name: "John Doe",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

describe("PostPreview Component", () => {
  it("should render with author information", () => {
    render(
      <PostPreview post={mockPost} author={mockAuthor} isHighlighted={false} />
    );
    expect(screen.getByText(mockAuthor.name)).toBeInTheDocument();
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockPost.body))).toBeInTheDocument();
  });

  it("should render without author information", () => {
    render(<PostPreview post={mockPost} isHighlighted={false} />);
    expect(
      screen.getByText(/No author information available/i)
    ).toBeInTheDocument();
  });

  it("should highlight when isHighlighted is true", async () => {
    render(
      <PostPreview post={mockPost} author={mockAuthor} isHighlighted={true} />
    );
    const postPreview = screen.getByTestId("post-preview");
    expect(postPreview).toHaveClass("bg-yellow-100");
    await waitFor(() => expect(postPreview).toHaveClass("bg-yellow-100"));
  });

  it("should not highlight when isHighlighted is false", () => {
    render(
      <PostPreview
        post={mockPost}
        author={mockAuthor as User}
        isHighlighted={false}
      />
    );
    const postPreview = screen.getByTestId("post-preview");
    expect(postPreview).not.toHaveClass("bg-yellow-100");
  });

  it("should render correctly with given props and create snapshot", () => {
    const { asFragment } = render(
      <PostPreview post={mockPost} author={mockAuthor} isHighlighted={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
