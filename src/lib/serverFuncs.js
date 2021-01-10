const userBaseUrl = "http://localhost:5000/users";
const petsBaseUrl = "http://localhost:5000/pets";

export const signup = async (formInfo) => {
  try {
    const response = await fetch(`${userBaseUrl}/signup`, {
      method: "POST",
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

export const loginWithToken = async (token) => {
  try {
    const response = await fetch(`${userBaseUrl}/login/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
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
    const data = await response.json();
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};

export const getUsersSavedPets = async (userId) => {
  try {
    const response = await fetch(`${userBaseUrl}/${userId}/saved`);
    const data = await response.json();
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};

export const changeSavedPets = async (petId, token) => {
  try {
    const response = await fetch(`${petsBaseUrl}/${petId}/save`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};

export const getPetById = async (petId) => {
  try {
    const response = await fetch(`${petsBaseUrl}/${petId}`);
    const data = await response.json();
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};

export const getAllUsers = async (token) => {
  try {
    const response = await fetch(`${userBaseUrl}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};

export const changeAdoptionStatus = async (petId, adoptionStatus, token) => {
  try {
    const response = await fetch(`${petsBaseUrl}/${petId}/adopt`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adoptionStatus, token }),
    });
    const data = await response.json();
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};

export const updatePet = async (formData, petId) => {
  try {
    const response = await fetch(`${petsBaseUrl}/${petId}`, {
      method: "PUT",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const getPetsByParams = async (paramsObj) => {
  let paramsString = "";
  for (const [key, value] of Object.entries(paramsObj)) {
    paramsString += `${key}=${value}&`;
  }
  try {
    const response = await fetch(`${petsBaseUrl}?${paramsString}`);
    const data = await response.json();
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};

export const updateUser = async (userInfo, userId, token) => {
  try {
    const response = await fetch(`${userBaseUrl}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInfo, token }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};
