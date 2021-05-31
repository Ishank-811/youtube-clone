import React , {useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch , useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Comments from '../../Component/comments/Comments.js'
import VideoHorizontal from '../../Component/videoHorizontal/VideoHorizontal'
import VideoMetaData from '../../Component/videoMataData/VideoMetaData.js'
import { getrelatedvideo, getvideobyid } from '../../Redux/actions/videos.action.js'
import './watchscreen.scss'
import {Helmet} from "react-helmet"; 

const WatchScreen = () => {
    const {id} = useParams(); 
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getvideobyid(id))
        dispatch(getrelatedvideo(id)) ;
     }, [dispatch, id])
      
    const {videos , realtedvideoloading} = useSelector(state => state.relatedvideo)
 

const {video,loading} = useSelector(state => state.selectedVideo);
console.log(loading); 
   return (
      <Row>
      <Helmet>
         <title>{video?.snippet?.title}</title>
      </Helmet>
         <Col lg={8}>
            <div className='watchScreen__player'>
               <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  frameBorder='0'
                  title={video?.snippet?.title}
                  allowFullScreen
                  width='100%'
                  height='100%'></iframe>
            </div>
{
    !loading?<VideoMetaData video={video} videoId={id} totalcomment={video?.statistics?.commentCount}/>:<h6>loading</h6>   
}

           
            <Comments videoId={id} />
         </Col>
         <Col lg={4}>
            {!loading ? realtedvideoloading && videos?.filter(video=>video.snippet).map((video) => ( 
               <VideoHorizontal  key={video.id.videoId} video={video} />
             )): 
             <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
             <Skeleton width="100%" height="130px" count={15} />
             </SkeletonTheme>
              }
         </Col>
      </Row>
   )
}

export default WatchScreen    