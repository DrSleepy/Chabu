const mapDispatchToProps = dispatch => {
  return {
    setAccount: ({ accountID, likedQuestions }) => dispatch({ type: 'SET_ACCOUNT', accountID, likedQuestions }),
    unsetAccount: () => dispatch({ type: 'UNSET_ACCOUNT' }),
    updateLikedQuestions: likedQuestions => dispatch({ type: 'UPDATE_LIKED_QUESTIONS', likedQuestions })
  };
};

export default mapDispatchToProps;
