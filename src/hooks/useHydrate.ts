import { useEffect } from "react";
import { dbTyped } from "../db/db";
import { setStateAction } from "../state/commentsSlice";
import { useAppDispatch } from "../store/hooks";
import { buildCommentRecord } from "./common";

export const useHydrate = () => {
  const dispatch = useAppDispatch();
  const hydrate = async () => {
    try {
      const comments = await dbTyped.comments.toArray();
      const { commentRecord, roots } = buildCommentRecord(comments);
      dispatch(setStateAction({ comments: commentRecord, roots }));
    } catch (error) {
      console.error("Failed to hydrate comments:", error);
    }
  };
  useEffect(() => {
    void hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
