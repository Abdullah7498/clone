import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost, GetPost } from "../toolkit/slices/PostSlice";
import RenderPost from "./RenderPost";

const CreatePostModal = ({ isOpen, onClose, user, dispatch }) => {
  const initialValues = {
    title: "",
    description: "",
    image: null,
    user_id: user?._id,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required("An image is required"),
    user_id: Yup.string(),
  });

  const handleSubmit = (values) => {
    dispatch(CreatePost(values)).then(() => {
      dispatch(GetPost(user?._id));
      onClose();
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Create Post</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <Field
                  name="title"
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <Field
                  name="description"
                  as="textarea"
                  rows="4"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  placeholder="What's happening?"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-full"
                >
                  Create Post
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    if (user?._id) {
      dispatch(GetPost(user._id)).then(() => {
        console.log("Posts fetched:", posts);
      });
    }
  }, []);

  return (
    <>
      <div>
        <Nav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex justify-end mt-5">
            <button
              className="p-2 bg-blue-500 text-white rounded-full mb-5"
              onClick={() => setIsModalOpen(true)}
            >
              Create Post
            </button>
          </div>
          <div>
            {posts && posts.length > 0 ? (
              posts.map((post) => <RenderPost key={post._id} post={post} />)
            ) : (
              <p className="text-gray-500 text-center">No Posts</p>
            )}
          </div>
        </div>
      </div>
      <CreatePostModal
        isOpen={isModalOpen}
        dispatch={dispatch}
        user={user}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Posts;
