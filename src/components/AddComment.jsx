import { useState } from "react";
import { addComment } from "../firestore";
import { signInWithGoogle } from "../authentication";

export default function AddComment({ user, gpt, handleAddComment }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    if (comment.length > 0) {
      addComment(user, gpt, comment).then((res) => {
        const tmp = [...res];
        tmp[tmp.length - 1].submittedAt = "Just now";

        setComment("");
        handleAddComment(res);
      });
    }
  }

  return (
    <div className="mb-10 mt-4 border-b-2 pb-6">
      <textarea
        className="w-full py-2 pl-2 pr-4 rounded-lg mb-3 focus:outline-none bg-gray-100 grow border-2"
        placeholder="Add a comment..."
        rows={2}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        autoComplete="off"
      />

      {user ? (
        <button
          className="cursor-pointer px-5 py-2 border border-transparent font-medium rounded-md text-white bg-orange-400 hover:bg-orange-300 text-lg transform ease-in duration-100"
          onClick={() => handleSubmit()}
        >
          Add comment
        </button>
      ) : (
        <button
          className="cursor-pointer px-5 py-2 border border-transparent font-medium rounded-md text-white bg-orange-400 hover:bg-orange-300 text-lg transform ease-in duration-100"
          onClick={() => signInWithGoogle()}
        >
          Sign in to comment
        </button>
      )}
    </div>
  );
}
