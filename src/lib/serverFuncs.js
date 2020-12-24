const userBaseUrl = "http://localhost:5000/users";

export const signup = async (formInfo) => {
  try {
    const response = await fetch(`${userBaseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return false;
  }
};

export const login = async (formInfo) => {
  try {
    const response = await fetch(`${userBaseUrl}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return false;
  }
};
