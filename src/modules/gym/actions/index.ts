export const actionCreator = (type: string, payload?: any) => {
  if(payload){
    console.log("actionCreator payload: ", payload)
  }
  console.log("action created: ", {
    type,
    payload: payload
  })
  if(payload){
    return {
      type: type,
      payload: payload
    }
  } else {
    return { type: type }
  }
}