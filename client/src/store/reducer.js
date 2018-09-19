const initState = {
  accountID: null
};

const reducer = (state = initState, action) => {
  if (action.type === 'SET_ACCOUNT') {
    return {
      ...state,
      accountID: action.accountID
    };
  }

  return state;
};

export default reducer;
