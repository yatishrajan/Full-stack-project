import React,{useEffect, useState} from 'react'
import Container from '../component/Container.jsx'
import Post from '../component/Post.jsx'
import serviceobj from '../appwrite/config.js'

function Allpost(){
  const [posts,addposts]=useState([])
  useEffect(() => {
    async function fetchData() {
        try {
            const post = await serviceobj.getselecteddocument([]);
            addposts(post.documents);
            console.log(post.documents);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    fetchData();
}, []);
     
    return(
          <div className='w-full py-8'>
            <Container>
            <div className='flex flex-wrap'>
            {posts.map((post)=>(
                <div className='p-2 w-1/4'>
                 <Post {...post}/>
                 </div>
            ))}
            </div>
            </Container>
          </div>
    )
}
export default Allpost;