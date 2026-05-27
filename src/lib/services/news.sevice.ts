import api from "./api.config";

export type NewsFilters = {
  title?: string;
  category?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
};

const buildNewsParams = (
  page?: number,
  limit?: number,
  filters?: NewsFilters
) => {
  const params: Record<string, string | number> = {};

  if (page) params.page = page;
  if (limit) params.limit = limit;

  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value?.trim()) params[key] = value.trim();
  });

  return params;
};

const NewsService = {
  getAllNews: (
    page?: number,
    limit?: number,
    filtersOrTitle?: NewsFilters | string,
    category?: string
  ) => {
    const filters =
      typeof filtersOrTitle === "string"
        ? { title: filtersOrTitle, category }
        : filtersOrTitle;

    return api.get("/news", buildNewsParams(page, limit, filters));
  },

  getNewById: (id: string) => {
    return api.get(`/news/${id}`);
  },
  getAllDrafts: (page, limit, title, category) => {
    return api.get(
      "/draft",
      buildNewsParams(page, limit, { title, category })
    );
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
