"use client";

import axios from "axios";
import { useState } from "react";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [errorState, setErrorState] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorSnackbarState, setErrorSnackbarState] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleErrorSnackbarClose = () => {
    setErrorSnackbarState(false);
  };

  const isValidEmail = (value: string) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const inputClass = `w-full rounded border border-slate-300 bg-white px-3 py-2 text-brand-primary focus:border-brand-info focus:outline-none focus:ring-2 focus:ring-brand-info/20 disabled:bg-slate-100 disabled:text-slate-400 ${errorState ? "border-[#b42318]" : ""}`;

  const sendMessage = () => {
    if (name !== "" && email !== "" && message !== "") {
      setLoading(true);
      axios
        .post("/api/email/contact", {
          name,
          email,
          phone,
          message,
        })
        .then((response) => {
          if (response.data.success) {
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setOpen(true);
            setLoading(false);
          } else {
            setErrorSnackbarState(true);
            setLoading(false);
          }
        })
        .catch(() => {
          setErrorSnackbarState(true);
          setLoading(false);
        });
      return;
    }

    setErrorState(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <PageHeader />
      <div className="mt-[55px] flex w-full max-w-[930px] flex-col items-center justify-center p-4 sm:p-8">
        <h1 className="mb-[55px] text-2xl">
          Contact
        </h1>
        <p>
          {"If you would like to get in touch please do email me at alibelcher@aol.com, and I'll get back to you as soon as I can."}
        </p>

        {errorState ? <div className="mt-[35px] w-full rounded border border-[#f9d1d1] bg-[#fde8e8] px-3 py-2 text-sm text-[#b42318]">Please complete all required fields</div> : null}

        <div className="mt-[35px] flex w-full flex-col gap-2">
          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
            <input
              required
              className={inputClass}
              placeholder="Name"
              value={name}
              disabled={loading}
              onChange={(e) => {
                setName(e.target.value);
                setErrorState(false);
              }}
            />

            <input
              required
              className={inputClass}
              placeholder="Email"
              disabled={loading}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorState(false);
              }}
            />
          </div>
          <input
            className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-brand-primary focus:border-brand-info focus:outline-none focus:ring-2 focus:ring-brand-info/20 disabled:bg-slate-100 disabled:text-slate-400"
            placeholder="Phone Number"
            value={phone}
            disabled={loading}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />

          <textarea
            required
            className={`${inputClass} min-h-40 resize-y`}
            placeholder="Message"
            disabled={loading}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setErrorState(false);
            }}
          />
          <button className="rounded bg-brand-secondary px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60" disabled={!isValidEmail(email) || loading} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
      <div className="mt-6">
        <Footer />
      </div>

      {open ? (
        <div className="fixed right-4 top-4 z-50 max-w-sm">
          <div className="flex items-center justify-between gap-3 rounded border border-[#c9f1d9] bg-[#e9f9ef] px-3 py-2 text-sm text-[#067647]">
            <span>Email Sent</span>
            <button className="text-xs" onClick={handleClose}>Close</button>
          </div>
        </div>
      ) : null}

      {errorSnackbarState ? (
        <div className="fixed right-4 top-4 z-50 max-w-sm">
          <div className="flex items-center justify-between gap-3 rounded border border-[#f9d1d1] bg-[#fde8e8] px-3 py-2 text-sm text-[#b42318]">
            <span>Error Sending Email</span>
            <button className="text-xs" onClick={handleErrorSnackbarClose}>Close</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}