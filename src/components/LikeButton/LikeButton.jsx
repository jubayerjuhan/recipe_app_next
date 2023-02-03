import { sanityClient } from "lib/sanity.js";
import React, { useState } from "react";
import { BounceLoader } from "react-spinners";

const LikeButton = ({ likes: documentLikes, id }) => {
  const [likes, setLikes] = useState(documentLikes);
  const [loading, setLoading] = useState(false);
  console.log(id, "Sanity Token");

  const handleClick = async () => {
    setLoading(true);
    const data = await sanityClient
      .patch(id)
      .inc({ likes: 1 })
      .commit()
      .catch((err) => {
        setLoading(false);

        console.log(err, "error");
      });
    setLoading(false);
    setLikes(data.likes);
  };
  return (
    <button
      style={{ padding: 5, fontSize: 18, cursor: "pointer" }}
      onClick={handleClick}
    >
      {loading ? <BounceLoader color="#36d7b7" size={18} /> : <>💜 {likes}</>}
    </button>
  );
};

export default LikeButton;
