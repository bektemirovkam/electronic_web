import axios from "axios";

// export const baseURL = "https://office.e-health.kz:8889";
export const baseURL = "http://192.168.10.246:8888";

axios.interceptors.request.use((config) => {
  config.headers["Content-Security-Policy-Report-Only"] = "default-src 'none';";
  config.headers["Authorization"] = "Basic YWRtaW46Z2hidnRo";
  config.baseURL = baseURL;
  config.timeout = 5000;
  return config;
});

export { axios };
