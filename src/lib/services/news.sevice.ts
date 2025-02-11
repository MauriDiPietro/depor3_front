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
  getAllDrafts: (page, limit, title, category) => {
    if (!title && !category)
      return api.get(`/draft?page=${page}&limit=${limit}`);
    if (title)
      return api.get(`/draft?page=${page}&limit=${limit}&title=${title}`);
    if (category)
      return api.get(`/draft?page=${page}&limit=${limit}&category=${category}`);
  },
  getDraftById: (id: string) => {
    return api.get(`/draft/${id}`);
  },
  getAllNewsPatio: (page, limit, title) => {
    if (!title) return api.get(`/news/patio?page=${page}&limit=${limit}`);
    if (title)
      return api.get(`/news/patio?page=${page}&limit=${limit}&title=${title}`);
  },
  getNewPatioById: (id: string) => {
    return api.get(`/news/patio/${id}`);
  },
};

export default NewsService;
