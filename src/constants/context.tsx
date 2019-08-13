import React, {useContext, useReducer, Context, Reducer} from 'react';
import { AnyAction } from 'redux';
//https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c

interface IProps {
  context: Context<any>,
  reducer: Reducer<any, AnyAction>,
  initialState: any
}

export const StateProvider: React.FC<IProps> = ({context, reducer, initialState, children}) =>(
  <context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </context.Provider>
)

export interface IMatchProps {
  state: string
  value: string
  initial?: boolean
}

export const Match: React.FC<IMatchProps> = ({ state, value, initial = false, children }) => {
  const [isEqual, setEqual] = React.useState(initial)

  React.useEffect(() => {
    if(state === value && !isEqual){
      setEqual(true)
    } else if(state !== value && isEqual) {
      setEqual(false)
    }
  }, [state, value])

  return !isEqual ? null : <>{children}</>
}