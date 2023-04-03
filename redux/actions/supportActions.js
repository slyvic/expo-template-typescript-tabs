import axios from "axios"
import { CLEAR_ERRORS, SUPPORT_TOGGLE_LOADING, SEND_SUPPORT_TICKET, SEND_SUPPORT_TICKET_ERROR, CLEAR_ACTION_MESSAGE } from "../actions/types";
import { API_URL } from '../../constants/Strings.ts'
import { Alert } from "react-native";

// Send ticket
export const sendTicket = (name, message, email, userId, navigation) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, message, email, userId })

    try {
        dispatch({ type: SUPPORT_TOGGLE_LOADING })
        const res = await axios.post(`${API_URL}/api/support/ticket`, body, config)


        dispatch({
            type: SEND_SUPPORT_TICKET,
            payload: res.data.msg
        })

        if (res?.data?.msg) {
            Alert.alert(`${res.data.msg.title} 😄`, res.data.msg.text, [
                {
                    text: 'Entendido',
                    style: 'cancel',
                },
            ])
        }

        navigation.navigate('Conversor')
    } catch (error) {

        dispatch({
            type: SEND_SUPPORT_TICKET_ERROR,
            payload: error.response.data
        })

        if (error?.response?.data?.errorMsg) {
            Alert.alert(error.response.data.errorMsg.title, error.response.data.errorMsg.text, [
                {
                    text: 'Entendido',
                    style: 'cancel',
                },
            ])
        }


       navigation.navigate('Conversor') 
    }
}

// Clear action message
export const clearActionMessage = () => async dispatch => {

    dispatch({
        type: CLEAR_ACTION_MESSAGE,
    })

}


// Clear errors
export const clearErrors = () => async dispatch => {

    dispatch({
        type: CLEAR_ERRORS,
    })

}
