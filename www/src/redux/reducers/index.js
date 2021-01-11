import { LOG_IN, LOG_OUT } from "../constants/action-types";

// state object

const initialState = {
  user: { isStudent: false, isTeacher: false, isAdmin: false },
  video: { id: 0 }
};

function rootReducer(state = initialState, action) {
  if (action.type === LOG_IN) {
    state = {
      ...state,
      user: action.details
    }
  } else if (action.type === LOG_OUT) {
    state = {
      ...state,
      user: { isStudent: false, isTeacher: false, isAdmin: false }
    }
  }
  return state;

};

export default rootReducer;
