import React, { useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { useState } from "react";
import EditorFooter from "./EditorFooter";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/app/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/app/utils/problems";
import { usePathname } from "next/navigation";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";

function Playground({ problem, setSuccess, setSolved }) {
  const [activeTestCaseId, setActiveTestCaseId] = useState(0);
  let [userCode, setUserCode] = useState(problem.starterCode);
  const [user] = useAuthState(auth);
  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

  const [settings, setSettings] = useState({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    try {
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${userCode}`)();
      const success = problems[id].handlerFunction(cb);
      if (success) {
        toast.success("Your code passed all test cases, Congrats!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 4000);

        const userRef = doc(firestore, "users", user.uid);
        await updateDoc(userRef, {
          solvedProblems: arrayUnion(id),
        });
        setSolved(true);
      }
    } catch (error) {
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"
        )
      ) {
        toast.error("Oops! One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${id}`);
    if (user) {
      setUserCode(code ? JSON.parse(code) : problem.starterCode);
    } else {
      setUserCode(problem.starterCode);
    }
  }, [id, user, problem.starterCode]);

  const onChange = (value) => {
    setUserCode(value);
    localStorage.setItem(`code-${id}`, JSON.stringify(value));
  };

  return (
    <div className="flex flex-col bg-zinc-800 relative">
      <PreferenceNav settings={settings} setSettings={setSettings} />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: settings.fontSize }}
            onChange={onChange}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>
          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                className="mr-2 items-start mt-2"
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-bold items-center transition-all focus:outline-none inline-flex bg-zinc-700
                                 hover:bg-zinc-600 hover:text-white relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                                    ${
                                      activeTestCaseId === index
                                        ? "text-white"
                                        : "text-gray-500"
                                    }
                                 `}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="font-semibold my-4 pb-10">
            <p className="text-sm font-medium mt-4 text-white">Input: </p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-zinc-700 border-transparent text-white mt-2 font-normal">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output: </p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-zinc-700 border-transparent text-white mt-2 font-normal">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
}

export default Playground;
