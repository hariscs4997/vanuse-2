import axios from "axios";

let configHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

/**
 * axios instance
 */
let instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
  headers: configHeaders,
  transformRequest: [
    function (data, headers) {
      // Do whatever you want to transform the data
      return data;
    },
  ],
});

// request header
instance.interceptors.request.use(
  async (config) => {
    // let token = getToken();
    // if (token != null) {
    //   await validateRefreshToken();
    //   token = getToken();
    config.headers.Authorization = "Token " + JSON.parse(localStorage.getItem("token")).token;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response parse
instance.interceptors.response.use(
  (response) => {
    return parseBody(response);
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      alert(error.response.data.message);
      window.location.reload();
    }
    if (error.response) {
      return parseError(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
);

function parseError(messages) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages: messages });
    } else {
      return Promise.reject({ messages: [messages] });
    }
  } else {
    return Promise.reject({ messages: ["Error"] });
  }
}

/**
 * parse response
 */
function parseBody(response) {
  if (response.status === 200) {
    return response.data;
  } else {
    return this.parseError(response.data.messages);
  }
}

export default instance;
