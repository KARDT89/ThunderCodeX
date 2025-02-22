"use client"
import assert from "assert";

const starterCodeTwoSumJS = `function twoSum(nums, target){
// write your code here
};`;

export const handleTwoSum = (fn) => {
  try {
    const nums = [
      [2, 7, 11, 15],
      [3, 2, 4],
      [3, 3],
    ];

    const target = [9, 6, 6];

    const answers = [
      [0, 1],
      [1, 2],
      [0, 1],
    ];

    for (let i = 0; i < nums.length; i++) {
      const result = fn(nums[i], target[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error) {
    console.log("twoSum handler function error");
    throw new Error(error);
  }
};

export const twoSum = {
  id: "two-sum",
  title: "1. Two Sum",
  problemStatement: `<p className="mt-3">
              Given an array of integers <code>nums</code> and an integer 
              <code>target</code>, return indices of the two numbers such that
              they add up to <code>target</code>.
            </p>
            <p className="mt-3">
              You may assume that each input would have exactly one solution,
              and you may not use the same element twice.
            </p>
            <p className="mt-3">You can return the answer in any order.</p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [2,7,11,15], target = 9",
      outputText: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      id: 2,
      inputText: "nums = [3,2,4], target = 6",
      outputText: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      id: 3,
      inputText: "nums = [3,3], target = 6",
      outputText: "[0,1]",
    },
  ],
  constraints: `<li className="mt-2">
                    <code>2 nums.length 10 </code>
                </li>
                <li className="mt-2">
                  <code>-10 nums[i] 10</code>
                </li>
                <li className="mt-2">
                  <strong>Only one valid answer exists</strong>
                </li>`,
  handlerFunction: handleTwoSum,
  starterCode: starterCodeTwoSumJS,
  order: 1,
  starterFunctionName: "function twoSum(",
};
