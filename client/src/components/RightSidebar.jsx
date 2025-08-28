import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { imagesDummyData } from "../assets/assets";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const RightSidebar = () => {

  const {selectedUser, messages} = useContext(ChatContext)
  const {logout, onlineUsers} = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  //get all the images from the messages and set them to state
  useEffect(() => {
    setMsgImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    )
  },[messages])
  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="w-20 aspect-[1/1] rounded-full"
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
            {selectedUser.fullName}
            {onlineUsers.includes(selectedUser._id) ? 
              (<span className="w-2 h-2 rounded-full bg-green-500"></span>) :
              (<span className="w-2 h-2 rounded-full bg-red-500"></span>) 
            }
          </h1>
          <p className="px-10 mx-auto">{selectedUser.bio}</p>
        </div>
        {/* Media section */}
        <div className="mt-8 px-8">
          <h2 className="text-lg font-semibold mb-3">Media</h2>
          <div className="grid grid-cols-3 gap-2">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img src={url} alt="" className="h-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
        {/* Logout button */}
        <div className="absolute bottom-8 left-0 w-full flex justify-center">
          <button onClick={() => logout()}className="bg-violet-500 hover:bg-violet-600 transition px-8 py-2 rounded-full font-semibold text-white">
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default RightSidebar;
