import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'

const Layout = ({children}) => {
    return(
        <LayoutContainer>
            <Navbar/>
            <div className="container pad-top">{children}</div>
        </LayoutContainer>
    )
}

const LayoutContainer = styled.div`

`

export default Layout


