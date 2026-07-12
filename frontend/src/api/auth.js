import axios from "axios";

const API = axios.create({
  baseURL: "https://chloroscan-y5cl.onrender.com",
});

export const signup = (data) => {return API.post("/auth/signup", data);};

export const login = (data) => {return API.post("/auth/login", data);};
export const googleLogin = (token) => {return API.post("/auth/google", {token});};

export const checkPlant = (plantId) => {
    return API.get(`/myplants/check/${plantId}`,{headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}});};

export const addPlant = (plantId) => {
    return API.post(`/myplants/${plantId}`,{},{headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}});
  };

export const removePlant = (plantId) => {
    return API.delete(`/myplants/${plantId}`,{headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}});
};

export const getMyPlants = () => {
    return API.get("/myplants",{headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}});
};

export const searchPlants = (query) => {
    return API.get(`/plants/search?query=${encodeURIComponent(query)}`,{headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
};
export const createReminder = (data) => {
  return API.post("/reminders/", data, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,},
  });
};
export const getReminders = () => {
  return API.get("/reminders/", {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,},
  });
  };
export const completeReminder = (id) => {
  return API.put(`/reminders/${id}/complete`, {}, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,},
  });
};

export const getDashboardReminder = () => {
  return API.get("/reminders/dashboard", {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,},
  });
};

export const deleteReminder = (id) => {
  return API.delete(`/reminders/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,},
  });
};

export const getWeatherAdvice = (lat, lon) =>
    API.get(`/weather-advice/${lat}/${lon}`);

export const getRecommendedPlants = (lat, lon) => {
  return API.get(`/recommended-plants/${lat}/${lon}`);
};