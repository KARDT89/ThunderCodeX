

import Navbar from '@/app/components/Navbar/Navbar';
import Workspace from '@/app/components/Workspace/Workspace';
import { problems } from '@/app/utils/problems';
import { notFound } from 'next/navigation';
import React from 'react';

// Generates static paths for dynamic routes
export async function generateStaticParams() {
  return Object.keys(problems).map((key) => ({
    id: key,
  }));
}

// ✅ This will fetch the problem data for each page
async function generateMetadata({ params }) {
  const problem = problems[params.id];
  return { title: problem?.title || "Problem Not Found" };
}

// Dynamic page based on [id]
export default function ProblemsPage({ params }) {
  const {handlerFunction, ...problemsWithoutHandler} = problems[params.id];

  if (!problemsWithoutHandler) return notFound();

  return (
    <div>
      <Navbar problemPage={true} />
      <Workspace problem={problemsWithoutHandler} />
    </div>
  );
}
