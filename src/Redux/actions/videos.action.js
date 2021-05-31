import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCHED_VIDEO_FAIL, SEARCHED_VIDEO_REQUEST, SEARCHED_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS, SUBSCRIPTIONS_CHANNEL_FAIL, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS ,  
CHANNEL_VIDEOS_REQUEST,CHANNEL_DATAILS_FAIL,
 CHANNEL_VIDEOS_SUCCESS} from "../reducers/actionType";
import request from "../../api"; 
export const getpopularvideos =() =>  async(disapatch , getState)=>{
try{
disapatch({
    type:HOME_VIDEOS_REQUEST, 
})
const {data} =await request("/videos",{
    params:{
        part:'snippet , contentDetails, statistics',
        chart:'mostPopular',
        regionCode:'IN',
        maxResults:20,
        pageToken:getState().homevideo.nextPageToken, 
    }
})
disapatch({
    type:HOME_VIDEOS_SUCCESS , 
    payload:{
        videos:data.items ,
        nextPageToken :data.nextPageToken,
        category:"All"

    }
})




}catch(err){
    console.log(err); 
    disapatch({
        type:HOME_VIDEOS_FAIL , 
        payload:err.message
    })
}
}


export const getvideosbycategory =(keyword) =>  async(disapatch , getState)=>{
    console.log(keyword) ; 
    try{
    disapatch({
        type:HOME_VIDEOS_REQUEST, 
    })
    const {data} =await request("/search",{
        params:{
            part:'snippet',
            maxResults:20,
            pageToken:getState().homevideo.nextPageToken, 
            q:keyword,
            type:'video'
        }
    })
    disapatch({
        type:HOME_VIDEOS_SUCCESS , 
        payload:{
            videos:data.items ,
            nextPageToken :data.nextPageToken,
            category:keyword
    
        }
    })    
    }catch(err){
        console.log(err); 
        disapatch({
            type:HOME_VIDEOS_FAIL , 
            payload:err.message
        })
    }
    }

export const getvideobyid = id=>async(dispatch)=>{
    console.log(id) ;
    try{
        dispatch({
            type:SELECTED_VIDEO_REQUEST
        }) 
        const {data} = await request('/videos', {
            params:{
                part:'snippet,statistics', 
                id:id,

            },
        })
    
        dispatch({
            type:SELECTED_VIDEO_SUCCESS,
            payload:data.items[0]
        }) 
    }catch(err){
        dispatch({
            type:SELECTED_VIDEO_FAIL,
            payload:err.message
        }) 
    }
}    



export const getrelatedvideo = id=>async(dispatch)=>{
    console.log(id) ;
    try{
        dispatch({
            type:RELATED_VIDEO_REQUEST
        }) 
        const {data} = await request('/search', {
            params:{
                part:'snippet', 
                relatedToVideoId: id,
                maxResults:15,
                type:'video'

            },

        })
        console.log(data.items); 
        dispatch({
            type:RELATED_VIDEO_SUCCESS,
            payload:data.items
        })
    
     
    }catch(err){
        console.log(err)
         dispatch({
             type:RELATED_VIDEO_FAIL,
             payload:err.response.data.message
        }) 
    }
}    



export const getVideosBySearch = keyword => async dispatch => {
    try {
       dispatch({
          type: SEARCHED_VIDEO_REQUEST,
       })
       const { data } = await request('/search', {
          params: {
             part: 'snippet',
 
             maxResults: 20,
             q: keyword,
             type: 'video,channel',
          },
       })
 
       dispatch({
          type: SEARCHED_VIDEO_SUCCESS,
          payload: data.items,
       })
    } catch (error) {
       console.log(error.message)
       dispatch({
          type: SEARCHED_VIDEO_FAIL,
          payload: error.message,
       })
    }
 }


 export const searchedVideosReducer = (
    state = {
       loading: true,
       videos: [],
    },
    action
 ) => {
    const { payload, type } = action
 
    switch (type) {
       case SEARCHED_VIDEO_REQUEST:
          return {
             ...state,
             loading: true,
          }
       case SEARCHED_VIDEO_SUCCESS:
          return {
             ...state,
             videos: payload,
             loading: false,
          }
       case SEARCHED_VIDEO_FAIL:
          return {
             ...state,
             loading: false,
             error: payload,
          }
 
       default:
          return state
    }
 }
     

 export const getSubscribedChannels = () => async (dispatch, getState) => {
    try {
       dispatch({
          type: SUBSCRIPTIONS_CHANNEL_REQUEST,
       })
       const { data } = await request('/subscriptions', {
          params: {
             part: 'snippet,contentDetails',
 
             mine: true,
          },
          headers: {
             Authorization: `Bearer ${getState().auth.accessToken}`,
          },
       })
       dispatch({
          type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
          payload: data.items,
       })
    } catch (error) {
       console.log(error.response.data)
       dispatch({
          type: SUBSCRIPTIONS_CHANNEL_FAIL,
          payload: error.response.data,
       })
    }
 }


 export const getVideosByChannel = id => async dispatch => {
    try {
       dispatch({
          type: CHANNEL_VIDEOS_REQUEST,
       })
 
       // 1. get upload playlist id
       const {
          data: { items },
       } = await request('/channels', {
          params: {
             part: 'contentDetails',
             id: id,
          },
       })
       const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads
       // 2. get the videos using the id
       const { data } = await request('/playlistItems', {
          params: {
             part: 'snippet,contentDetails',
             playlistId: uploadPlaylistId,
             maxResults: 30,
          },
       })
 
       dispatch({
          type: CHANNEL_VIDEOS_SUCCESS,
          payload: data.items,
       })
    } catch (error) {
       console.log(error.response.data.message)
       dispatch({
          type: CHANNEL_DATAILS_FAIL,
          payload: error.response.data,
       })
    }
 }