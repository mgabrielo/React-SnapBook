import { useToast } from "@/components/ui/use-toast"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl,FormField, FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { signInValidation } from "@/lib/validation"
import Loader from "@/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import {  userSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SignInForm = () => {
  const {toast} = useToast()
  const navigate = useNavigate()
  const {checkAuthUser, isLoading: isUserLoading}= useUserContext()
  const {mutateAsync:signInAccount} = userSignInAccount()
  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password:""
    },
  })
  async function onSubmit ( values : z.infer<typeof signInValidation>,  e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const session =await signInAccount({email: values.email, password:values.password})
    if(!session){
      return toast({
        title:'Sign In Unsucessful',
        description:'Please Try Again'
      })
    }

    const isLoggedIn = await checkAuthUser()
    if(isLoggedIn){
      form.reset()
      navigate('/')
    }else{
      return toast({
        title:'Sign In Unsucessful',
        description:'Please Try Again'
      })
    }
  }
  return (
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          {/* <img src='/assets/images/logo.svg' alt="logo"/> */}
          <div style={{ display:'flex', alignItems:'center',gap:8}}>
                <img src="/assets/images/logo2.png" style={{height:'30px', width:'100%', position:'relative', objectFit:'cover',}} />
                <h1 className="h2-bold md:h1-bold text-purple-700">SnapBook</h1>
          </div>
          <h2 className="h4-bold md:h3-bold pt-5 sm:pt-12">Log Into Your Account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">Welcome Please Enter Your Details</p>
      
      <form 
      onSubmit={form.handleSubmit((data, e:any) => onSubmit(data, e))} 
      className=" flex flex-col gap-5 w-full mt-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
        type="submit"
        className="bg-violet-900 text-white"
        >
          {isUserLoading ? (
            <div className="flex-center gap-2">
              <Loader/> Loading...
            </div>
          ): "Sign In"}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2 mb-4">
            Don't have an Account ?
            <Link to={'/sign-up'} className="text-primary-500 text-small-semibold ml-1">Sign Up</Link>
        </p>
      </form>
      </div>
    </Form>
  )
}

export default SignInForm