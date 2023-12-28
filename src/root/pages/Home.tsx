import { useGetRecentPost } from '@/lib/react-query/queriesAndMutations'
import Loader from '@/shared/Loader'
import PostCard from '@/shared/PostCard'
import { Models } from 'appwrite'

const Home = () => {
const {data:posts, isPending: isPostLoading} = useGetRecentPost()  
  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
        </div>
        {isPostLoading && !posts ? (
            <Loader/>
        ):(
          <ul className='flex flex-col flex-1 gap-9 w-full'>
              {
                posts?.documents && posts?.documents.length > 0 && posts?.documents.map((post:Models.Document)=>{
                  if(post){
                    return (
                      <PostCard post={post}/>
                    )
                  }
                  return null
                })
              }
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home