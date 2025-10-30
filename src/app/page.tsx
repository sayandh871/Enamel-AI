
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";


export default function Home() {
  return (
   <div>
    <h1>home page</h1>
    <SignedOut>
      <SignInButton mode="modal">sign in</SignInButton>
    </SignedOut>
    <SignedIn>
      <SignOutButton>logout</SignOutButton>
    </SignedIn>
   </div>
  );
}
