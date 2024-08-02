import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, LikePost, GetPost } from "../toolkit/slices/PostSlice";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Add icons for liked and not liked states

const RenderPost = ({ post, userId }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (post?.likes && userId) {
      setIsLiked(post.likes.includes(userId));
    }
  }, [post?.likes.length, userId]);

  const handleLike = () => {
    dispatch(LikePost({ postId: post?._id, userId })).then(() => {
      dispatch(GetPost(post?.user?._id));
    });
  };

  return (
    <article className="max-w-md mx-auto p-3 bg-white shadow-sm rounded-lg mb-4">
      {post.image && (
        <img
          src={`https://server-rhyy.onrender.com/uploads/${post.image}`}
          alt=""
          className="w-full h-32 object-cover rounded-md mb-2"
        />
      )}
      <h2 className="text-lg font-semibold mb-1 truncate">{post.title}</h2>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
        {post.description}
      </p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>
          {post?.user?.username} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <div className="flex items-center">
          <button
            onClick={handleLike}
            className={`px-2 py-1 ${
              isLiked ? "text-red-500" : "text-gray-500"
            } rounded-full`}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button
            onClick={() =>
              dispatch(deletePost(post?._id)).then(() =>
                dispatch(GetPost(post?.user?._id))
              )
            }
            className="px-2 py-1 bg-red-500 text-white rounded-full ml-2"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default RenderPost;
