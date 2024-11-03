import React from "react";
import { ContentContainer } from "../../Atoms/ContentContainer";
import { Message } from "../../Atoms/Message";
import NestedComments from "./NestedComments";
import { AddCommentForm } from "../AddCommentForm";
import { useAppSelector } from "../../../store/hooks";
import { selectRootIds } from "../../../state/commentsSlice";
import equal from "fast-deep-equal";

export const CommentList: React.FC = () => {
  const roots = useAppSelector(selectRootIds, equal);
  return (
    <ContentContainer>
      {roots.length === 0 ? (
        <Message text="Keine Kommentare vorhanden" />
      ) : (
        <div className="pt-4 pb-44">
          <NestedComments commentIds={roots} />
        </div>
      )}
      <AddCommentForm className="fixed flex w-2/3 bottom-4 left-1/2 -translate-x-1/2" />
    </ContentContainer>
  );
};
