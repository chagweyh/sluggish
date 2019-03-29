import React, { useReducer } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
  const contextValue = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_USER':
        return action.user;
      case 'STAR_CHANNEL':
        return { ...state, stars: [...state.stars, action.channel] };
      case 'UNSTAR_CHANNEL':
        return Object.assign({}, state, {
          stars: state.stars.filter((channel) => channel !== action.channel),
        });
      default:
        return state;
    }
  }, {});

  return <UserContext.Provider value={contextValue} children={children} />;
}

export { UserContext, UserProvider };
