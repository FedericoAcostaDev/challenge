import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Form.css";
const INFO_REGEX = /^[A-z][A-z0-9-_]{1,23}$/;
const SSN_REGEX = /^[A-z][A-z0-9-_]{1,23}$/;

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
  const [success, setSuccess] = useState(false);

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

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = INFO_REGEX.test(user);
    const v2 = SSN_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  }; */

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form>
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
              type="ssn"
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
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <button
              disabled={!firstName || !lastName || !validPwd ? true : false}
            >
              Save
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Form;
