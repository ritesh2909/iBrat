import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTAwNzM1ZDc1NzQ5NWEzZGU5ZmRmMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTQzMjAyMX0.rRiRsGCqjEVNpKinDuFdVJ6ar1Q3dnx7LXx2syTvbZ4";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
})