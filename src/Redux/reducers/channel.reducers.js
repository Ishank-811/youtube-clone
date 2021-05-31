import { CHANNEL_DATAILS_FAIL, CHANNEL_DATAILS_REQUEST, CHANNEL_DATAILS_SUCCESS, SET_SUBSCRIPTION_STATUS } from "./actionType"

export const channelDetailReducer = (
    state = {
       loading: true,
       channel: {},
       subscriptionstatus:false
    },
    action
 ) => {
    const { payload, type } = action
 
    switch (type) {
       case CHANNEL_DATAILS_REQUEST:
          return {
             ...state,
             loading: true,
          }
       case CHANNEL_DATAILS_SUCCESS:
          return {
             ...state,
             channel: payload,
             loading: false,
          }
       case CHANNEL_DATAILS_FAIL:
          return {
             ...state,
             channel: null,
             loading: false,           
             error: payload,
          }
          case SET_SUBSCRIPTION_STATUS:
              return{
                  ...state, 
                  subscriptionstatus:payload
              }
       default:
          return state
    }
 }