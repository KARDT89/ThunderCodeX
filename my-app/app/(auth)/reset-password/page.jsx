import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ResetPassword = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-700 via-black to-gray-900 flex items-center justify-center p-4">
			<form className="space-y-8 p-12 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-2xl w-full max-w-md">
				<h3 className="text-3xl text-center font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
					Reset Password
				</h3>

				<p className="text-sm text-gray-300 text-center">
					Forgotten your password? Enter your e-mail address below, and we&apos;ll send you a link to reset it.
				</p>

				<div>
					<label htmlFor="email" className="block mb-3 text-sm font-medium text-gray-300">
						Your Email
					</label>
					<input
						type="email"
						id="email"
						className="w-full px-4 py-3.5 text-sm rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 placeholder-gray-400 text-white transition-all duration-200"
						placeholder="name@company.com"
					/>
				</div>

				<Button
					type="submit"
					className="w-full py-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white transition-all hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20"
				>
					Reset Password
				</Button>

				<div className="text-sm text-center text-gray-400">
					Remembered your password?{" "}
					<Link href={'/login'}>
						<Button
							variant="link"
							className="p-0 text-blue-400 hover:text-blue-300 font-semibold ml-1.5 h-auto"
						>
							Sign In
						</Button>
					</Link>

				</div>
			</form>
		</div>
	);
};

export default ResetPassword;
