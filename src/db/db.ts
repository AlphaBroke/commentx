import Dexie, { Table } from "dexie";

export type Comment = {
  id: string;
  createdDate: string;
  text: string;
  parentId?: string;
  childrenIds: string[];
  deleted?: boolean;
};

export const db = new Dexie("Comments");

db.version(1).stores({
  comments: "id, createdDate, text, parentId, deleted",
});

interface Comments extends Dexie {
  comments: Table<Comment, string>;
}

export const dbTyped = db as Comments;

dbTyped.comments = db.table("comments");
