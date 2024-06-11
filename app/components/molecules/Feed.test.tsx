import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Feed from "./Feed";
import { RootState } from "../../store";
import { fetchUsers } from "../../store/userSlice";
import {
  fetchPosts,
  checkMorePosts,
  clearHighlight,
} from "../../store/postSlice";
import { useSelector } from "react-redux";

// Mock the useSelector hook
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

// Mock the useMockRealTimeUpdates hook
jest.mock("../../hooks/UseMockRealTimeUpdates", () => jest.fn());

// Mock fetchUsers, fetchPosts, checkMorePosts, and clearHighlight
jest.mock("../../store/userSlice", () => ({
  fetchUsers: jest.fn(),
}));

jest.mock("../../store/postSlice", () => ({
  fetchPosts: jest.fn(),
  checkMorePosts: jest.fn(),
  clearHighlight: jest.fn(),
}));

describe("Feed Component", () => {
  beforeEach(() => {
    // Mock the useSelector hook implementation
    (useSelector as unknown as jest.Mock).mockImplementation(
      (selector: (state: RootState) => any) =>
        selector({
          posts: {
            posts: [],
            page: 1,
            hasMore: true,
            highlightedPostId: 1,  // Set highlightedPostId to simulate a highlighted post
            post: null,
            status: "idle",
            error: null,
          },
          users: {
            users: [],
            user: null,
            status: "idle",
            error: null,
          },
        })
    );
  });

  it("should render the Feed component and fetch posts", () => {
    render(<Feed />);

    expect(screen.getByText("Feed")).toBeInTheDocument();
    expect(fetchUsers).toHaveBeenCalled();
    expect(fetchPosts).toHaveBeenCalledWith({ page: 1, limit: 10 });
    expect(checkMorePosts).toHaveBeenCalledWith({ page: 1, limit: 10 });
  });

  it("should display 'No more posts to show' message when there are no more posts", () => {
    // Mock the useSelector hook to return no more posts
    (useSelector as unknown as jest.Mock).mockImplementation(
      (selector: (state: RootState) => any) =>
        selector({
          posts: {
            posts: [],
            page: 1,
            hasMore: false,
            highlightedPostId: null,
            post: null,
            status: "idle",
            error: null,
          },
          users: {
            users: [],
            user: null,
            status: "idle",
            error: null,
          },
        })
    );

    render(<Feed />);

    expect(screen.getByText("No more posts to show")).toBeInTheDocument();
  });

  it("should clear the highlighted post after 3 seconds", async () => {
    // Mock the setTimeout function
    jest.useFakeTimers();

    render(<Feed />);

    // Fast-forward time by 3 seconds
    jest.advanceTimersByTime(3000);

    // Verify that clearHighlight action was dispatched
    // Wait for the clearHighlight to be called
    await waitFor(() => {
      expect(clearHighlight).toHaveBeenCalled();
    });

    // Restore the original setTimeout function
    jest.useRealTimers();
  });
});
