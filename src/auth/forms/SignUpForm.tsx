import { useToast } from "@/components/ui/use-toast"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl,FormField, FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { signUpValidation } from "@/lib/validation"
import Loader from "@/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { userCreateUserAccount, userSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SignUpForm = () => {
  const {toast} = useToast()
  const navigate = useNavigate()
  const {checkAuthUser, isLoading: isUserLoading}= useUserContext()
  const {mutateAsync: createUserAccount, isPending: isCreatingAccount } = userCreateUserAccount();
  const {mutateAsync:signInAccount, isPending:isSigningUser} = userSignInAccount()
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      name:"",
      username: "",
      email: "",
      password:""
    },
  })
  async function onSubmit ( values : z.infer<typeof signUpValidation>,  e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
   const newUser = await createUserAccount(values)
    if(!newUser){
      form.reset()
      return toast({
        title:'Sign Up Unsucessful',
        description:'Please Try Again'
      })
    }

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
          <h1 className="h2-bold md:h1-bold pt-5 sm:pt-12 text-purple-700">SnapBook</h1>
          <h2 className="h4-bold md:h3-bold pt-5 sm:pt-12">Create A New Account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">To Use SnapBook Enter Your Details</p>
      
      <form 
      onSubmit={form.handleSubmit((data, e:any) => onSubmit(data, e))} 
      className=" flex flex-col gap-5 w-full mt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Userame</FormLabel>
              <FormControl>
                <Input type='text' className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          {isCreatingAccount ? (
            <div className="flex-center gap-2">
              <Loader/> Loading...
            </div>
          ): "Sign Up"}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2 mb-4">
            Already have an Account ?
            <Link to={'/sign-in'} className="text-primary-500 text-small-semibold ml-1">Log In</Link>
        </p>
      </form>
      </div>
    </Form>
  )
}

export default SignUpForm