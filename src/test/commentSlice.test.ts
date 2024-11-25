import commentsReducer, {
  addCommentAction,
  deleteCommentAction,
  setStateAction,
} from "../state/commentsSlice";
import { Comment } from "../db/db";

describe("commentsSlice", () => {
  describe("addCommentAction", () => {
    it("should add a root comment", () => {
      const initialState = {
        comments: {} as Record<string, Comment>,
        rootIds: [] as string[],
      };

      const newComment: Comment = {
        id: "1",
        parentId: undefined,
        childrenIds: [],
        deleted: false,
        createdDate: "2021-09-01T00:00:00.000Z",
        text: "This is a comment",
      };

      const newState = commentsReducer(
        initialState,
        addCommentAction(newComment),
      );

      expect(newState.comments["1"]).toEqual(newComment);
      expect(newState.rootIds).toContainEqual(newComment.id);
    });

    it("should add a child comment and update parent", () => {
      const parentId = "1";
      const parentComment: Comment = {
        id: parentId,
        parentId: undefined,
        childrenIds: [],
        deleted: false,
        createdDate: "2021-09-01T00:00:00.000Z",
        text: "This is a comment",
      };

      const initialState = {
        comments: { "1": parentComment },
        rootIds: [parentId],
      };

      const childComment: Comment = {
        id: "2",
        parentId: "1",
        childrenIds: [],
        deleted: false,
        createdDate: "2021-09-01T00:00:00.000Z",
        text: "This is a comment",
      };

      const newState = commentsReducer(
        initialState,
        addCommentAction(childComment),
      );

      expect(newState.comments["2"]).toEqual(childComment);
      expect(newState.comments["1"].childrenIds).toContain("2");
    });
  });

  describe("deleteCommentAction", () => {
    it("should delete a root comment", () => {
      const rootId = "1";
      const rootComment: Comment = {
        id: rootId,
        parentId: undefined,
        childrenIds: [],
        deleted: false,
        createdDate: "2021-09-01T00:00:00.000Z",
        text: "This is a comment",
      };

      const initialState = {
        comments: { "1": rootComment },
        rootIds: [rootId],
      };

      const newState = commentsReducer(initialState, deleteCommentAction("1"));

      expect(newState.comments["1"].deleted).toBe(true);
      expect(newState.rootIds).not.toContainEqual(rootComment);
    });

    it("should delete a child comment and update parent", () => {
      const parentCommentId = "1";
      const parentComment: Comment = {
        id: parentCommentId,
        parentId: undefined,
        childrenIds: ["2"],
        deleted: false,
        createdDate: "2021-09-01T00:00:00.000Z",
        text: "This is a comment",
      };

      const childComment: Comment = {
        id: "2",
        parentId: "1",
        childrenIds: [],
        deleted: false,
        createdDate: "2021-09-01T00:00:00.000Z",
        text: "This is a comment",
      };

      const initialState = {
        comments: { "1": parentComment, "2": childComment },
        rootIds: [parentCommentId],
      };

      const newState = commentsReducer(initialState, deleteCommentAction("2"));

      expect(newState.comments["2"].deleted).toBe(true);
      expect(newState.comments["1"].childrenIds).not.toContain("2");
    });

    it("should recursively delete child comments", () => {
      const parentCommentId = "1";
      const parentComment: Comment = {
        id: parentCommentId,
        parentId: undefined,
        childrenIds: ["2"],
        deleted: false,
        createdDate: "2021-09-01T00:00:00.000Z",
        text: "This is a comment",
      };

      const childComment: Comment = {
        id: "2",
        parentId: "1",
        childrenIds: ["3"],
        deleted: false,
        createdDate: "2021-09-01T00:00:00.000Z",
        text: "This is a comment",
      };

      const grandChildComment: Comment = {
        id: "3",
        parentId: "2",
        childrenIds: [],
        deleted: false,
        createdDate: "2021-09-01T00:00:00.000Z",
        text: "This is a comment",
      };

      const initialState = {
        comments: {
          "1": parentComment,
          "2": childComment,
          "3": grandChildComment,
        },
        rootIds: [parentCommentId],
      };

      const newState = commentsReducer(initialState, deleteCommentAction("1"));

      expect(newState.comments["1"].deleted).toBe(true);
      expect(newState.comments["2"].deleted).toBe(true);
      expect(newState.comments["3"].deleted).toBe(true);
      expect(newState.rootIds).not.toContainEqual(parentComment);
    });
  });

  describe("setStateAction", () => {
    it("should set the state with given comments and roots", () => {
      const initialState = {
        comments: {} as Record<string, Comment>,
        rootIds: [] as string[],
      };

      const comment1: Comment = {
        id: "1",
        parentId: undefined,
        childrenIds: ["2"],
        deleted: false,
        createdDate: "2021-09-01T00:00:00.000Z",
        text: "This is a comment",
      };

      const comment2: Comment = {
        id: "2",
        parentId: "1",
        childrenIds: [],
        deleted: false,
        createdDate: "2021-09-01T00:00:00.000Z",
        text: "This is a comment",
      };

      const newComments = {
        "1": comment1,
        "2": comment2,
      };

      const newRoots = [comment1.id];

      const newState = commentsReducer(
        initialState,
        setStateAction({ comments: newComments, rootIds: newRoots }),
      );

      expect(newState.comments).toEqual(newComments);
      expect(newState.rootIds).toEqual(newRoots);
    });
  });
});
