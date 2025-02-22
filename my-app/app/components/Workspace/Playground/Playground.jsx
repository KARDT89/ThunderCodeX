import React from 'react'
import PreferenceNav from './PreferenceNav/PreferenceNav'
import Split from 'react-split'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { javascript } from '@codemirror/lang-javascript'
import { useState } from 'react'

function Playground({problem}) {

    const [activeTestCaseId, setActiveTestCaseId] = useState(0)
    
  return (
    <div className='flex flex-col bg-zinc-800 relative'>
        <PreferenceNav/>
        <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60,40]} minSize={60}>
            <div className="w-full overflow-auto">
                <CodeMirror
                    value={problem.starterCode}
                    theme={vscodeDark}
                    extensions={[javascript()]}
                    style={{fontSize:16}}
                />
            </div>
            <div className='w-full px-5 overflow-auto'>
                <div className='flex h-10 items-center space-x-6'>
                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                        <div className="text-sm font-medium leading-5 text-white">Testcases</div>
                        <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white'/>

                    </div>
                </div>
                <div className="flex">
                    {problem.examples.map((example, index) => (
                        <div className="mr-2 items-start mt-2 text-white" key={example.id} onClick={() => setActiveTestCaseId(index)}>
                            <div className='flex flex-wrap items-center gap-y-4'>
                                <div className='font-bold items-center transition-all focus:outline-none inline-flex bg-zinc-600 hover:bg-zinc-500 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap'>
                                    Case {index + 1}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='font-semibold my-4'>
                    <p className='text-sm font-medium mt-4 text-white'>Input: </p>
                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-zinc-600 border-transparent text-white mt-2 font-normal'>
                        {problem.examples[activeTestCaseId].inputText}
                    </div>
                    <p className='text-sm font-medium mt-4 text-white'>Output: </p>
                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-zinc-600 border-transparent text-white mt-2 font-normal'>
                        {problem.examples[activeTestCaseId].outputText}
                    </div>
                </div>
            </div>
        </Split>
    </div>
  )
}

export default Playground