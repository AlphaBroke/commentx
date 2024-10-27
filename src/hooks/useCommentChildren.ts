import { makeSelectCommentChildren } from "../state/commentsSlice";
import { useAppSelector } from "../store/hooks";

export const useCommentChildren = (id: string) => {
  const selectCommentChildren = makeSelectCommentChildren();
  const children = useAppSelector((state) => selectCommentChildren(state, id));
  return children;
};
