// Constants
export const FETCH_PLACEMENTS = "FETCH_PLACEMENTS"

// export const constants = { };

// Action Creators
export function handlePlacements (data = [] ){
  return {
    type: FETCH_PLACEMENTS,
    payload: data
  }
}

// export const actions = { };
export function getPlacements(){
  return dispatch => {
    fetch("/dummyData.json")
      .then(res => res.json())
      .then(d => dispatch(handlePlacements(d)))
  }
}

// Reducer
export const defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
  case FETCH_PLACEMENTS:
    return action.payload
  default:
    return state;
  }
}
