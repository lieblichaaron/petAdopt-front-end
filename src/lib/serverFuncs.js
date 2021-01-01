const userBaseUrl = "http://localhost:5000/users";
const petsBaseUrl = "http://localhost:5000/pets";

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

export const loginWithToken = async () => {
  try {
    const response = await fetch(`${userBaseUrl}/login/token`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return false;
  }
};

export const addPet = async (formData) => {
  try {
    const response = await fetch(`${petsBaseUrl}/`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};
export const getUsersPets = async (userId) => {
  try {
    const response = await fetch(`${userBaseUrl}/${userId}/pets`);
    const data = response.json();
    console.log(data);
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};
