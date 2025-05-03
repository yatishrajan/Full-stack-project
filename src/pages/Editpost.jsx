import React,{useEffect, useState} from 'react'
import Postform from '../component/post-form/Postform'
import Container from '../component/Container.jsx'
import { useParams,useNavigate } from 'react-router-dom'
import serviceobj from '../appwrite/config.js'



function Editpost(){
    const [post,addpost]=useState()
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
    if(slug){
    serviceobj.getdocument(slug).then(
        (post)=>{
            if(post)
               addpost(post)
            else
               navigate('/')         
        }
    )}else{
        navigate('/')
    }},[slug,navigate])

    return(
        post ? (
            <div className='py-8'>
               <Container>
                            <Postform {...post}/>
                 </Container>
            </div>
        ) : null
    )
}
export default Editpost;