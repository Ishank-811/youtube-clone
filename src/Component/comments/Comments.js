import React, { useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Comment from '../../Component/Comment/Comment.js'
import './_comments.scss'
import {addComment, getcommentsofvideobyid} from "../../Redux/actions/comment.actions"
const Comments = ({videoId , totalcomment}) => {
   console.log(videoId);
   const dispatch = useDispatch() ; 
    useEffect(() => {
    
  dispatch(getcommentsofvideobyid(videoId)); 
    }, [videoId, dispatch])

   const {comments,loading}  = useSelector(state => state.commentlists) ; 
 
   const [text, setText] = useState('') 
  if(!loading){
    var _comments =  comments?.map(comment=>comment.snippet.topLevelComment.snippet) ; 
  }
   
   
   const handleComment = (e) => {
      e.preventDefault()
      if (text.length === 0) return

       dispatch(addComment(videoId, text))

      setText('')
   }
   return (
      <div className='comments'>
         <p>{totalcomment}</p>
         <div className='comments__form d-flex w-100 my-2'>
            <img
               src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
               alt=''
               className='rounded-circle mr-3'
            />
            <form onSubmit={handleComment} className='d-flex flex-grow-1'>
               <input
                  type='text'
                  className='flex-grow-1'
                  placeholder='Write a comment...'
                  value={text}
                  onChange={e => setText(e.target.value)}
           />
               <button className='border-0 p-2'>Comment</button>
        </form>
        </div>
        <div className='comments__list'>
       
       
        {!loading && _comments.map((comment , i) => (
               <Comment comment={comment}  key={i} />
            ))}
         </div>
      </div>
   )
}

export default Comments