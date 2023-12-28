import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { userSignOutAccount } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const TopBar = () => {
    const navigate =useNavigate()
    const {user} = useUserContext();
    const {mutate: signOut, isSuccess}= userSignOutAccount()
    useEffect(()=>{
        if(isSuccess){
            return navigate('/sign-in')
        }
    },[isSuccess])

  return (
    <section className="topbar">
        <div className="flex-between py-4 px-5">
            <Link to='/' className="flex gap-3 items-center">
                <div style={{ display:'flex', alignItems:'center',gap:8}}>
                <img src="/assets/images/logo2.png" style={{height:'30px', width:'100%', position:'relative', objectFit:'cover',}} />
                <h1 className="h2-bold md:h1-bold text-purple-700">SnapBook</h1>
                </div>
            </Link>
            <div className="flex gap-4">
                <Button variant={'ghost'} className="shad-button_ghost" onClick={()=>signOut()}>
                    <img src='/assets/icons/logout.svg'/>
                </Button>
                <Link to={`/profile/${user?.id}`} className="flex-center gap-3">
                    <img src={user.imageUrl || '/assets/images/profile2.png'} alt="profile" className="h-8 w-8 rounded-full"/>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default TopBar