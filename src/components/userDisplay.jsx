import React from "react";

import { userDiv, userName, userAvatar } from "../styles/user.module.css";

export default function UserDisplay({ user }) {
  return (
    <div className={userDiv}>
      <img src={user.avatarUrl} className={userAvatar}/>
      <div className={userName}>{user.name}</div>
    </div>
  );
}
