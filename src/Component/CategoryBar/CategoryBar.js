import React , {useState} from 'react'
import "./_CategoryBar.scss"
import {useDispatch} from "react-redux" ; 
import { getpopularvideos, getvideosbycategory } from '../../Redux/actions/videos.action';
const keywords = [
    'All',
    'React js',
    'Angular js',
    'React Native',
    'use of API',
    'Redux',
    'Music',
    'Algorithm Art ',
    'Guitar',
    'Bengali Songs',
    'Coding',
    'Cricket',
    'Football',
    'Real Madrid',
    'Gatsby',
    'Poor Coder',
    'Shwetabh',
 ]

 

const CategoryBar = () => {
    const [activeElement, setActiveElement] = useState('All')
 const dispatch = useDispatch() ;
 
    const handleClick = value => {
       setActiveElement(value)
       if(value==="All"){
dispatch(getpopularvideos()) ;
       }
       else
       dispatch(getvideosbycategory(value)) ; 
    }
    return (
        <div className='categoriesBar'>
           {keywords.map((value, i) => (
              <span
                 onClick={() => handleClick(value)}
                 key={i}
                 className={activeElement === value ? 'active' : ''}>
                 {value}
              </span>
           ))}
        </div>
     )
}
export default CategoryBar
