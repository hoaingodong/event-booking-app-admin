import axios from "axios";  
axios.defaults.baseURL = 'https://event-booking-app.onrender.com/api/v1';
export default async function callAPI (method, endpoint, body){
  const  token = JSON.parse(sessionStorage.getItem('__token__'));
   return await axios({
        method: method,
        url: endpoint,
        data: body,
        headers: { Authorization: `Bearer ${token}`,
                   Accept: 'application/json'}
      });
 }
