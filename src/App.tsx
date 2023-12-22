import { Route, Routes } from 'react-router-dom'
import './globals.css'
import SignInForm from './auth/forms/SignInForm'
import SignUpForm from './auth/forms/SignUpForm'
import {Home} from './root/pages'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'
import { Toaster  } from './components/ui/toaster'

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
            </Route>
        </Routes>
        <Toaster/>
    </main>
  )
}

export default App