import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import "../styles/friendList.css"; // Ensure this file exists for styling

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axiosInstance.get("/student/friends");
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends", error);
    }
  };

  const handleFriendAdded = () => {
    fetchFriends();
    setShowAddForm(false);
  };

  const handleFriendDeleted = () => {
    fetchFriends();
    setShowDeleteForm(false);
  };

  return (
    <div className="friend-list">
      <h2>Friend List</h2>
      <div className="friend-button">
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Cancel" : "Add Friend"}
        </button>
        <button onClick={() => setShowDeleteForm(!showDeleteForm)}>
          {showDeleteForm ? "Cancel" : "Delete Friend"}
        </button>
      </div>

      {/* Conditionally render Add and Delete forms */}
      {showAddForm && <AddFriendForm onFriendAdded={handleFriendAdded} />}
      {showDeleteForm && <DeleteFriendForm onFriendDeleted={handleFriendDeleted} />}

      <h3>Friends List</h3>
      <table className="FriendTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>PRN Number</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend) => (
            <tr key={friend.id}>
              <td>{friend.id}</td>
              <td>{friend.first_name+" "+friend.last_name}</td>
              <td>{friend.prn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddFriendForm = ({ onFriendAdded }) => {
  const [prn, setPrn] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the POST request to include the PRN in the URL
      await axiosInstance.post(`/student/friend/${prn}`);
      alert("Friend added successfully");
      setPrn("");
      if (onFriendAdded) onFriendAdded();
    } catch (error) {
      console.error("Error adding friend", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Add Friend</h3>
      <label>
        PRN Number:
        <input
          type="text"
          value={prn}
          onChange={(e) => setPrn(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Friend</button>
    </form>
  );
};
// DeleteFriendForm Component
const DeleteFriendForm = ({ onFriendDeleted }) => {
  const [friendId, setFriendId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.delete(`/student/friend/${friendId}`);
      alert("Friend deleted successfully");
      setFriendId("");
      if (onFriendDeleted) onFriendDeleted();
    } catch (error) {
      console.error("Error deleting friend", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Delete Friend</h3>
      <label>
        Friend ID:
        <input
          type="text"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
          required
        />
      </label>
      <button type="submit">Delete Friend</button>
    </form>
  );
};

export default FriendList;
