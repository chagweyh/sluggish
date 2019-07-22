const initialState = { isAuthenticated: false, user: null };

const appStateReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, isAuthenticated: true };
    }
    case 'LOAD_USER': {
      return { ...state, user: action.user };
    }
    case 'LOGOUT': {
      return { isAuthenticated: false, user: null };
    }
    case 'STAR_CHANNEL': {
      return {
        ...state,
        user: { ...state.user, stars: [...state.user.stars, action.channel] },
      };
    }
    case 'UNSTAR_CHANNEL': {
      return {
        ...state,
        user: {
          ...state.user,
          stars: state.user.stars.filter(
            (channel) => channel !== action.channel,
          ),
        },
      };
    }
    default:
      return state;
  }
};

export { initialState };
export default appStateReducer;
