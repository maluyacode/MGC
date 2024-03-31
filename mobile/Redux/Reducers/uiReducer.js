import * as uiAction from '../Constants/uiConstants'

export const uiReducer = (state = {}, action) => {
    switch (action.type) {
        case uiAction.TOGGLE_TAB:
            return {
                ...state,
                isTabShow: action.payload,
            }
    }
    return state
}