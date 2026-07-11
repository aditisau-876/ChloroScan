import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const signup = (data) => {
  return API.post("/auth/signup", data);
};

export const login = (data) => {
  return API.post("/auth/login", data);
};
export const googleLogin = (token) => {
  return API.post("/auth/google", {
    token
  });
};

export const checkPlant = (plantId) => {

    return API.get(
        `/myplants/check/${plantId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

};

export const addPlant = (plantId) => {
    return API.post(
        `/myplants/${plantId}`,
        {},
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};


export const removePlant = (plantId) => {

    return API.delete(
        `/myplants/${plantId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};


export const getMyPlants = () => {

    return API.get(
        "/myplants",
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};

export const searchPlants = (query) => {
    return API.get(
        `/plants/search?query=${encodeURIComponent(query)}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};
export const createReminder = async (data) => {
  return axios.post(
    "http://127.0.0.1:8000/reminders",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
export const getReminders = async () => {
  return axios.get(
    "http://127.0.0.1:8000/reminders",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
export const completeReminder = async (id) => {
  return axios.put(
    `http://127.0.0.1:8000/reminders/${id}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};