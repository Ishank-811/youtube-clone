import { COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS, CREATE_COMMENT_FAIL, CREATE_COMMENT_SUCCESS } from "../reducers/actionType";
import request from "../../api" ; 
export const getcommentsofvideobyid = id=>async(dispatch)=>{
    console.log(id) ;
    try{
        dispatch({
            type:COMMENT_LIST_REQUEST
        }) 
        const {data} = await request('/commentThreads', {
            params:{
                part:'snippet', 
                videoId:id,
            },
        })
    console.log(data); 
        dispatch({
            type:COMMENT_LIST_SUCCESS,
            payload:data.items,
        }) 
    }catch(error){
        console.log(error); 
        dispatch({
            type:COMMENT_LIST_FAIL,
            payload:error.message
        }) 
    }
}    

export const addComment = (id, text) => async (dispatch, getState) => {
    try {
       const obj = {
          snippet: {
             videoId: id,
             topLevelComment: {
                snippet: {
                   textOriginal: text,
                },
             },
          },
       }
       await request.post('/commentThreads', obj, {
          params: {
             part: 'snippet',
          },
          headers: {
             Authorization: `Bearer ${getState().auth.accessToken}`,
          },
       })
       dispatch({
          type: CREATE_COMMENT_SUCCESS,
       })
       setTimeout(() => dispatch(getcommentsofvideobyid(id)), 3000)
    } catch (error) {
       console.log(error.response.data)
       dispatch({
          type: CREATE_COMMENT_FAIL,
          payload: error.response.data.message,
       })
    }
 }