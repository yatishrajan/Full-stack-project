import React from 'react'
import Postform  from '../component/post-form/Postform.jsx'
import Container from '../component/Container.jsx'
function Addpost(){
    return(
    <div className='py-8'>
       <Container>
            <Postform/>
       </Container>
       </div>
    )
}
export default Addpost;