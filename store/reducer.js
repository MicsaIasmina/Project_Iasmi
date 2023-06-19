import * as actionTypes from "./actions/actions";

const initialState = {
  user: {
    username: null,
    accountType: null,
    token: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: {
          username: action.username,
          accountType: action.accountType,
          token: action.token,
        },
      };
    default: {
      return state;
    }
  }
};

export default reducer;
