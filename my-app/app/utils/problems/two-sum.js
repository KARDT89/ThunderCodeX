import assert from 'assert'


const starterCodeTwoSum = ``

export const twoSum = {
    id: "two-sum",
    title: "1. Two Sum",
    problemStatement: `<p className="mt-3">
              Given an array of integers <code>nums</code> and an integer{" "}
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
    handlerFunction: () => true,
    starterCode: "",
    order: 1,
    starterFunctionName: "function twoSum(",
  };
  