import React from "react";
import * as R from "ramda";
import { List } from "../../Atoms/List";
import { ListItem } from "../../Atoms/ListItem";
import CommentRow from "./CommentRow";
import { useCommentChildren } from "../../../hooks/useCommentChildren";
import { Comment } from "../../../db/db";

type NestedCommentsProps = {
  children: Comment[];
};

const NestedComments: React.FC<NestedCommentsProps> = ({ children }) => {
  return (
    <List>
      {children.map((child) => (
        <CommentItem key={child.id} comment={child} />
      ))}
    </List>
  );
};

export default React.memo(NestedComments, R.equals);

const CommentItem = ({ comment }: { comment: Comment }) => {
  const children = useCommentChildren(comment.id);
  if (!comment) {
    return null;
  }
  return (
    <ListItem key={comment.id} className="fade-scale-in">
      <CommentRow comment={comment} />
      {children.length > 0 && (
        <div className="ml-4 pl-4 border-l-2 border-l-highlight/50">
          <NestedComments children={children} />
        </div>
      )}
    </ListItem>
  );
};
