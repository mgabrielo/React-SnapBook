import { Route, Routes } from 'react-router-dom'
import './globals.css'
import SignInForm from './auth/forms/SignInForm'
import SignUpForm from './auth/forms/SignUpForm'
import {Home} from './root/pages'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'
import { Toaster  } from './components/ui/toaster'
import Explore from './root/pages/Explore'
import Saved from './root/pages/Saved'
import AllUsers from './root/pages/AllUsers'
import CreatePost from './root/pages/CreatePost'
import EditPost from './root/pages/EditPost'
import PostDetails from './root/pages/PostDetails'
import Profile from './root/pages/Profile'
import UpdateProfile from './root/pages/UpdateProfile'

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public */}
            <Route element={<AuthLayout/>}>
            <Route path='/sign-in' element={<SignInForm/>}/>
            <Route path='/sign-up' element={<SignUpForm/>}/>
            </Route>
            {/* private */}
            <Route element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/saved' element={<Saved/>}/>
            <Route path='/all-users' element={<AllUsers/>}/>
            <Route path='/create-post' element={<CreatePost/>}/>
            <Route path='/update-post' element={<EditPost/>}/>
            <Route path='/posts/:id' element={<PostDetails/>}/>
            <Route path='/profile/:id/*' element={<Profile/>}/>
            <Route path='/update-profile/:id/*' element={<UpdateProfile/>}/>
            </Route>
        </Routes>
        <Toaster/>
    </main>
  )
}

export default App