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

  if (action.type === 'UNSET_ACCOUNT') {
    return { ...state, accountID: null };
  }

  return state;
};

export default reducer;
