import { useState, useEffect } from "react";
import axios from "axios";
import "./List.css";

//axios config
const accesToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm5hbWUiOiJzYXJhaCIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjQxNzA2ODc2LCJleHAiOjE2NDE3MDc3NzZ9.PLL_nePawrvmlmDTPw4TnJLtMekbvCKq35ZOGwYAmj8";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${accesToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//end axios config

const List = (_) => {
  const [name, setName] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/members`).then((res) => {
      setName(res.data.name);
    });
  }, []);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>SSN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>jenny</td>
            <td>huu</td>
            <td>calle 123</td>
            <td>123-45-6888</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default List;
