
//!React and Next js
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'



//*ActiveLink
export default function ActiveLink({children,...props}){
    //Pathname
    const pathname = usePathname()

    //Check current pathname if equal to props href add text-indigo-600
    let className = children.props.className || ""
    if(pathname == props.href){
        className = `${className} text-indigo-600`
    }

    //return jsx to client
    return (
        <Link {...props} legacyBehavior>
            {
                React.cloneElement(children,{className})
            }
        </Link>
    )
}