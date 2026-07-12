"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function MailingList(){
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openInfoSnackbar, setOpenInfoSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const isValidEmail = (email: string) => {  
        return  /\S+@\S+\.\S+/.test(email);
    }

    const handleCloseSuccessSnackbar = () => {
        setOpenSuccessSnackbar(false);
    }

    const handleCloseInfoSnackbar = () => {
        setOpenInfoSnackbar(false);
    }

    const handleCloseErrorSnackbar = () => {
        setOpenErrorSnackbar(false);
    }

    const handleSubscribe = () => {
        setLoading(true);
        axios.post("/api/subscribeUser", {
            email:email
        }).then((response) => {
            if(response.data.status === 200) {
                setOpenSuccessSnackbar(true);
                setEmail("");
            }
            if(response.data.status === 400){
                setOpenInfoSnackbar(true);
                setEmail("");
            }
            setLoading(false);
        }).catch(() => {
            setOpenErrorSnackbar(true);
            setLoading(false);
        })
    }

    useEffect(() => {
        if (!openSuccessSnackbar && !openInfoSnackbar && !openErrorSnackbar) {
            return;
        }

        const timeout = setTimeout(() => {
            setOpenSuccessSnackbar(false);
            setOpenInfoSnackbar(false);
            setOpenErrorSnackbar(false);
        }, 6000);

        return () => clearTimeout(timeout);
    }, [openSuccessSnackbar, openInfoSnackbar, openErrorSnackbar]);


    return(
        <>
        <div className="mb-2">
            <p className="text-xs text-brand-primary">Join my mailing list</p>
            <div className="flex flex-row">
                <input
                    className="w-full rounded-l rounded-r-none border border-slate-300 bg-white px-3 py-2 text-brand-primary focus:border-brand-info focus:outline-none focus:ring-2 focus:ring-brand-info/20 disabled:bg-slate-100 disabled:text-slate-400"
                    disabled={loading}
                    placeholder="Email Address"
                    value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                <button
                    className="rounded-l-none rounded-r bg-brand-secondary px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={!isValidEmail(email) || loading}
                    onClick={handleSubscribe}>
                        Subscribe</button>
            </div>
        </div>
        {openSuccessSnackbar ? (
            <div className="fixed bottom-4 left-1/2 z-50 w-[320px] -translate-x-1/2">
                <div className="flex items-center justify-between gap-3 rounded border border-[#c9f1d9] bg-[#e9f9ef] px-3 py-2 text-sm text-[#067647]">
                    <span>You&#39;ve been added to the mailing list</span>
                    <button className="text-xs" onClick={handleCloseSuccessSnackbar}>Close</button>
                </div>
            </div>
        ) : null}

        {openInfoSnackbar ? (
            <div className="fixed right-4 top-4 z-50 max-w-sm">
                <div className="flex items-center justify-between gap-3 rounded border border-[#d1e9ff] bg-[#eff8ff] px-3 py-2 text-sm text-[#175cd3]">
                    <span>You are already in the mailing list</span>
                    <button className="text-xs" onClick={handleCloseInfoSnackbar}>Close</button>
                </div>
            </div>
        ) : null}

        {openErrorSnackbar ? (
            <div className="fixed right-4 top-4 z-50 max-w-sm">
                <div className="flex items-center justify-between gap-3 rounded border border-[#f9d1d1] bg-[#fde8e8] px-3 py-2 text-sm text-[#b42318]">
                    <span>You could not be added to the mailing list</span>
                    <button className="text-xs" onClick={handleCloseErrorSnackbar}>Close</button>
                </div>
            </div>
        ) : null}
        </>
    )
}