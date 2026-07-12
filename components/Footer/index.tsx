"use client";

import MailingList from "../MailingList";

export default function Footer(){
    return(
        <div className="mb-8 flex w-screen flex-col items-center justify-center">
            <div className="mb-2 mt-2 h-px w-full bg-slate-200" />
            <div className="mb-2 flex flex-row gap-2">
                <button
                    type="button"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B5998] text-white"
                    onClick={() => {window.open("https://www.facebook.com/homebirdmakes/")}}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H8v3h2.6v8h2.9Z" />
                    </svg>
                </button>
                <button
                    type="button"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                    style={{background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'}}
                    onClick={() =>{window.open("https://www.instagram.com/homebird_makes/")}}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                    </svg>
                </button>
                <button
                    type="button"
                    aria-label="Pinterest"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E60023] text-white"
                    onClick={() => {window.open("https://www.pinterest.co.uk/homebirdmakes/")}}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2a10 10 0 0 0-3.65 19.3c-.05-.82-.1-2.08.02-2.98.1-.77.66-4.9.66-4.9s-.17-.34-.17-.85c0-.79.46-1.39 1.03-1.39.49 0 .72.36.72.8 0 .49-.31 1.21-.47 1.89-.14.57.28 1.04.84 1.04 1.01 0 1.79-1.06 1.79-2.59 0-1.35-.97-2.3-2.36-2.3-1.61 0-2.56 1.2-2.56 2.45 0 .49.19 1.01.43 1.29a.17.17 0 0 1 .04.16c-.04.18-.14.57-.16.65-.02.1-.09.12-.2.07-.74-.34-1.2-1.4-1.2-2.25 0-1.84 1.33-3.52 3.84-3.52 2.02 0 3.59 1.44 3.59 3.36 0 2.01-1.27 3.63-3.03 3.63-.59 0-1.15-.31-1.34-.67l-.36 1.36c-.13.49-.48 1.1-.72 1.48A10 10 0 1 0 12 2Z" />
                    </svg>
                </button>
            </div>
            <MailingList />
        </div>

    )
}