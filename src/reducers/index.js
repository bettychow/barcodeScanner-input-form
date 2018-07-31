import { combineReducers } from 'redux'
import { GET_ALL_UPC, ADD_UPC, DUPLICATE_UPC } from '../actions'

const upc = (state={allUPC: [], upc: '', productName: '', message: ''}, action) => {
  switch(action.type) {
    case GET_ALL_UPC:
      return {
        ...state,
        allUPC: action.payload
      }
    case ADD_UPC:
      return {
        ...state,
        upc: action.payload.upc,
        productName: action.payload.product_name,
        message: `Product: ${action.payload.product_name}\nUPC: ${action.payload.upc} successfully added to database`
      }
    case DUPLICATE_UPC:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state
  }
}

export default combineReducers({
  upc
})