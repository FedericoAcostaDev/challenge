import axios from "axios";

axios.defaults.url = "http://localhost:8081/api/members";
axios.defaults.headers.common = {
  Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm5hbWUiOiJzYXJhaCIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjQxNjU1MjUyLCJleHAiOjE2NDE2NTYxNTJ9.i4jIKOWdJDmcu7CjcOOvElFCpBHHsUzHASAisWEAHZM`,
};
export default axios;
