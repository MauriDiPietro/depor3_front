import api from "./api.config";

const NewsService = {
  getAllNews: (page, limit, title, category) => {
    if(!title && !category) return api.get(`/news?page=${page}&limit=${limit}`);
    if(title) return api.get(`/news?page=${page}&limit=${limit}&title=${title}`);
    if(category) return api.get(`/news?page=${page}&limit=${limit}&category=${category}`);
  },

  getNewById: (id: string) => {
    return api.get(`/news/${id}`);
  },
};

export default NewsService;
