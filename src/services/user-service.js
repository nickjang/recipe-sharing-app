const UserService = {
  saveUserId(id) {
    window.localStorage.setItem('recipe-sharing-user-id', id)
  },
  getUserId() {
    return Number(window.localStorage.getItem('recipe-sharing-user-id'));
  },
  clearUserId() {
    window.localStorage.removeItem('recipe-sharing-user-id')
  }
}

export default UserService
