import React, { useState } from "react";
const SMTPEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const handleVerification = async (e) => {
    e.preventDefault();
    const response = await fetch("/smtpEmail/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    setVerificationResult(result.message);
    console.log(result);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mb-5 bg-slate-500">
      <label className="w-11/12 pt-6 font-semibold text-lg text-left text-white border-b-2">
        SMTP Registration :
      </label>
      <form className="flex w-full h-full justify-center items-center text-lg text-white">
        <div className="flex p-6">
          <label htmlFor="to" className="my-2 mx-2 font-semibold">
            Email :
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // value={emailForm.email}
            // onFocus={handleFocus}
            // onBlur={handleBlur}
            className="p-2 text-slate-900 focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex p-6">
          <label htmlFor="to" className="my-2 mx-2 font-semibold">
            SMTP Password :
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // value={emailForm.email}
            // onFocus={handleFocus}
            // onBlur={handleBlur}
            className="p-2 text-slate-900 focus:outline-none focus:ring-0"
          />
        </div>
        <button
          type="submit"
          onClick={handleVerification}
          className="px-4 py-2 border-4 border-blue-500 bg-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SMTPEmail;
