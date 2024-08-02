import React from "react";
import { useDispatch } from "react-redux";
import { deletePost, GetPost } from "../toolkit/slices/PostSlice";

const RenderPost = ({ post }) => {
  const dispatch = useDispatch();
  return (
    <div className="border p-4 mb-4 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-2">{post.description}</p>
      {post.image && (
        <img
          src={`https://server-rhyy.onrender.com/${post.image}`}
          alt="Post"
          className="w-full h-[10vh]"
        />
      )}
      <div className="text-sm text-gray-500 mt-2 flex justify-between">
        <p> Posted by {post?.user?.username}</p>
        <button
          onClick={() =>
            dispatch(deletePost(post?._id)).then(() => {
              dispatch(GetPost(post?.user?._id));
            })
          }
          className="px-2 py-0.5 bg-blue-500 text-white rounded-full"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RenderPost;
