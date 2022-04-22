export function userReducer(state = null,action){
    switch(action.type){  // need type and payload
      case 'LOGGED_IN_USER':
        return action.payload;
      case 'LOGOUT':
        localStorage.clear();
        return action.payload;
      default:
        return state;
    }
}