import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deletePost,
  LikePost,
  GetPost,
  AddComment,
} from "../toolkit/slices/PostSlice";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Api } from "../api/Api";

const RenderPost = ({ post, userId }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (post?.likes && userId) {
      setIsLiked(post.likes.includes(userId));
    }
  }, [post?.likes, userId]);

  const handleLike = () => {
    dispatch(LikePost({ postId: post?._id, userId })).then(() => {
      dispatch(GetPost(post?.user?._id));
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch(AddComment({ postId: post?._id, userId, text: comment })).then(
        () => {
          dispatch(GetPost(post?.user?._id));
          setComment("");
        }
      );
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <article className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mb-6 transition-all duration-300 hover:shadow-xl">
      {post.image && (
        <img
          src={`https://server-rhyy.onrender.com/uploads/${post.image}`}
          alt=""
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h2>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {post.description}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span className="flex items-center">
          <img
            src={post?.user?.profilePicture || "https://via.placeholder.com/40"}
            alt={post?.user?.username}
            className="w-6 h-6 rounded-full mr-2"
          />
          {post?.user?.username} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleComments}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <FaRegComment className="inline mr-1" />{" "}
            {post.comments?.length || 0}
          </button>
          <button
            onClick={handleLike}
            className={`px-2 py-1 rounded-full transition-colors duration-200 ${
              isLiked
                ? "text-red-500 hover:bg-red-100"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {isLiked ? (
              <FaHeart className="inline mr-1" />
            ) : (
              <FaRegHeart className="inline mr-1" />
            )}
            {post.likes?.length || 0}
          </button>
          <button
            onClick={() =>
              dispatch(deletePost(post?._id)).then(() =>
                dispatch(GetPost(post?.user?._id))
              )
            }
            className="px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
          >
            <RiDeleteBin7Line />
          </button>
        </div>
      </div>
      {showComments && (
        <div className="mt-4 border-t pt-4">
          <form onSubmit={handleAddComment} className="flex mb-4">
            <input
              className="flex-grow border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Post
            </button>
          </form>
          <div className="space-y-3">
            {post.comments &&
              post.comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <img
                      src={
                        `${Api}/${comment.user.profilePhoto}` ||
                        "https://via.placeholder.com/32"
                      }
                      alt={comment.user.username}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="font-semibold text-sm text-gray-700">
                      {comment.user.username}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{comment.text}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default RenderPost;
