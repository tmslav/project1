// Constants
export const FETCH_PLACEMENTS = "FETCH_PLACEMENTS"
export const ADD_PLACEMENT = "ADD_PLACEMENT"
export const REMOVE_PLACEMENT = "REMOVE_PLACEMENT"
export const ADD_PUBLISHER = "ADD_PUBLISHER"
export const REMOVE_PUBLISHER = "REMOVE_PUBLISHER"
export const COMMIT = "COMMIT"


// export const constants = { };

// Action Creators
export function handleCommit ( data = []){
  return {
    type: COMMIT,
    payload: data
  }
}
export function handlePlacements (data = [] ){
  return {
    type: FETCH_PLACEMENTS,
    payload: data
  }
}
export function handleAddPlacement( placement = []){
  return {
    type: ADD_PLACEMENT,
    payload: placement
  }
}

export function handleRemovePlacement(placement =[]){
  return {
    type: REMOVE_PLACEMENT,
    payload: placement.id
  } 
}
export function handleAddPublisher( publisher = []){
  return {
    type: ADD_PUBLISHER,
    payload: publisher
  }
}

export function handleRemovePublisher(publisher =[]){
  return {
    type: REMOVE_PUBLISHER,
    payload: publisher.id
  } 
}

export function getPlacements(){
  return dispatch => {
    fetch("/dummyData.json")
      .then(res => res.json())
      .then(d => dispatch(handlePlacements(d)))
  }
}
export function commit(data){
  return handleCommit(data)

}

export function addPlacement (placement) {
  return handleAddPlacement(placement)
}
export function removePlacement(placement){
  return handleRemovePlacement(placement)
}
export function addPublisher (publisher) {
  return handleAddPublisher(publisher)
}
export function removePublisher(publisher){
  return handleRemovePublisher(publisher)
}
// Reducer
export const defaultState = {};
export default function(state = defaultState, action) {
  let newState = null
  switch (action.type) {
  case FETCH_PLACEMENTS:
    return action.payload
  case COMMIT:
      const body = {
        article : null,
        title : state.articleText,
        description : state.articleDescription,
        contributors: state.placements.selectedPublisher,
        placements : state.placements.selectedPlacemetns
      }

      fetch("http://localhost:8000/api/article",
          {method:"POST",body:data})
      //TODO add what happens after commit to store
      return state
  case ADD_PLACEMENT:
      if (!state.selectedPlacements)
        newState = {...state,selectedPlacements:[]}
      else
        newState = {...state,selectedPlacements:state.selectedPlacements}
      newState.selectedPlacements.push(action.payload)
      return newState
  case REMOVE_PLACEMENT:
      return {...state, selectedPlacements: state.selectedPlacements.filter(item => item.id != action.payload)}  

  case ADD_PUBLISHER:
      if (!state.selectedPublisher)
        newState = {...state,selectedPublisher:[]}
      else
        newState = {...state,selectedPublisher:state.selectedPublisher}
      newState.selectedPublisher.push(action.payload)
      return newState

  case REMOVE_PUBLISHER:
      return {...state, selectedPublisher: state.selectedPublisher.filter(item => item.id != action.payload)}  

  default:
    return state;
  }
}
