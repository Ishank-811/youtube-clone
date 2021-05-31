import React, {useEffect} from 'react'
import Video from '../../Component/Video/Video'
import{Col , Container , Row} from "react-bootstrap";
import CategoryBar from '../../Component/CategoryBar/CategoryBar';
import {useDispatch , useSelector} from "react-redux" ; 
import { getpopularvideos, getvideosbycategory } from '../../Redux/actions/videos.action';
import InfiniteScroll from "react-infinite-scroll-component" ; 
import SkeletonVideo from "../../Component/skeletons/skeletonVideos"; 
const Homescreen = () => {
    const {videos , activeCategory , loading} = useSelector(state => state.homevideo)
    const dispatch = useDispatch(); 
    const fetchData = ()=>{
        if(activeCategory==="All"){
        dispatch(getpopularvideos()); 
        }
        else{
            dispatch(getvideosbycategory(activeCategory)); 
        }   
    }
    useEffect(() => {
      dispatch(getpopularvideos()); 
    }, [dispatch])
    return (
       <Container>
           <CategoryBar/>
           <Row>
           <InfiniteScroll
           dataLength={videos.length}
           next={fetchData}
           hasMore={true}
           loader={
            <div className='spinner-border text-danger d-block mx-auto'></div>
           }
           className="row"
           >
               {!loading ? videos.map((video)=>(
               <Col  lg={3} md={4}>
                <Video video={video} key={video.id} ></Video>
               </Col>)):
                   [...Array(20)].map(()=>(
                    <Col  lg={3} md={4}>
                    <SkeletonVideo/>
                    </Col>
                   ))}
               </InfiniteScroll>
           </Row>
       </Container>
    )
}

export default Homescreen
