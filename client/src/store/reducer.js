const initState = {
  accountID: null,
  likedQuestions: []
};

const reducer = (state = initState, action) => {
  if (action.type === 'SET_ACCOUNT') {
    return {
      ...state,
      accountID: action.accountID,
      likedQuestions: action.likedQuestions
    };
  }

  if (action.type === 'UPDATE_LIKED_QUESTIONS') {
    return { ...state, likedQuestions: action.likedQuestions };
  }

  return state;
};

export default reducer;
