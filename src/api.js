import axios from "axios" ; 

const request =  axios.create({
    baseURL:"https://youtube.googleapis.com/youtube/v3/",
    params:{
        key:"AIzaSyBGbdT4g70rO2WT0xUG-e7Q19-wuLO1hKo",
    },
})
export default request