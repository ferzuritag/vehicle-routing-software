import actions from "../actions";

function appReducer(state: any, action: any) {
  const appendToState = (params: any) => ({ ...state, ...params });

  switch (action.type) {
    case actions.SET_IS_LOGGED:
      return appendToState({
        IS_LOGGED: action.payload,
      });
    case actions.CHANGE_MENU_PROBLEMS:
      return appendToState({
        MENU_PROBLEMS: action.payload,
      });
    default:
      break;
  }
}

export default appReducer;
