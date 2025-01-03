import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Stats from './Stats'

const HomeAdmin = () => {
  return (
    <div className="dashboard">
       <Sidebar />

       <div className="content">
        <Header />
        <Stats />
      </div>

    </div>
  )
}
export default HomeAdmin
