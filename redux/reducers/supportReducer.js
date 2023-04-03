import {  SEND_SUPPORT_TICKET, SEND_SUPPORT_TICKET_ERROR, SUPPORT_TOGGLE_LOADING } from "../actions/types"

// For the initial state we will have an object that will contain the following items:
const initialState = {
    loading: false,
    actionMessage: null,
    errors: null
}

export default function (state = initialState, action) {

    const { type, payload } = action

    switch (type) {

        case SEND_SUPPORT_TICKET:
            return {
                ...state,
                actionMessage: payload,
                errors: null,
                loading: false,
            }
        case SEND_SUPPORT_TICKET_ERROR:
            return {
                ...state,
                actionMessage: null,
                errors: payload,
                loading: false,
            }

        case SUPPORT_TOGGLE_LOADING:
            return {
                ...state,
                loading: true
            }

        default: return state


    }
}