/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useReducer } from 'react';
import { AuthContext } from './authContext';

interface ContextType {
  data: any;
  dispatch: React.Dispatch<{ type: any; payload: { uid: number } }>;
}

export const ChatContext = createContext<ContextType | null>(null);

export const ChatContextProvider = ({ children }: { children: any }) => {
  const { currentUser }: any = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  };

  const chatReducer = (
    state: any,
    action: { type: any; payload: { uid: number } }
  ) => {
    switch (action.type) {
      case 'CHANGE_USER':
        if (action.payload && currentUser.uid) {
          return {
            user: action.payload,
            chatId:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
          };
        } else {
          return state;
        }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
