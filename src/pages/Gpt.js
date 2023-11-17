import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import Comment from "../components/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import GPTPageCard from "../components/GPTPageCard";
import AddComment from "../components/AddComment";
import { getGpt } from "../firestore";
import { getCurrentUser } from "../authentication";

export default function Gpt({ user }) {
  const url = window.location.href;
  const id = url.split("/")[url.split("/").length - 1];
  const [gpt, setGpt] = useState();
  const [loading, setLoading] = useState(true);
  const [currentComments, setCurrentComments] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    getGpt(id).then((res) => {
      setGpt(res[0]);
      setCurrentComments(res[0].data.comments);
    });
  }, []);

  function handleAddComment(newComments) {
    setCurrentComments(newComments.reverse());
  }

  if (!gpt) {
    return (
      <>
        <div className="bg-lightBrown h-screen">
          <h1 className="text-center text-xl pt-20">Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-lightBrown">
        <div className="md:w-9/12 w-11/12 mx-auto h-full pt-20 md:pb-28 pb-12 gap-3">
          <GPTPageCard gpt={gpt} />

          <div className="mt-4 transform ease-in w-full py-4 text-left bg-white p-4 border rounded-lg">
            <h1 className="text-2xl font-semibold py-2">Comments</h1>

            <AddComment
              user={user}
              gpt={gpt}
              handleAddComment={handleAddComment}
            />

            <div className="grid gap-3">
              {gpt?.data?.comments?.length === 0 ? (
                <div className=" text-center px-5 pt-8 pb-8 w-96 mx-auto">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="text-4xl mb-3 text-mediumBrown"
                  />
                  <h1 className="text-center text-darkBrown text-xl pb-2">
                    No comments yet...
                  </h1>
                </div>
              ) : (
                <>
                  {currentComments?.map((c, i) => {
                    return <Comment review={c} key={i} />;
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
