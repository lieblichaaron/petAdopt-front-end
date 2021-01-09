const userBaseUrl = "https://secret-shelf-16643.herokuapp.com/users";
const petsBaseUrl = "https://secret-shelf-16643.herokuapp.com/pets";

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
// if you would like to use the userId contained in the cookie pass "token" to getUsersPets function
export const getUsersPets = async (userId) => {
  try {
    const response = await fetch(`${userBaseUrl}/${userId}/pets`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};

export const getUsersSavedPets = async (userId) => {
  try {
    const response = await fetch(`${userBaseUrl}/${userId}/saved`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};

export const changeSavedPets = async (petId) => {
  try {
    const response = await fetch(`${petsBaseUrl}/${petId}/save`, {
      method: "PUT",
      credentials: "include",
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
    const response = await fetch(`${petsBaseUrl}/${petId}`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${userBaseUrl}/`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch {
    console.log("failed");
    return false;
  }
};

export const changeAdoptionStatus = async (petId, status) => {
  try {
    const response = await fetch(`${petsBaseUrl}/${petId}/adopt`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adoptionStatus: status }),
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
      credentials: "include",
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

export const updateUser = async (userInfo, userId) => {
  try {
    const response = await fetch(`${userBaseUrl}/${userId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};
