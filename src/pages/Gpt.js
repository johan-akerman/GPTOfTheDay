import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import Comment from "../components/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import GPTCard from "../components/GPTCard";
import AddComment from "../components/AddComment";

export default function Gpt() {
  const url = window.location.href;
  const id = url.split("/")[url.split("/").length - 1];
  const [property, setProperty] = useState(); // to-do uppdatera utifrån id, dvs fetcha GPTn igen... men måste få auto genererade firebase id, inte bara "i"
  const signedIn = false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   let tmp = data.filter((prop) => prop.url === id);
  //   setProperty(tmp[0]);
  // }, [data]);

  if (!property) {
    return (
      <>
        <div className="bg-grayish h-screen">
          <h1 className="text-center text-xl pt-20">Something went wrong!</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-lightBrown">
        <div className="md:w-9/12 w-11/12 mx-auto h-full pt-20 md:pb-28 pb-12 gap-3">
          <GPTCard property={property} />

          <div className="mt-4 transform ease-in w-full py-4 text-left bg-white p-4 border rounded-lg">
            <h1 className="text-2xl font-semibold py-2">Comments</h1>

            <AddComment />

            <div className="grid gap-3">
              {property.reviews.length === 0 ? (
                <div className="h-96 text-center px-5 pt-32 w-96 mx-auto">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="text-7xl mb-3 text-gray-300"
                  />
                  <h1 className="text-center text-black text-3xl font-bold pb-2">
                    No comments yet...
                  </h1>
                </div>
              ) : (
                property.reviews.map((review) => {
                  return <Comment review={review} />;
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
