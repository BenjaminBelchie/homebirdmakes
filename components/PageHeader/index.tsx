"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation"
import { HIDE_AUTH_UI } from "../../lib/site";

export default function PageHeader(){
    const router = useRouter();

    return(
        <>
            <div className="m-4 flex w-full items-center justify-between">
                <div className="flex min-w-0 flex-1 items-center">
                </div>
                
                <button type="button" onClick={() => {router.push("/")}} className="flex-shrink-0 p-0">
                    <img src="/images/homebirdmakes_logo.png" className="h-[180px] w-auto sm:h-[250px]" alt="Homebird Makes" />
                </button>
                <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
                    {!HIDE_AUTH_UI && (
                        <Show when="signed-out">
                            <SignInButton mode="redirect" forceRedirectUrl="/">
                                <button type="button" className="rounded border border-brand-info bg-white px-3 py-1 text-sm text-brand-info transition-colors hover:bg-slate-50">Sign in</button>
                            </SignInButton>
                            <SignUpButton mode="redirect" forceRedirectUrl="/">
                                <button type="button" className="rounded bg-brand-secondary px-3 py-1 text-sm text-white transition-opacity hover:opacity-90">Sign up</button>
                            </SignUpButton>
                        </Show>
                    )}
                    <Show when="signed-in">
                        <UserButton />
                    </Show>
                </div>
                
            </div>

            {/* Nav Links */}
            <div className="flex justify-center gap-2">
                <button type="button" className="px-3 py-2 text-brand-primary" onClick={() => {router.push("/")}}>Home</button>
                <button
                    type="button"
                    className="px-3 py-2 text-brand-primary"
                    onClick={() => {window.open("https://www.etsy.com/uk/shop/homebirdmakes")}}
                >Shop</button>
                
                <button type="button" className="px-3 py-2 text-brand-primary" onClick={() => {router.push("/about")}}>About</button>
                <button type="button" className="px-3 py-2 text-brand-primary" onClick={() => {router.push("/contact")}}>Contact</button>
            </div>
            <div className="mt-[47px] h-px w-full bg-slate-200" />
        </>
    )
}