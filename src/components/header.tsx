"use client"
import { ColorModeSwitcher } from "./color-mode-switcher"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from "./ui/button";
import Link  from "next/link";
import React from "react";
import router from "next/router";


function SignInSignUpButtons() {
  return (
    <>
      <Link
        href="/login"
        className={buttonVariants({ variant: "secondary" })}
      >
        Login
      </Link>

      <Link
        href="/signup"
        className={buttonVariants({ variant: "default" })}
      >
        Sign Up
      </Link>
    </>
  );
}

function AuthButtons() {
    const [user, setUser] = React.useState(null);
    // const router = useRouter();

    // React.useEffect(() => {
    //     // Fetch user data from API or context
    //     const fetchUser = async () => {
    //         const res = await fetch('/api/auth/user');
    //         if (res.ok) {
    //             const data = await res.json();
    //             setUser(data);
    //         }
    //     };
    //     fetchUser();
    // }, []);

    const handleLogout = async () => {
        // await Logout();
        // setUser(null);
        // router.push('/');
    };
      if (user) {
    return (
      <>
        <Link
          href="/home"
          className={buttonVariants({ variant: "default" })}
        >
          Home
        </Link>
        <Button onClick={handleLogout} variant="ghost">
          Logout
        </Button>
      </>
    );
  } 
  else {
    return <SignInSignUpButtons />;
  }
}

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-black">
      <div className="text-lg font-semibold text-black dark:text-white">
        WorkNest
      </div>
      <nav className="flex items-center space-x-4">
        <ColorModeSwitcher />
        <AuthButtons />
        
      </nav>
    </header>
  );
}