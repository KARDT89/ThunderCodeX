'use client';

import React from 'react'
import Split from 'react-split'
import ProblemDescription from './ProblemDescription/ProblemDescription'
import Playground from './Playground/Playground';

const Workspace = ({problem}) => {
  return (
    <Split className='split' minSize={0}>
        <ProblemDescription problem={problem}/>
        <Playground problem={problem}/>
    </Split>
  )
}

export default Workspace