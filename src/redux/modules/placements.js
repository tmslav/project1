// Constants
export const FETCH_DATA = "FETCH_DATA"
export const ADD_PLACEMENT = "ADD_PLACEMENT"
export const REMOVE_PLACEMENT = "REMOVE_PLACEMENT"
export const ADD_PUBLISHER = "ADD_PUBLISHER"
export const REMOVE_PUBLISHER = "REMOVE_PUBLISHER"

export const SUBMIT = 'SUBMIT'
export const COMMIT = "COMMIT"

// Action Creators
export function handleArticleSubmit ( data = [] ) {
  return dispatch => {
    dispatch({type:SUBMIT,payload:data})
    dispatch({type: COMMIT,payload:''})
 }
}

export function handleInitData (data = [] ){
  return {
    type: FETCH_DATA,
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

export function getInitData(){
  return dispatch => {
    fetch("/dummyData.json")
      .then(res => res.json())
      .then(data => dispatch(handleInitData(data)))
  }
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
    case FETCH_DATA:
      return action.payload
    case SUBMIT:
        newState = {...state,article : { title: action.payload.articleTitle, description: action.payload.articleDescription } }
        return newState
    case COMMIT:
        const data = {
          article : null || '',
          title : state.article.title || '',
          description : state.article.description || '',
          contributors: state.selectedPublisher ? state.selectedPublisher.map(i => i.id) : '',
          placements : state.selectedPlacements ? state.selectedPlacements.map(i => i.id) : ''
        }
        const formData = new FormData()
        formData.append("json", JSON.stringify(data)) 
        fetch("http://localhost:8000/api/article",
            {
              method:"POST",
              body: formData,
              mode: 'no-cors'
            })
        return state
        //TODO add what happens after commit to store return state
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
