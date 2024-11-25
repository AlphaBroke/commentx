import { Comment } from "../db/db";

export const buildCommentRecord = (comments: Comment[]) => {
  let commentRecord = {} as Record<string, Comment>;
  let rootIds: string[] = [];
  for (const comment of comments) {
    if (comment.deleted) {
      continue;
    }
    if (!comment.parentId) {
      rootIds.push(comment.id);
    }
    commentRecord[comment.id] = comment;
  }
  return {
    commentRecord,
    rootIds,
  };
};
