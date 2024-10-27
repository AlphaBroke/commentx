import { Comment, dbTyped } from "./db";

export const addCommentDB = async (comment: Comment) => {
  const newComment: Comment = { ...comment };
  await dbTyped.comments.put(newComment);

  // Update the parent's childrenIds
  if (comment.parentId) {
    const parent = await dbTyped.comments.get(comment.parentId);
    if (parent) {
      await dbTyped.comments.update(parent.id, {
        childrenIds: [...parent.childrenIds, comment.id],
      });
    }
  }
};

const deleteChildComments = async (id: string) => {
  const comment = await dbTyped.comments.get(id);
  if (comment) {
    comment.deleted = true;
    await dbTyped.comments.put(comment);
    if (comment.childrenIds.length > 0) {
      for (const childId of comment.childrenIds) {
        await deleteChildComments(childId);
      }
    }
  }
};

export const deleteCommentDB = async (id: string) => {
  const comment = await dbTyped.comments.get(id);
  if (!comment) {
    return;
  }
  const newComment = { ...comment, deleted: true };
  await dbTyped.comments.update(id, newComment);

  // Remove the comment id from its parent's childrenIds
  if (comment.parentId) {
    const parent = await dbTyped.comments.get(comment.parentId);
    if (parent) {
      await dbTyped.comments.update(parent.id, {
        childrenIds: parent.childrenIds.filter((id) => id !== comment.id),
      });
    }
  }

  // Recursively delete all children
  if (comment.childrenIds.length > 0) {
    for (const childId of comment.childrenIds) {
      await deleteChildComments(childId);
    }
  }
};
