import React from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

const ProblemDescription = () => {
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
              1. Two Sum
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
            <p className="mt-3">
              Given an array of integers <code>nums</code> and an integer{" "}
              <code>target</code>, return indices of the two numbers such that
              they add up to <code>target</code>.
            </p>
            <p className="mt-3">
              You may assume that each input would have exactly one solution,
              and you may not use the same element twice.
            </p>
            <p className="mt-3">You can return the answer in any order.</p>

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

            <div className="mt-6">
              <p className="font-medium text-white">Constraints:</p>
              <div className="bg-zinc-700 p-4 mt-2 rounded-lg">
                <div className="font-mono text-sm">
                  <p>
                    2 &lt;= nums.length &lt;= 10
                    <sup className="text-[0.7em]">4</sup>
                  </p>
                  <p>
                    -10<sup className="text-[0.7em]">9</sup> &lt;= nums[i] &lt;=
                    10<sup className="text-[0.7em]">9</sup>
                  </p>
                  <p>
                    -10<sup className="text-[0.7em]">9</sup> &lt;= target &lt;=
                    10<sup className="text-[0.7em]">9</sup>
                  </p>
                  <p>Only one valid answer exists.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
