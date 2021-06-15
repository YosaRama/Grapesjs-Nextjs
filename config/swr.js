import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 40000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const fetcher = (url) => {
  return instance.get(url).then((res) => {
    var results = res.data;

    if (!results) {
      throw Error(results.message);
    }

    return results;
  });
};

export default instance;
