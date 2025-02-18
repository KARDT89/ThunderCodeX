import { Button } from "@/components/ui/button";
import React from "react";
import { LogOut } from "lucide-react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";

const Logout = () => {
    const [signOut, loading, error] = useSignOut(auth)

    const handleLogout = () => {
        signOut()
    }



  return (
    <>
      <Button className="bg-gradient-to-r from-yellow-300 to-yellow-600 text-black" onClick={handleLogout}>
          <LogOut/>
      </Button>
    </>
  );
};

export default Logout;
