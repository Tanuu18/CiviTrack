import axios from "axios";

const BACKEND_URL="http://localhost:5000/api";
const api=axios.create({baseURL:BACKEND_URL,});
api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})

export default api;