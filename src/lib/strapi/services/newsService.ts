import { NewsContent } from "@/utils/interfaces/news";
import { BaseService } from "./baseService";

/**
 * News Service
 * Handle news page content
 */

class NewsService extends BaseService<NewsContent> {
  constructor() {
    super("/api/news-page");
  }
}

const newsService = new NewsService();
export default newsService;
