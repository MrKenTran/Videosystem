// Action types
import { LOG_IN } from "../constants/action-types";
import { LOG_OUT } from "../constants/action-types";

// Action creators (funksjonene, actions er innholdet i funksjonene)
export function logIn(user) {
  return {
    type: LOG_IN,
    details: user
  }
}

export function logOut() {
  return {
    type: LOG_OUT
  }
}
