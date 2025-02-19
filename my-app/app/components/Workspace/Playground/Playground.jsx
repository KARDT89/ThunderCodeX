import React from 'react'
import PreferenceNav from './PreferenceNav/PreferenceNav'
import Split from 'react-split'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { javascript } from '@codemirror/lang-javascript'

function Playground() {
    const boilerPlate = `function twoSum(nums, target){
    // Write your code here
};`
  return (
    <div className='flex flex-col bg-zinc-800 relative'>
        <PreferenceNav/>
        <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60,40]} minSize={60}>
            <div className="w-full overflow-auto">
                <CodeMirror
                    value={boilerPlate}
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

                </div>
            </div>
        </Split>
    </div>
  )
}

export default Playground