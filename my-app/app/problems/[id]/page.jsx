import Navbar from '@/app/components/Navbar/Navbar'
import Workspace from '@/app/components/Workspace/Workspace'
import React from 'react'

function ProblemsPage({props}) {
  return (
    <div>
        <Navbar problemPage={true}/>
        <Workspace/>
    </div>
  )
}

export default ProblemsPage