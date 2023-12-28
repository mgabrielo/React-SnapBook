import { Button } from "@/components/ui/button"
import { sideBarLinks } from "@/constants"
import { useUserContext } from "@/context/AuthContext"
import { userSignOutAccount } from "@/lib/react-query/queriesAndMutations"
import { INavLink } from "@/types"
import { useEffect } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"

const LeftSideBar = () => {
    const navigate =useNavigate()
    const {pathname}=useLocation()
    const {user} = useUserContext();
    const {mutate: signOut, isSuccess}= userSignOutAccount()
    useEffect(()=>{
        if(isSuccess){
            return navigate('/sign-in')
        }
    },[isSuccess])
  return (
    <nav className="leftsidebar">
        <div className="flex flex-col gap-10">
        <Link to='/' className="flex gap-3 items-center">
                <div style={{ display:'flex', alignItems:'center',gap:8}}>
                <img src="/assets/images/logo2.png" style={{height:'30px', width:'100%', position:'relative', objectFit:'cover',}} />
                <h1 className="h2-bold md:h1-bold text-purple-700">SnapBook</h1>
                </div>
        </Link>
        <Link 
        to={`/profile/${user?.id}`}
        className="flex gap-3 items-center"
        >
            <img src={user.imageUrl || '/assets/images/profile2.png'} className="w-12 h-12 rounded-full"/>
            <div className="flex flex-col">
            <p className="body-bold">
                {user?.name}
            </p>
            <p className="small-regular text-light-3">
                @{user?.username}
            </p>
            </div>
        </Link>

        <ul className="flex flex-col gap-6">
            {
                sideBarLinks.length > 0 && sideBarLinks.map((sideBarLink:INavLink, index)=>{
                        if(sideBarLink){
                            const isActive = pathname === sideBarLink.route
                            return(
                                <li className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`} key={index}>
                                <NavLink 
                                className={'flex gap-4 items-center p-4'}
                                to={sideBarLink.route}
                                >
                                    <img
                                    src={sideBarLink.imgURL}
                                    alt={sideBarLink.label}
                                    className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                                    />
                                    {sideBarLink.label}
                                </NavLink>
                                </li>
                            )
                        }
                        return null
                })
            }
        </ul>
        </div>
        <Button variant={'ghost'} className="shad-button_ghost" onClick={()=>signOut()}>
            <img src='/assets/icons/logout.svg'/>
            <p className="small-medium lg:base-medium">Log Out</p>
        </Button>
    </nav>
  )
}

export default LeftSideBar