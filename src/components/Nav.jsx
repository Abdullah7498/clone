import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../toolkit/slices/authSlice";

const NavigationItem = ({ href, text, isActive, setActive }) => (
  <a
    href={href}
    className={`border-b-2 text-sm font-medium inline-flex items-center px-1 pt-1 ${
      isActive === text.toLowerCase()
        ? "border-blue-500 text-gray-900"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    }`}
    onClick={(e) => {
      e.preventDefault();
      setActive(text.toLowerCase());
    }}
  >
    {text}
  </a>
);

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsModalOpen(false); // Close the modal after logout
  };

  return (
    <div className="ml-3 relative">
      <button
        type="button"
        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        id="user-menu"
        aria-expanded={isModalOpen}
        aria-haspopup="true"
        onClick={() => setIsModalOpen(!isModalOpen)} // Toggle modal visibility
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full"
          src={
            user?.profilePhoto
              ? `http://localhost:3000/${user?.profilePhoto}`
              : "https://via.placeholder.com/50"
          }
          alt="User avatar"
        />
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-[200]">
            <p className="text-center text-gray-700 mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={() => setIsModalOpen(false)} 
              >
                Cancel
              </button>
            </div>
          </div>
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
          ></div>
        </div>
      )}
    </div>
  );
};

export default function Nav() {
  const [active, setActive] = useState("home");
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-blue-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
              </svg>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavigationItem
                href="#"
                text="Home"
                isActive={active}
                setActive={setActive}
              />
              <NavigationItem
                href="#"
                text="Explore"
                isActive={active}
                setActive={setActive}
              />
              <NavigationItem
                href="#"
                text="Notifications"
                isActive={active}
                setActive={setActive}
              />
              <NavigationItem
                href="#"
                text="Messages"
                isActive={active}
                setActive={setActive}
              />
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <UserProfile user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
}
