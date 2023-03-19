import React from 'react'
import Auth from './Auth'
import Blogs from './Blogs'

const landingPage = ({setValue, refreshPage, setRefreshPage}) => {
  return (
    <div>
        {localStorage.getItem("userId") && 
        <Blogs setValue={setValue} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>
        }
        {!localStorage.getItem("userId") && 
        <Auth setValue={setValue} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>        
        }
    </div>
  )
}

export default landingPage