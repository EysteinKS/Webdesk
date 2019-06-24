import React, { useState, useEffect } from "react";
import { SignOut } from "../components/Auth";
import UserSettings from "../components/UserSettings";
import { useSelector } from "react-redux";

import Dialog from "@material-ui/core/Dialog";

export default () => {
  const avatarUrl = useSelector(state => state.auth.user.avatarUrl);
  const [currentModal, setCurrentModal] = useState(false);
  const closeModal = () => setCurrentModal(false);

  return (
    <>
      <div style={{ display: "grid", placeItems: "center" }}>
        <h3>Profile</h3>
        {avatarUrl && <Avatar url={avatarUrl} setModalOpen={setCurrentModal} />}
        <UserSettings />
        <SignOut />
      </div>
      <Dialog scroll="paper" open={Boolean(currentModal)} onClose={closeModal}>
        <ProfileModal type={currentModal} />
      </Dialog>
    </>
  );
};

const ProfileModal = ({ type }) => {
  if (type === "avatar") {
    return <AvatarModal />;
  }
  return null;
};

const AvatarModal = () => {
  const avatarUrl = useSelector(state => state.auth.user.avatarUrl);
  const [url, setUrl] = useState(avatarUrl);
  console.log(url);
  useEffect(() => {
    setUrl(avatarUrl);
  }, [avatarUrl, setUrl]);
  return (
    <form
      style={{
        height: "50vh",
        width: "50vw",
        display: "grid",
        gridTemplateColumns: "4fr 1fr"
      }}
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <img
        style={{ gridColumn: "1/3", width: "30vw", placeSelf: "center" }}
        src={url}
        alt="Avatar"
      />
      <input type="url" value={url} onChange={e => setUrl(e.target.value)} />
      <button onClick={() => setUrl(url)}>Save</button>
    </form>
  );
};

export const Avatar = ({ url, setModalOpen }) => {
  const imgStyle = { width: "20vw", maxHeight: "30vh", position: "relative" };
  const buttonStyle = { right: "40%", position: "absolute" };
  const handleMouseHover = () => {
    console.log("Setting hovering to ", !hovering);
    setHovering(!hovering);
  };
  const [hovering, setHovering] = useState(false);
  const toggleModal = () => setModalOpen("avatar");

  return (
    <div
      style={{ width: "20vw", minHeight: "20vh", margin: "5vw" }}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      <img style={imgStyle} src={url} alt="Avatar" onClick={toggleModal} />
      {hovering && (
        <button style={buttonStyle} onClick={toggleModal}>
          edit
        </button>
      )}
    </div>
  );
};
