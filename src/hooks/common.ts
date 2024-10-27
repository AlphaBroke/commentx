import { compareByDate } from "../common/util";
import { Comment } from "../db/db";

export const buildCommentRecord = (comments: Comment[]) => {
  let commentRecord = {} as Record<string, Comment>;
  let roots: Comment[] = [];
  for (const comment of comments) {
    if (comment.deleted) {
      continue;
    }
    if (!comment.parentId) {
      roots.push(comment);
    }
    commentRecord[comment.id] = comment;
  }
  // Sort roots by date or possibly another criteria in the future
  roots.sort(compareByDate);
  return {
    commentRecord,
    roots,
  };
};
