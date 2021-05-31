import {createStore , applyMiddleware , combineReducers} from "redux"; 
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk"; 
import {authreducer} from "../Redux/reducers/auth.reducers"; 
import {homeVideoReducer} from "../Redux/reducers/video.reducer" ; 
import {selectedVideoReducer,relatedvideoreducer,searchedVideosReducer ,channelVideosReducer, subscriptionsChannelReducer} from "../Redux/reducers/video.reducer"; 
import { channelDetailReducer } from "./reducers/channel.reducers";
import {commentlistreducer} from "./reducers/comments.reducer"
const rootreducers = combineReducers({
    auth:authreducer,
    homevideo:homeVideoReducer, 
    selectedVideo:selectedVideoReducer,
    channeldetails:channelDetailReducer,
    commentlists:commentlistreducer,
    relatedvideo:relatedvideoreducer,
    searchedVideos:searchedVideosReducer,
    subscriptionsChannel:subscriptionsChannelReducer , 
    channelVideos:channelVideosReducer,

})
const store = createStore(
    rootreducers , 
    {},     
    composeWithDevTools(applyMiddleware(thunk))

)
export default store