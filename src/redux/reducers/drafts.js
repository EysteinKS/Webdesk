export const loadBegin = (draft) => {
  draft.isLoading = true
  draft.isLoaded = false
  draft.loadingError = null
  return draft
}

export const loadSuccess = (draft, targets = [], payload) => {
  //console.log("Input of loadSuccess: ", {draft, targets, payload})
  draft.isLoading = false
  draft.isLoaded = true
  if(Array.isArray(targets)){
    //console.log("targets is array")
    targets.forEach(target => {
      draft[target] = payload
    })
  } else if(typeof targets === "string"){
    //console.log("targets is string")
    draft[targets] = payload
  }
  //console.log("Returning draft: ", draft)
  return draft
}

export const loadFailure = (draft, error) => {
  draft.isLoading = false
  draft.isLoaded = false
  draft.loadingError = error
  return draft
}

export const saveBegin = (draft) => {
  draft.isSaving = true
  draft.isSaved = false
  draft.savingError = false
  draft.error = null
  return draft
}

export const saveSuccess = (draft) => {
  draft.isSaving = false
  draft.isSaved = true
  return draft
}

export const saveFailure = (draft, error) => {
  draft.isSaving = false
  draft.isSaved = false
  draft.savingError = error
  return draft
}

export const resetReducer = (draft, init) => {
  draft = init
  return draft
}