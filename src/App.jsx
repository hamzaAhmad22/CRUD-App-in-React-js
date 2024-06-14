import React, { useState, useEffect } from 'react';
import UserForm from './userform';
import EditUser from './edituser';
import UserList from './userlist';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const addUser = (user) => {
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = { id, ...user };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowForm(false);
  };

  const editUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowEditForm(false);
    setCurrentUser(null);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setShowEditForm(true);
  };

  return (
    <div className="container">
      <h1>Login Form</h1>
      <button onClick={() => setShowForm(true)}>Add New User</button>
      {showForm && (
        <UserForm
          addUser={addUser}
          cancel={() => setShowForm(false)}
        />
      )}
      {showEditForm && (
        <EditUser
          currentUser={currentUser}
          editUser={editUser}
          cancel={() => setShowEditForm(false)}
        />
      )}
      <UserList users={users} deleteUser={deleteUser} editUser={handleEditClick} />
    </div>
  );
};

export default App;
