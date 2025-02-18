'use client';

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";

const ResetPassword = () => {

	const [email, setEmail] = useState('')
	const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
	const handleReset = async (e) => {
		e.preventDefault()
		const success = await sendPasswordResetEmail(email)
		if(success){
			alert('Sent Email');
		}
	}
	useEffect(()=>{
		if(error){
			alert(error.message)
		}
	},[error])



	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-700 via-black to-gray-900 flex items-center justify-center p-4">
			<form className="space-y-8 p-12 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-2xl w-full max-w-md" onSubmit={handleReset}>
				<h3 className="text-3xl text-center font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
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
						name="email"
						className="w-full px-4 py-3.5 text-sm rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 placeholder-gray-400 text-white transition-all duration-200"
						placeholder="name@company.com"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<Button
					type="submit"
					className="w-full py-6 text-base font-semibold bg-gradient-to-r from-yellow-300 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black transition-all hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20"
				>
					Reset Password
				</Button>

				<div className="text-sm text-center text-gray-400">
					Remembered your password?{" "}
					<Link href={'/login'}>
						<Button
							variant="link"
							className="p-0 text-yellow-400 hover:text-yellow-300 font-semibold ml-1.5 h-auto"
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
