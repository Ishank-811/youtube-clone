import React  ,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import { getSubscribedChannels } from '../../Redux/actions/videos.action'
import "./SubscriptionScreen.scss"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import VideoHorizontal from "../../Component/videoHorizontal/VideoHorizontal"; 
const SubscriptionSreen = () => {
    
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(getSubscribedChannels()) ; 
    }, [dispatch])
    const { loading, videos } = useSelector(state => state.subscriptionsChannel)

    return (
       <Container fluid>
          {!loading ? (
             videos?.map(video => (
                <VideoHorizontal video={video} key={video.id} subScreen />
             ))
          ) : (
             <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                <Skeleton width='100%' height='160px' count={20} />
             </SkeletonTheme>
          )}
       </Container>
    )
 
}

export default SubscriptionSreen
