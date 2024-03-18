export const api = (
    path,
    method = "GET",
    body = null,
    credentials = null
  ) => {
    const url = "http://localhost:5000/api" + path;
  
    const options = {
      method,
      headers: {}
    };
  
    if (body) {
      options.body = JSON.stringify(body);
      options.headers["Content-Type"] = "application/json; charset=utf-8";
    }
  
    if (credentials) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers.Authorization = `Basic ${encodedCredentials}`;
    }
  
    console.log("url: " + url);
    console.log("options: " + options.body);
    console.log("credentials: " + credentials.password);

    return fetch(url, options);
  }