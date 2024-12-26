import api from "./api.config";

const NewsService = {
  getAllNews: () => {
    return api.get("/news");
  },

  getNewById: (id: string) => {
    return api.get(`/news/${id}`);
  },
};

export default NewsService;
