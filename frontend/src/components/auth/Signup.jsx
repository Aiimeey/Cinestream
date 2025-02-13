import React, { useState , useEffect} from "react";
import { createUser } from "../../api/auth";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import {useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";

// Function to validate user input
const validateUserInfo = ({ name, email, password }) => {
  const isValidEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
    // Destructure to get updateNotification function and authInfo
    const { updateNotification } = useNotification();
    const navigate = useNavigate();
    const {  authInfo } = useAuth();
    const {  isLoggedIn } = authInfo;
  
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error);
    console.log(response.user);
    navigate('/auth/verification', {state:{user:response.user}, replace: true,})
  };
  useEffect(() => {
    if (isLoggedIn) navigate("/");
    // eslint-disable-next-line
  }, [isLoggedIn]);
  const { name, email, password } = userInfo;

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className= "bg-secondary rounded p-6 space-y-6 w-72">
          <Title>Sign up</Title>
          <FormInput
            value={name}
            onChange={handleChange}
            placeholder="full name"
            name="name"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            placeholder="email@example.com"
            name="email"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Sign up" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password</CustomLink>
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
