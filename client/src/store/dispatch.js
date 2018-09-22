const mapDispatchToProps = dispatch => {
  return {
    setAccount: ({ accountID, likedQuestions }) => dispatch({ type: 'SET_ACCOUNT', accountID, likedQuestions }),
    unsetAccount: () => dispatch({ type: 'UNSET_ACCOUNT' })
  };
};

export default mapDispatchToProps;
