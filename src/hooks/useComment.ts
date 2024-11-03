/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import {
  selectComment,
  selectCommentChildrenIds,
} from "../state/commentsSlice";
import { useAppSelector } from "../store/hooks";
import equal from "fast-deep-equal";

export const useComment = (id: string) => {
  const childrenSelector = useCallback(selectCommentChildrenIds(id), [id]);
  const childrenIds = useAppSelector(childrenSelector, equal);
  const commentSelector = useCallback(selectComment(id), [id]);
  const comment = useAppSelector(commentSelector, equal);
  return { childrenIds, comment };
};
