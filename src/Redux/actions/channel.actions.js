import { CHANNEL_DATAILS_FAIL, CHANNEL_DATAILS_REQUEST, CHANNEL_DATAILS_SUCCESS ,SET_SUBSCRIPTION_STATUS} from "../reducers/actionType";
import request from "../../api"; 
    export const getchanneldetails = id=>async(dispatch)=>{
        console.log(id) ;
        try{
            dispatch({
                type:CHANNEL_DATAILS_REQUEST
            }) 
            const {data} = await request('/channels', {
                params:{
                    part:'snippet,statistics,contentDetails', 
                    id:id,

                },
            })
        
            dispatch({
                type:CHANNEL_DATAILS_SUCCESS,
                payload:data.items[0]
            }) 
        }catch(err){
            dispatch({
                type:CHANNEL_DATAILS_FAIL,
                payload:err.message
            }) 
        }
    }    


export const checksubscriptionstatus = id=>async(dispatch , getState)=>{
    console.log(id) ;
    try{
       
        const {data} = await request('/subscriptions', {
            params:{
                part:'snippet', 
                forChannelId:id,
                mine:true
            },
            headers:{
                Authorization:`Bearer ${getState().auth.accessToken}`

            }
        })
    console.log(data); 
        dispatch({
            type:SET_SUBSCRIPTION_STATUS,
           payload:data.items.length!==0
        }) 
        console.log(data); 
    }catch(err){
      console.log(err); 
    }
}    