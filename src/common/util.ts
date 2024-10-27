import * as uuid from "uuid";
import { Comment } from "../db/db";

type anyVoidFn = () => void | Promise<void>;

export const newId = uuid.v4;
export const newIsoDate = () => new Date().toISOString();
export const showConfirm = async (message: string) =>
  new Promise((resolve, reject) => {
    if (window.confirm(message)) {
      resolve(undefined);
    } else {
      reject();
    }
  });
export const waitForConfirm = async (
  message: string,
  onConfirm: anyVoidFn = () => {},
  onCancel: anyVoidFn = () => {},
) => showConfirm(message).then(onConfirm).catch(onCancel);

export const compareByDate = (a: Comment, b: Comment) => {
  return a.createdDate.localeCompare(b.createdDate);
};
