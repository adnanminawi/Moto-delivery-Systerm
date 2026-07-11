"use client";

import { useState } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(event) {
    event.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={login}>
      <h1>Login</h1>

      <EmailInput email={email} setEmail={setEmail} />

      <PasswordInput password={password} setPassword={setPassword} />

      <LoginButton />
    </form>
  );
}
