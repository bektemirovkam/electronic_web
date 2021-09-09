import axios from "axios";

axios.interceptors.request.use((config) => {
  config.headers["Content-Security-Policy-Report-Only"] = "default-src 'none';";
  config.headers["Authorization"] = "Basic YWRtaW46Z2hidnRo";
  config.baseURL = "http://192.168.10.246:8889";
  config.timeout = 30000;
  return config;
});

export { axios };
