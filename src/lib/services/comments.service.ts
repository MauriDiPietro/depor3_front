import { Comment } from "../../types/comment.type";
import api from "./api.config";

const CommentsService = {
  getAllComments: (postType: string, postId: string) => {
    return api.get(`/comments/${postType}/${postId}`);
  },
  createComment: (body: Comment) => {
    return api.post("/comments", body);
  },
};

export default CommentsService;
