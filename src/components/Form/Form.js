import { useRef, useState, useEffect } from "react";
import api from "../../api/axios";
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

//end axios config

const Form = () => {
  const userRef = useRef();
  const errRef = useRef();

  //form handlers

  //First Name
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  //Last Name
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  //Address
  const [body, setBody] = useState({});
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
  }, [firstName, lastName, address, ssn]);

  //trying axios
  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
    console.log(body);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, address, ssn);
    api.post("/", { body }).then((data) => console.log(data.data));
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
        <form action="" onChange={handleChange} onSubmit={handleSubmit}>
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
            name="firstName"
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
            name="lastName"
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
            name="address"
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
            name="ssn"
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
          <div className="buttons">
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
