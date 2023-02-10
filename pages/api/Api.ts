import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const HEADERS = {
  "Cache-Control": "no-cache",
  "Content-Type": "application/json; charset=utf-8",
};

const createAxiosWithoutToken = () => {
  return axios.create({
    baseURL: `${BASE_URL}`,
    headers: HEADERS,
  });
};

class Api {
  async getPageInfo(loginId, projectName, pageName) {
    const { data } = await createAxiosWithoutToken().get(
      `/${loginId}/projects/${projectName}/pages/${pageName}`
    );
    return data.value;
  }
}

const api = new Api();
export default api;
