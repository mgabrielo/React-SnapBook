import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {Form, FormControl,FormField, FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import FIleUploader from "@/shared/FIleUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

type PostFormProps={
    post?: Models.Document 
}
const PostForm = ({post} :PostFormProps) => {
    const {user} = useUserContext();
    const {toast} = useToast()
    const navigate= useNavigate()
    const {mutateAsync: createPost, isPending: isLoadingCreatePost} = useCreatePost()
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
          caption: post ?  post?.caption :  '',
          file: [],
          location :post? post?.location : '',
          tags:post ? post?.tags.join(','):  ''
        },
      })

      async function onSubmit ( values : z.infer<typeof PostValidation>){
        console.log('onSubmit', values)
        const newPost =await createPost({
            ...values,
            userId: user?.id
        })
        if(!newPost){
            toast({
                title:'please try again',
            })
        }
        navigate('/')
      }
  return (
        <Form {...form}>
         <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className=" flex flex-col gap-5 w-full max-w-5xl"
      >
        <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
            <FormItem>
            <FormLabel className="shad-form_label">Caption</FormLabel>
            <FormControl>
                <Textarea
                className="shad-textarea custom-scrollbar"
                 placeholder="Add Content" {...field}
                  />
            </FormControl>
            <FormMessage className="shad-form"/>
            </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
            <FormItem>
            <FormLabel className="shad-form_label">Add Photos</FormLabel>
            <FormControl>
                <FIleUploader
                fieldChange={field.onChange}
                mediaURL={post?.imageUrl}
                />
            </FormControl>
            <FormMessage className="shad-form"/>
            </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
            <FormItem>
            <FormLabel className="shad-form_label">Add Location</FormLabel>
            <FormControl>
                <Input type={'text'} className="shad-input" {...field}/>
            </FormControl>
            <FormMessage className="shad-form"/>
            </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
            <FormItem>
            <FormLabel className="shad-form_label">Add Tags (seperated by comma " , " )</FormLabel>
            <FormControl>
                <Input type={'text'} className="shad-input" placeholder="Tech, Games , Comics" {...field}/>
            </FormControl>
            <FormMessage className="shad-form"/>
            </FormItem>
        )}
        />
        <div className="w-full gap-5 flex items-center justify-center">
        <Button 
        type='submit' 
        className="bg-slate-600">
            Cancel 
        </Button>
        <Button 
        type='submit'
        className=" bg-violet-900 whitespace-nowrap"
        >Submit
        </Button>
        </div>
        </form>
        </Form>
  )
}

export default PostForm