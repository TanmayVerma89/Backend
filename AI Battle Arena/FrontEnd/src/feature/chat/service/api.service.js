import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function sendProblem(message) {
  const res = await api.post("/api/battle", {
    problem : message,
  });
  console.log(res);
  return res.data.result;
}
