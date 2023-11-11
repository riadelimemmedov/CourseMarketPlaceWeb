//!Custom components
import { Navbar,Footer } from "@components/common"


//!BaseLayout
export default function BaseLayout({children}){
    return(
        <>
            <div className="max-w-7xl mx-auto px-4">
                <Navbar/>
                <div className="fit">
                    {children}
                </div>
            </div>
            <Footer/>
        </>
    )
}
