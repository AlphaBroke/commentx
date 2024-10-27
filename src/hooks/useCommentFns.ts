import { newId, newIsoDate } from "../common/util";
import { addCommentDB, deleteCommentDB } from "../db/dbFns";
import { Comment } from "../db/db";
import { addCommentAction, deleteCommentAction } from "../state/commentsSlice";
import { useAppDispatch } from "../store/hooks";

export const useCommentFns = () => {
  const dispatch = useAppDispatch();
  const addComment = (text: string, parentId?: string) => {
    const newComment: Comment = {
      text,
      id: newId(),
      parentId,
      childrenIds: [],
      deleted: false,
      createdDate: newIsoDate(),
    };
    dispatch(addCommentAction(newComment));
    void addCommentDB(newComment);
  };
  const deleteComment = (id: string) => {
    dispatch(deleteCommentAction(id));
    void deleteCommentDB(id);
  };
  return { addComment, deleteComment };
};
