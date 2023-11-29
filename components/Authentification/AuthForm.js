import { useState } from "react";
import classes from "./AuthForm.module.css";
import Router, { useRouter } from "next/router";
import Link from "next/link";

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isLogin = router.query.mode === "login";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, isLogin }),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json(); // Extract the response data

        localStorage.setItem("role", data.role); // Store role in local storage
        if (data.role === "admin") {
          router.push("/");
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form method="post" className={classes.form} onSubmit={handleSubmit}>
      <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
      <p>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </p>
      <div className={classes.actions}>
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
        <Link href={`?mode=${isLogin ? "signup" : "login"}`} type="button">
          {isLogin ? "Create new user" : "Login"}
        </Link>
        <p>{errorMessage}</p>
      </div>
    </form>
  );
}
