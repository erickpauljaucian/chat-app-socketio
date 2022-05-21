const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  
  console.log(`id: ${id} username: ${username} room: ${room} joined`)

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  console.log(`getting user with id: ${id}`)
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  console.log(`user with id: ${id} is leaving`)
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  console.log(`get users in room: ${room}`);
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
