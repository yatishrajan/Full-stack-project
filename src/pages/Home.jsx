import React,{useEffect, useState} from 'react'
import serviceobj from '../appwrite/config.js'
import Post from '../component/Post.jsx'
import Container  from '../component/Container.jsx';
function Home(){
    const [posts,addposts]=useState([]);
    useEffect(()=>{
             serviceobj.getselecteddocument().then(
                (posts)=>{
                  addposts(posts.documents) 
                  
                }
             )
    },[])
    return(
        <div className='py-8'> 
                <Container>
                    {  posts.length === 0 ? (
                         <div className="w-full py-8 mt-4 text-center">
                         
                             <div className="flex flex-wrap">
                                 <div className="p-2 w-full">
                                     <h1 className="text-2xl font-bold hover:text-gray-500">
                                         Login to read posts
                                     </h1>
                                 </div>
                             </div>
                        
                     </div>
                    ) : (
                        <div className='w-full py-8'>
                           <div className='flex flex-wrap'>
                                {posts.map((post)=>(
                                    <div key={post.$id} className='p-2 w-1/4'>
                                        <Post {...post}/>
                                        </div>
                                ))     
                                }
                           </div>
                        </div>
                    )}
                </Container>
        </div>
    )
}
export default Home;