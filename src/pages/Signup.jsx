import { useState } from "react";
import { IoEyeSharp as ShowPassword } from "react-icons/io5";
import { FaEyeSlash as HidePassword } from "react-icons/fa6";
import { SiGnuprivacyguard as SignupIcon } from "react-icons/si";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

function SignUpPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState("password");
  const [errors, setErrors] = useState({});

  function changePasswordInputType() {
    setPasswordInputType((prevType) => prevType === "text" ? "password" : "text");
  }

  function changeConfirmPasswordInputType() {
    setConfirmPasswordInputType((prevType) => prevType === "text" ? "password" : "text");
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function validateForm() {
    const errors = {};
    if (name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address.";
    }
    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      errors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Salvataggio dei dati nel localStorage
      localStorage.setItem("user", JSON.stringify({ name, email, password }));

      // Reindirizzamento alla pagina di SignIn
      navigate("/login");
    } else {
      setErrors(errors);
    }
  }

  return (
    <div>
      <Header title="Signup" icon={<SignupIcon />} to="/signup" />
      <Card>
        <h1 className="text-2xl">Signup</h1>
        <hr className="h-1 w-32 bg-dark-green" />
        <form className="w-full" onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="w-full">
            <Input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>
          {/* Email input */}
          <div className="w-full">
            <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          {/* Password input */}
          <div className="w-full flex relative">
            <Input type={passwordInputType} placeholder="Password" value={password} onChange={handlePasswordChange} />
            <span className="absolute right-3 top-3.5 cursor-pointer" onClick={changePasswordInputType}>
              {passwordInputType === "text" ? <HidePassword /> : <ShowPassword />}
            </span>
          </div>
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          {/* Confirm Password input */}
          <div className="w-full flex relative">
            <Input type={confirmPasswordInputType} placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            <span className="absolute right-3 top-3.5 cursor-pointer" onClick={changeConfirmPasswordInputType}>
              {confirmPasswordInputType === "text" ? <HidePassword /> : <ShowPassword />}
            </span>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
          {/* Button */}
          <div className="w-full">
            <Button title="Signup" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SignUpPage;
