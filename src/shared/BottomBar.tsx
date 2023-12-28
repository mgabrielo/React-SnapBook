import { bottomBarLinks, sideBarLinks } from "@/constants"
import { INavLink } from "@/types"
import { Link, NavLink, useLocation } from "react-router-dom"

const BottomBar = () => {
    const {pathname}= useLocation()
  return (
    <section className="bottom-bar">
            {
                bottomBarLinks.length > 0 && bottomBarLinks.map((bottomBarLink:INavLink, index)=>{
                        if(bottomBarLink){
                            const isActive = pathname === bottomBarLink.route
                            return(
                                <Link 
                                className={`${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`}
                                key={index}
                                to={bottomBarLink.route}
                                >
                                    <img
                                    src={bottomBarLink.imgURL}
                                    alt={bottomBarLink.label}
                                    width={16}
                                    height={16}
                                    className={`${isActive && 'invert-white'}`}
                                    />
                                    <p className="tiny-medium text-light-2">
                                    {bottomBarLink.label}
                                    </p>
                                </Link>
                            )
                        }
                        return null
                })
            }
    </section>
  )
}

export default BottomBar