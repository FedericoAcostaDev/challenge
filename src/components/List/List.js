import { useState, useEffect } from "react";
import api from "../../api/axios";
import "./List.css";

//axios config
const accesToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm5hbWUiOiJzYXJhaCIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjQxNzA2ODc2LCJleHAiOjE2NDE3MDc3NzZ9.PLL_nePawrvmlmDTPw4TnJLtMekbvCKq35ZOGwYAmj8";

api.interceptors.request.use(
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
  const [members, setMembers] = useState("");

  useEffect(() => {
    api.get(`http://localhost:8081/api/members`).then((res) => {
      setMembers(res.data.name);
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
          {/* {members.map((member) => (
            <tr>
              <td>{member.firstName}</td>
              <td>{member.lastName}</td>
              <td>{member.address}</td>
              <td>{member.ssn}</td>
          </tr> 
          ))}*/}
          <tr>
            <td>firstName</td>
            <td>lastName</td>
            <td>address</td>
            <td>ssn</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default List;
