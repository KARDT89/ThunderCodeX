import { auth, firestore } from "@/app/firebase/firebase";
import React, { useEffect, useState } from "react";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLoading3Quarters,
  AiFillStar,
} from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import RectangleSkeleton from "../../Skeletons/RectangleSkeleton";
import CircleSkeleton from "../../Skeletons/CircleSkeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";

const ProblemDescription = ({ problem , _solved}) => {
  const [user] = useAuthState(auth);
  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } =
    useGetCurrentProblem(problem.id);
  const { liked, disliked, solved, setData, starred } =
    useGetUsersDataOnProblem(problem.id);
  const [updating, setUpdating] = useState(false);

  const returnUserDataAndProblemData = async (transaction) => {
    const userRef = doc(firestore, "users", user.uid);
    const problemRef = doc(firestore, "problems", problem.id);
    const userDoc = await transaction.get(userRef);
    const problemDoc = await transaction.get(problemRef);
    return { userDoc, problemDoc, userRef, problemRef };
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like a problem", {
        position: "top-left",
        theme: "dark",
      });
      return;
    }
    if (updating) return;
    setUpdating(true);
    await runTransaction(firestore, async (transaction) => {
      const { problemDoc, userDoc, problemRef, userRef } =
        await returnUserDataAndProblemData(transaction);

      if (userDoc.exists() && problemDoc.exists()) {
        if (liked) {
          // remove problem id from likedProblems on user document, decrement likes on problem document
          transaction.update(userRef, {
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes - 1,
          });

          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes - 1 } : null
          );
          setData((prev) => ({ ...prev, liked: false }));
        } else if (disliked) {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
            dislikes: problemDoc.data().dislikes - 1,
          });

          setCurrentProblem((prev) =>
            prev
              ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 }
              : null
          );
          setData((prev) => ({ ...prev, liked: true, disliked: false }));
        } else {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes + 1 } : null
          );
          setData((prev) => ({ ...prev, liked: true }));
        }
      }
    });
    setUpdating(false);
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error("You must be logged in to dislike a problem", {
        position: "top-left",
        theme: "dark",
      });
      return;
    }
    if (updating) return;
    setUpdating(true);
    await runTransaction(firestore, async (transaction) => {
      const { problemDoc, userDoc, problemRef, userRef } =
        await returnUserDataAndProblemData(transaction);
      if (userDoc.exists() && problemDoc.exists()) {
        // already disliked, already liked, not disliked or liked
        if (disliked) {
          transaction.update(userRef, {
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes - 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, dislikes: prev.dislikes - 1 } : null
          );
          setData((prev) => ({ ...prev, disliked: false }));
        } else if (liked) {
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes + 1,
            likes: problemDoc.data().likes - 1,
          });
          setCurrentProblem((prev) =>
            prev
              ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 }
              : null
          );
          setData((prev) => ({ ...prev, disliked: true, liked: false }));
        } else {
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, dislikes: prev.dislikes + 1 } : null
          );
          setData((prev) => ({ ...prev, disliked: true }));
        }
      }
    });
    setUpdating(false);
  };

  const handleStar = async () => {
    if (!user) {
      toast.error("You must be logged in to star a problem", {
        position: "top-left",
        theme: "dark",
      });
      return;
    }
    if (updating) return;
    setUpdating(true);

    if (!starred) {
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, {
        starredProblems: arrayUnion(problem.id),
      });
      setData((prev) => ({ ...prev, starred: true }));
    } else {
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, {
        starredProblems: arrayRemove(problem.id),
      });
      setData((prev) => ({ ...prev, starred: false }));
    }

    setUpdating(false);
  };

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
          {!loading && currentProblem && (
            <div className="flex items-center mt-4">
              <div
                className={`${problemDifficultyClass} inline-block rounded-[21px] px-4 py-1 text-[15px] font-medium`}
              >
                {currentProblem.difficulty}
              </div>
              {(solved || _solved) && (
                <div className="rounded p-1 ml-4 text-xl text-green-400">
                <BsCheck2Circle />
                </div>
              )}
              <div
                className="flex items-center cursor-pointer hover:bg-zinc-700 space-x-1.5 rounded p-1.5 ml-3 text-base text-gray-400"
                onClick={handleLike}
              >
                {liked && !updating && (
                  <AiFillLike className="text-lg text-blue-600" />
                )}
                {!liked && !updating && <AiFillLike className="text-lg" />}
                {updating && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
                <span className="text-sm">{currentProblem.likes}</span>
              </div>
              <div
                className="flex items-center cursor-pointer hover:bg-zinc-700 space-x-1.5 rounded p-1.5 ml-3 text-base text-gray-400"
                onClick={handleDislike}
              >
                {disliked && !updating && (
                  <AiFillDislike className="text-lg text-blue-600" />
                )}
                {!disliked && !updating && (
                  <AiFillDislike className="text-lg" />
                )}
                {updating && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
                <span className="text-sm">{currentProblem.dislikes}</span>
              </div>
              <div
                className="cursor-pointer hover:bg-zinc-700  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-gray-400 "
                onClick={handleStar}
              >
                {starred && !updating && (
                  <AiFillStar className="text-yellow-300" />
                )}
                {!starred && !updating && <TiStarOutline />}
                {updating && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
              </div>
            </div>
          )}
          {loading && (
            <div className="mt-3 flex space-x-2">
              <RectangleSkeleton />
              <CircleSkeleton />
              <RectangleSkeleton />
              <RectangleSkeleton />
              <CircleSkeleton />
            </div>
          )}
          <div className="text-white text-sm pt-4">
            <div
              dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
            />

            {/* Examples */}
            <div className="mt-6">
              {problem.examples.map((example, index) => (
                <div key={example.id}>
                  <p className="font-medium text-white">Example: {index + 1}</p>
                  {example.img && (
                    <img src={example.img} alt="" className="mt-3" />
                  )}
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>
                      {example.inputText} <br />
                      <strong>Output:</strong> {example.outputText} <br />
                      <strong>Explanation:</strong> {example.explanation}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-8 pb-4">
              <p className="font-medium text-white text-sm">Constraints:</p>
              <ul className="text-white ml-5 list-disc">
                <div
                  dangerouslySetInnerHTML={{ __html: problem.constraints }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;

function useGetCurrentProblem(problemId) {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [problemDifficultyClass, setProblemDifficultyClass] = useState("");

  useEffect(() => {
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(firestore, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem });
        setProblemDifficultyClass(
          problem.difficulty === "Easy"
            ? "text-green-400 bg-green-800/30"
            : problem.difficulty === "Medium"
            ? "text-yellow-400 bg-yellow-800/30"
            : "text-red-400 bg-red-800/30"
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemId]);

  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getUsersDataOnProblem = async () => {
      const userRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const {
          solvedProblems,
          likedProblems,
          dislikedProblems,
          starredProblems,
        } = data;
        setData({
          liked: likedProblems.includes(problemId), // likedProblems["two-sum","jump-game"]
          disliked: dislikedProblems.includes(problemId),
          starred: starredProblems.includes(problemId),
          solved: solvedProblems.includes(problemId),
        });
      }
    };

    if (user) getUsersDataOnProblem();
    return () =>
      setData({ liked: false, disliked: false, starred: false, solved: false });
  }, [problemId, user]);

  return { ...data, setData };
}
