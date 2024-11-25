import React from "react";
import { List } from "../../Atoms/List";
import { ListItem } from "../../Atoms/ListItem";
import CommentRow from "./CommentRow";
import { useComment } from "../../../hooks/useComment";
import equal from "fast-deep-equal";

type NestedCommentsProps = {
  commentIds: string[];
};

const _NestedComments: React.FC<NestedCommentsProps> = ({ commentIds }) => {
  return (
    <List>
      {commentIds.map((id) => (
        <CommentItem key={id} id={id} />
      ))}
    </List>
  );
};

const NestedComments = React.memo(_NestedComments, equal);

const CommentItem = ({ id }: { id: string }) => {
  const { comment, childrenIds } = useComment(id);
  if (!comment) {
    return null;
  }
  return (
    <ListItem key={comment.id} className="fade-scale-in">
      <CommentRow comment={comment} />
      {childrenIds.length > 0 && (
        <div className="ml-4 pl-4 border-l-2 border-l-highlight/50">
          <NestedComments commentIds={childrenIds} />
        </div>
      )}
    </ListItem>
  );
};

export default NestedComments;
