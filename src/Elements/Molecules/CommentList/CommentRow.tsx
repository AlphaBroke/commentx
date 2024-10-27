import React, { useState } from "react";
import * as R from "ramda";
import { type Comment } from "../../../db/db";
import { AddCommentForm } from "../AddCommentForm";
import { Button } from "../../Atoms/Button";
import { IoChatbubble, IoTrash } from "react-icons/io5";
import { waitForConfirm } from "../../../common/util";
import { useCommentFns } from "../../../hooks/useCommentFns";

const CommentRow = ({ comment }: { comment: Comment }) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4">
      <div
        className={`default-transition group relative flex items-center w-fit p-2 px-4 rounded-2xl rounded-bl-none gap-4 bg-gray-100 hover:shadow-[0_0_1rem] hover:shadow-highlight ${showInput ? "shadow-[0_0_1rem] shadow-highlight" : ""}`}
      >
        <p className="text-lg text-black">{comment.text}</p>
        <RowButtons
          showInput={showInput}
          setShowInput={setShowInput}
          comment={comment}
        />
      </div>
      {showInput && (
        <div className="h-12 relative">
          <AddCommentForm
            className="absolute top-1/2 -translate-y-1/2"
            onAdd={() => setShowInput(false)}
            onCancel={() => setShowInput(false)}
            parentId={comment.id}
            autofocus
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(CommentRow, R.equals);

type RowButtonsProps = {
  showInput: boolean;
  setShowInput: (value: boolean) => void;
  comment: Comment;
};

const RowButtons = ({ showInput, setShowInput, comment }: RowButtonsProps) => {
  const { deleteComment } = useCommentFns();
  if (showInput) return null;
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 translate-x-full -right-0 pl-4 flex transition-opacity gap-4 ${showInput ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}
    >
      <Button
        onClick={() => setShowInput(!showInput)}
        className={`p-2 text-xl ${!showInput ? "bg-highlight" : ""}`}
      >
        <IoChatbubble />
      </Button>
      <Button
        onClick={() => {
          waitForConfirm("Möchtest du den Kommentar wirklich löschen?", () =>
            deleteComment(comment.id),
          );
        }}
        className="p-2 text-xl"
      >
        <IoTrash />
      </Button>
    </div>
  );
};
