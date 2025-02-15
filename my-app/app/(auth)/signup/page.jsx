import React from "react";
import { Button } from "@/components/ui/button";

const Signup = () => {
  return (
    <form className="space-y-6 px-6 py-4">
      <h3 className="text-xl text-white font-bold">Sign-up to ThunderCodeX</h3>
      <div>
        <label
          htmlFor="displayName"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Display Name
        </label>
        <input
          type="displayName"
          name="displayName"
          id="displayName"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-200"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-200"
          placeholder="name@company.com"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-200"
          placeholder="****"
        />
      </div>
      <Button type="submit" variant={"outline"} className="w-full rounded-lg">
        Sign up
      </Button>
      <div className="text-center text-sm text-gray-400">
        Already have an account?
        <Button
          type="button"
          variant="link"
          size="sm"
          // onClick={onSwitchToSignup}
          className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default Signup;
