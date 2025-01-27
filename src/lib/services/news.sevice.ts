import api from "./api.config";

const NewsService = {
  getAllNews: (page, limit, title) => {
    if(!title) return api.get(`/news?page=${page}&limit=${limit}`);
    else return api.get(`/news?page=${page}&limit=${limit}&title=${title}`);
  },

  getNewById: (id: string) => {
    return api.get(`/news/${id}`);
  },
};

export default NewsService;
