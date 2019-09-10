export const actionCreator = (type: string, payload?: any) => {
  if(typeof payload !== "undefined"){
    console.log("actionCreator payload: ", payload)
  }
  console.log("action created: ", {
    type,
    payload: payload
  })
  if(typeof payload !== "undefined"){
    return {
      type: type,
      payload: payload
    }
  } else {
    return { type: type }
  }
}