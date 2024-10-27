import React from "react";
import * as R from "ramda";
import { List } from "../../Atoms/List";
import { ListItem } from "../../Atoms/ListItem";
import CommentRow from "./CommentRow";
import { useCommentChildren } from "../../../hooks/useCommentChildren";
import { Comment } from "../../../db/db";

type NestedCommentsProps = {
  childrenComments: Comment[];
};

const NestedComments: React.FC<NestedCommentsProps> = ({ childrenComments }) => {
  return (
    <List>
      {childrenComments.map((childComment) => (
        <CommentItem key={childComment.id} comment={childComment} />
      ))}
    </List>
  );
};

export default React.memo(NestedComments, R.equals);

const CommentItem = ({ comment }: { comment: Comment }) => {
  const childrenComments = useCommentChildren(comment.id);
  if (!comment) {
    return null;
  }
  return (
    <ListItem key={comment.id} className="fade-scale-in">
      <CommentRow comment={comment} />
      {childrenComments.length > 0 && (
        <div className="ml-4 pl-4 border-l-2 border-l-highlight/50">
          <NestedComments childrenComments={childrenComments} />
        </div>
      )}
    </ListItem>
  );
};
