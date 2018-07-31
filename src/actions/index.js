export const GET_ALL_UPC = 'GET_ALL_UPC'
export const getAllUPC = () => {
  return async dispatch => {
    const response = await fetch(`https://shielded-island-81387.herokuapp.com/upc`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()

    dispatch({
      type: GET_ALL_UPC,
      payload: JSONres
    })
  }
}

export const ADD_UPC = 'ADD_UPC'
export const DUPLICATE_UPC = 'DUPLICATE_UPC'
export const addUPC = (product_name, upc) => {
 
  return async dispatch => {
    const response = await fetch(`https://shielded-island-81387.herokuapp.com/upc`, {
      method: 'POST',
      body: JSON.stringify({product_name, upc}),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()

    if(typeof JSONres === 'string') {
      dispatch({
        type: DUPLICATE_UPC,
        payload: JSONres
      })
    } else {
      dispatch({
        type: ADD_UPC,
        payload: JSONres[0]
      })
    }
  }
}

