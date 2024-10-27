import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Comment } from "../db/db";
import { compareByDate } from "../common/util";

const initialState = {
  comments: {} as Record<string, Comment>,
  roots: new Array<Comment>(),
};

export const commentsSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    addCommentAction: (state, action: PayloadAction<Comment>) => {
      const newComment: Comment = { ...action.payload };
      state.comments[action.payload.id] = newComment;

      // Add the comment id to its parent's childrenIds or roots
      if (action.payload.parentId) {
        const parent = state.comments[action.payload.parentId];
        if (parent) {
          state.comments[parent.id] = {
            ...parent,
            childrenIds: [...parent.childrenIds, action.payload.id],
          };
        }
      } else {
        state.roots = [...state.roots, action.payload];
      }
    },
    deleteCommentAction: (state, action: PayloadAction<string>) => {
      const comment = state.comments[action.payload];
      if (!comment) {
        return;
      }
      const newComment = { ...comment, deleted: true };
      state.comments[action.payload] = newComment;

      // Remove the comment id from its parent's childrenIds or roots
      if (comment.parentId) {
        const parent = state.comments[comment.parentId];
        if (parent) {
          state.comments[parent.id] = {
            ...parent,
            childrenIds: parent.childrenIds.filter(
              (id) => id !== action.payload,
            ),
          };
        }
      } else {
        state.roots = state.roots.filter((root) => root.id !== action.payload);
      }

      // Recursively delete all children
      const deleteChildren = (id: string) => {
        const comment = state.comments[id];
        if (!comment) {
          return;
        }
        state.comments[id] = { ...comment, deleted: true };
        for (const childId of comment.childrenIds) {
          deleteChildren(childId);
        }
      };
      if (comment.childrenIds) {
        for (const childId of comment.childrenIds) {
          deleteChildren(childId);
        }
      }
    },
    setStateAction: (
      state,
      action: PayloadAction<{
        comments: Record<string, Comment>;
        roots: Comment[];
      }>,
    ) => {
      state.comments = action.payload.comments;
      state.roots = action.payload.roots;
    },
  },
});

export const { addCommentAction, deleteCommentAction, setStateAction } =
  commentsSlice.actions;

export default commentsSlice.reducer;

export const selectRoots = (state: RootState) => state.comments.roots;
export const makeSelectCommentChildren = () =>
  createSelector(
    [
      (state: RootState, id: string) => state.comments.comments[id],
      (state: RootState) => state.comments.comments,
    ],
    (comment, comments) => {
      const children = [];
      for (const childId of comment?.childrenIds || []) {
        const child = comments[childId];
        if (child && !child.deleted) {
          children.push(child);
        }
      }
      const sortedChildren = [...children].sort(compareByDate);
      return sortedChildren;
    },
  );
