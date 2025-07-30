"use client";

import { useCallback, useEffect, useState } from "react";

import Layout from "../../pages/_layout";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { checkToken } from "../../utils/auth";

export default function LoginPage() {
  const [token, setToken] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window == "undefined") return false;
    const token = window.localStorage.getItem("dstn-management-token");
    return !!token;
  });

  const login = useCallback(async () => {
    try {
      if (typeof window == "undefined") return;
      await checkToken(token);
      setLoginMessage("");

      window.localStorage.setItem("dstn-management-token", token);
      setLoggedIn(true);
    } catch (error) {
      setLoginMessage("Invalid token");
    }
  }, [token]);

  const logout = useCallback(async () => {
    if (typeof window == "undefined") return false;
    window.localStorage.removeItem("dstn-management-token");
    setLoggedIn(false);
  }, []);

  useEffect(() => {
    if (!token) setLoginMessage("Supply a token");
    else setLoginMessage("");
  }, [token]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      login();
    }
  };

  return (
    <Layout page_class="h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h1 className="text-2xl font-bold">Management</h1>

        {loggedIn ? (
          <div className="flex flex-col w-72 gap-2 items-center">
            <p className="text-xl">Already logged in</p>
            <Button onClick={logout}>Log out</Button>
          </div>
        ) : (
          <div className="flex flex-col w-72 gap-2">
            <Input
              type="password"
              placeholder="Management Token"
              value={token}
              onChange={({ target: { value } }) => setToken(value)}
              onKeyDown={handleKeyDown}
            />
            {!!loginMessage && <p className="text-red-400">{loginMessage}</p>}

            <Button onClick={login}>Log In</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
