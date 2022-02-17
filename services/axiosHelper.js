import instance from "./requestHandler";

class axiosHelper {
  static async postRequest(url, params = {}) {
    return instance.post(url, JSON.stringify(params));
  }

  static async getRequest(url) {
    return instance.get(url);
  }
}
export default axiosHelper;
