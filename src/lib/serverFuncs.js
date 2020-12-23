const userBaseUrl = "http://localhost:5000/users";

export const signup = (formInfo) => {
  fetch(`${userBaseUrl}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formInfo),
  });
};

export const login = (formInfo) => {
  fetch(`${userBaseUrl}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formInfo),
  });
};
