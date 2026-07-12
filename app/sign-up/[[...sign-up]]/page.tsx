import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { HIDE_AUTH_UI } from "../../../lib/site";

export default function SignUpPage() {
  if (HIDE_AUTH_UI) {
    redirect("/");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
      <SignUp />
    </div>
  );
}
