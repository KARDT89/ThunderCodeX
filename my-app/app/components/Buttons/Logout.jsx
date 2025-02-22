import { Button } from "@/components/ui/button";
import React from "react";
import { LogOut } from "lucide-react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";

const Logout = () => {
  const [signOut] = useSignOut(auth);

  const handleLogout = () => {
    signOut();
  };

  return (
    <Button
      onClick={handleLogout}
      className='w-full'
    >
      Logout<LogOut /> 
    </Button>
  );
};

export default Logout;
