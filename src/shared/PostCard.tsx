import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({post}:any) => {
    const {user} = useUserContext()    
    function formatDateString(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };
      
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-US", options);
      
        const time = date.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        });
      
        return `${formattedDate} at ${time}`;
      }
  return (
    <div className='post-card'>
        <div className='flex-between'>
            <div className='flex items-center gap-3'>
                <Link 
                to={``}
                // to={`/profile/${post.creator.id}`}
                >
                    <img
                    src={post?.creator?.imageUrl || '/assets/icons/profile1.png'}
                    className='rounded-full w-12 lg:h-12'
                    />
                </Link>
                <div className='flex flex-col'>
                    <p className='base-medium lg:body-bold text-light-1'>
                        {post?.creator?.name}
                    </p>
                    <div className='flex-center gap-2 text-light-3 mt-1'>
                        <p className='subtle-semibold lg:small-regular'>
                            {formatDateString(post?.$createdAt)}
                        </p>
                        <p className='subtle-semibold lg:small-regular'>
                            {post?.location}
                        </p>
                    </div>
                </div>
            </div>
            <Link to={''}>
                <img
                src={'/assets/icons/edit.svg'}
                alt='edit'
                className={`w-6 h-6 ${user?.id !== post?.creator.$id && 'hidden'} `}
                />
            </Link>
        </div>
        <Link to={''}>
            <div className='small-medium lg:base-medium py-5'>
                <p>{post?.caption}</p>
                <ul className='flex gap-1 mt-2'>
                    {
                        post.tags && post.tags.length > 0 && post.tags.map((tag: string)=>{
                            if(tag){
                                return(
                                    <li key={tag} className='text-light-3'>
                                        #{tag}
                                    </li>
                                )
                            }
                            return null
                        }) 
                    }
                </ul>
            </div>
            <img
            src={post?.imageURL}
            className='post-card_img'
            alt='post image'
            />
        </Link>
    </div>
  )
}

export default PostCard