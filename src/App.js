import React, { Fragment } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import {routes} from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import HeaderComponent from './components/Others/Header/HeaderComponent/HeaderComponent'
import { AppProvider } from './contexts/AppContexts'

function App() {
  
  return (
    <div>
     <AppProvider>
      <Router>
        <Routes>
          {routes.map((route)=>{
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route path= {route.path} element={
                <Layout>
                  <Page></Page>
                </Layout>
                }/>
            )
          }

          )}
          
        </Routes>
      </Router>
      </AppProvider>
    </div>
  )
}

export default App