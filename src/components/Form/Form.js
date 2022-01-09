import { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Form.css";

const INFO_REGEX = /^[A-z][A-z0-9-_]{1,23}$/;
const SSN_REGEX = /^\d{3}-\d{2}-\d{4}$/;

//axios config
const accesToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm5hbWUiOiJzYXJhaCIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjQxNzA0OTUyLCJleHAiOjE2NDE3MDU4NTJ9.tLX30NP8gpu8oxZxeBsohJRFO14yLDG7VA23EUHilCA";
const apiUrl = "http://localhost:8081/api";

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

const Form = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setFirstName(INFO_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setLastName(INFO_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(SSN_REGEX.test(pwd));
  }, [pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = INFO_REGEX.test(user);
    const v2 = SSN_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    //adeed to check server connection
    console.log(user, pwd);

    try {
      const result = await axios.post(`${apiUrl}/members`);
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Add Member</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">
            Firstname:
            <FontAwesomeIcon
              icon={faCheck}
              className={firstName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={firstName || !user ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="firstname"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={firstName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !firstName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            1 to 24 characters.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="lastname">
            Lastname:
            <FontAwesomeIcon
              icon={faCheck}
              className={lastName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={lastName || !user ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="lastname"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={lastName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !lastName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            1 to 24 characters.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="adress">
            Adress:
            <FontAwesomeIcon
              icon={faCheck}
              className={lastName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={lastName || !user ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="lastname"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={lastName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !lastName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            1 to 24 characters.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="ssn">
            SSN:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !pwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="numbers"
            id="ssn"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Format ###-##-####
            <br />
            Must include numbers separated with (-).
          </p>
          <button
            disabled={!firstName || !lastName || !validPwd ? true : false}
          >
            Reset
          </button>
          <button
            disabled={!firstName || !lastName || !validPwd ? true : false}
          >
            Save
          </button>
        </form>
      </section>
    </>
  );
};

export default Form;
