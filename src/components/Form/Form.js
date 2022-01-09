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

  //First Name
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  //Last Name
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  //Address
  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [addressFocus, setAddressFocus] = useState(false);

  const [ssn, setSsn] = useState("");
  const [validSsn, setValidSsn] = useState(false);
  const [ssnFocus, setSsnFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(INFO_REGEX.test(firstName));
    setValidLastName(INFO_REGEX.test(lastName));
    setValidAddress(INFO_REGEX.test(address));
    setValidSsn(SSN_REGEX.test(ssn));
  }, [firstName, lastName, address, ssn]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, ssn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = INFO_REGEX.test(firstName);
    const v2 = SSN_REGEX.test(ssn);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8081/api/members",
        JSON.stringify({ firstName, ssn }),
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
      setFirstName("");
      setSsn("");
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
            First Name:
            <FontAwesomeIcon
              icon={faCheck}
              className={validFirstName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validFirstName || !firstName ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="firstname"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
            aria-invalid={validFirstName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}
          />
          <p
            id="uidnote"
            className={
              firstNameFocus && firstName && !validFirstName
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            1 character minimum, up to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </form>

        <form onSubmit={handleSubmit}>
          <label htmlFor="lastname">
            Last Name:
            <FontAwesomeIcon
              icon={faCheck}
              className={validLastName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validLastName || !lastName ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="lastname"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
            aria-invalid={validLastName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setLastNameFocus(true)}
            onBlur={() => setLastNameFocus(false)}
          />
          <p
            id="uidnote"
            className={
              lastNameFocus && lastName && !validLastName
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            1 character minimum, up to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </form>

        <form onSubmit={handleSubmit}>
          <label htmlFor="address">
            Address:
            <FontAwesomeIcon
              icon={faCheck}
              className={validAddress ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validAddress || !address ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="address"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
            aria-invalid={validAddress ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setAddressFocus(true)}
            onBlur={() => setAddressFocus(false)}
          />
          <p
            id="uidnote"
            className={
              addressFocus && address && !validAddress
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            1 character minimum, up to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="ssn">
            SSN:
            <FontAwesomeIcon
              icon={faCheck}
              className={validSsn ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validSsn || !ssn ? "hide" : "invalid"}
            />
          </label>
          <input
            type="numbers"
            id="ssn"
            onChange={(e) => setSsn(e.target.value)}
            value={ssn}
            required
            aria-invalid={validSsn ? "false" : "true"}
            aria-describedby="ssnnote"
            onFocus={() => setSsnFocus(true)}
            onBlur={() => setSsnFocus(false)}
          />
          <p
            id="ssnnote"
            className={ssnFocus && !validSsn ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters.
          </p>
          <div>
            <button
              disabled={firstName || lastName || address || ssn ? false : true}
            >
              Reset
            </button>
            <button
              disabled={
                !validFirstName || !validLastName || !validAddress || !validSsn
                  ? true
                  : false
              }
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
