import { FormEvent, useEffect, useRef, useState } from "react";
import { Form } from "../Atoms/Form";
import { Input } from "../Atoms/Input";
import { Button } from "../Atoms/Button";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { useCommentFns } from "../../hooks/useCommentFns";

type AddCommentFormProps = {
  parentId?: string;
  onAdd?: () => void;
  onCancel?: () => void;
  autofocus?: boolean;
  className?: string;
};

export const AddCommentForm = ({
  parentId,
  onAdd,
  onCancel,
  className,
  autofocus,
}: AddCommentFormProps) => {
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);
  const { addComment } = useCommentFns();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment(value, parentId);
    setValue("");
    onAdd && onAdd();
  };
  useEffect(() => {
    autofocus && ref && ref.current && ref.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form
      onSubmit={handleSubmit}
      className={`min-w-[500px] flex-row fade-in items-center justify-center gap-4 ${className}`}
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Kommentar"
        className="flex-1 shadow-[0_0_1rem] shadow-highlight"
        ref={ref}
        required
      />
      <Button type="submit" className="bg-highlight p-2 text-xl">
        <IoCheckmark />
      </Button>
      {onCancel && (
        <Button className="p-2 text-xl" onClick={onCancel}>
          <IoClose />
        </Button>
      )}
    </Form>
  );
};
