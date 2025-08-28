import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  // Use authUser values if available
  const [name, setName] = useState(authUser?.fullName || "Martin Johnson");
  const [bio, setBio] = useState(
    authUser?.bio || "Hi Everyone, I am Using QuickChat"
  );
  const [selectedImg, setSelectedImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If no image selected, just update name + bio
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }

    // Convert image to Base64 and send it with other fields
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);

    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({
        fullName: name,
        bio,
        profilePic: base64Image,
      });
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-violet-700 opacity-30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-400 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-fuchsia-500 opacity-20 rounded-full blur-2xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-3xl mx-auto flex bg-gradient-to-br from-[#2d2250]/80 via-[#3a2d6a]/70 to-[#6d4aff]/60 backdrop-blur-2xl border border-violet-200/40 rounded-2xl shadow-2xl overflow-hidden">
        <form
          className="flex-1 flex flex-col gap-6 p-10"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-white mb-2">
            Profile details
          </h2>

          {/* Profile image upload */}
          <div className="flex items-center gap-4 mb-2">
            <label
              htmlFor="profileImg"
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {selectedImg ? (
                  <img
                    src={URL.createObjectURL(selectedImg)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-gray-200 mt-1">
                Upload profile image
              </span>
              <input
                id="profileImg"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSelectedImg(e.target.files[0])}
              />
            </label>
          </div>

          {/* Full Name input */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-300 text-white placeholder-gray-300 outline-none focus:border-violet-400 transition"
            required
          />

          {/* Bio input */}
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-300 text-white placeholder-gray-300 outline-none focus:border-violet-400 transition resize-none"
          />

          {/* Save button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-bold text-lg shadow-lg transition mt-2"
          >
            Save
          </button>
        </form>

        {/* Right-side chat bubble illustration */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          {authUser?.profilePic ? (
            <img
              src={authUser.profilePic}
              alt="Profile"
              className="w-44 h-44 rounded-full object-cover"
            />
          ) : (
            <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
              <ellipse cx="100" cy="100" rx="90" ry="80" fill="#a084ee" />
              <ellipse cx="70" cy="110" rx="8" ry="8" fill="white" />
              <ellipse cx="100" cy="110" rx="8" ry="8" fill="white" />
              <ellipse cx="130" cy="110" rx="8" ry="8" fill="white" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
