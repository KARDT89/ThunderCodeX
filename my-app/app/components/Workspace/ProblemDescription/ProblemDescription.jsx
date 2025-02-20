import React from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

const ProblemDescription = ({problem}) => {
  return (
    <div className="bg-zinc-800 min-h-screen text-gray-200">
      <div className="flex h-11 w-full items-center pt-2 bg-zinc-900 text-gray-300 overflow-x-hidden">
        <div className="bg-zinc-800 rounded-t-[4px] px-5 py-[8px] text-sm cursor-pointer font-semibold">
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5 w-full">
          <div className="flex space-x-4">
            <div className="flex-1 mr-2 text-2xl text-gray-100 font-bold">
              {problem.title}
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="text-green-400 bg-green-800/30 inline-block rounded-[21px] px-4 py-1 text-xs font-medium">
              Easy
            </div>
            <div className="rounded p-1 ml-4 text-xl text-green-400">
              <BsCheck2Circle />
            </div>
            <div className="flex items-center cursor-pointer hover:bg-zinc-700 space-x-1.5 rounded p-1.5 ml-3 text-base text-gray-400">
              <AiFillLike className="text-lg" />
              <span className="text-sm">120</span>
            </div>
            <div className="flex items-center cursor-pointer hover:bg-zinc-700 space-x-1.5 rounded p-1.5 ml-3 text-base text-gray-400">
              <AiFillDislike className="text-lg" />
              <span className="text-sm">10</span>
            </div>
            <div className="flex items-center cursor-pointer hover:bg-zinc-700 rounded p-1.5 ml-3 text-xl text-gray-400">
              <TiStarOutline />
            </div>
          </div>

          <div className="text-white text-sm">
          <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />

            {/* Examples */}
            <div className="mt-6">
              <div>
                <p className="font-medium text-white">Example: 1</p>
              </div>
              <div className="example-card">
                <pre>
                  <strong className="text-white">Input: </strong> nums =
                  [2,7,11,15], target = 9{""}
                  <br />
                  <strong>Output:</strong> [0,1] <br />
                  <strong>Explanation: </strong> Because nums[0] + nums[1] == 9,
                  we return [0,1]
                </pre>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <p className="font-medium text-white">Example: 2</p>
              </div>
              <div className="example-card">
                <pre>
                  <strong className="text-white">Input: </strong> nums =
                  [3,2,4], target = 6{""}
                  <br />
                  <strong>Output:</strong> [1,2] <br />
                  <strong>Explanation: </strong> Because nums[1] + nums[2] == 6,
                  we return [1,2]
                </pre>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <p className="font-medium text-white">Example: 3</p>
              </div>
              <div className="example-card">
                <pre>
                  <strong className="text-white">Input: </strong> nums = [3,3],
                  target = 6{""}
                  <br />
                  <strong>Output:</strong> [0,1] <br />
                </pre>
              </div>
            </div>

            <div className="my-5">
              <p className="font-medium text-white">Constraints:</p>
              <ul className="text-white ml-5 list-disc">
                <li className="mt-2">
                    <code>2 nums.length 10 </code>
                </li>
                <li className="mt-2">
                  <code>-10 nums[i] 10</code>
                </li>
                <li className="mt-2">
                  <strong>Only one valid answer exists</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
