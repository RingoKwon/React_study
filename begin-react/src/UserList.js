import React from "react";

function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          color: user.active ? "green" : "black",
          cursor: "pointer",
        }}
      >
        {user.username}
      </b>{" "}
      <span>{user.email}</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
      <button onClick={() => onToggle(user.id)}>
        {user.active ? "비활성화" : "활성화"}
      </button>
    </div>
  );
}
function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default UserList;
