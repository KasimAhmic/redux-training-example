const GET = "GET";
const PUT = "PUT";
const POST = "POST";
const DELETE = "DELETE";

const headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json; charset=utf-8",
});

async function request(method, url, payload) {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let error = await response.text();

      throw new Error(error);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function get(url) {
  return request(GET, url);
}

function put(url, payload) {
  return request(PUT, url, payload);
}

function post(url, payload) {
  return request(POST, url, payload);
}

function del(url) {
  return request(DELETE, url);
}

const api = {
  get,
  put,
  post,
  del,
};

export { api as default, get, put, post, del };
