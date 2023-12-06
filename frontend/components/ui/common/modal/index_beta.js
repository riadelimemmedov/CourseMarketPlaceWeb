"use client"


//!React and Next
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'


//*BetaModal
export default function BetaModal(){
    //state
    const [isOpenModal,setIsOpenModal] = useState(true)

    //closeModal
    const closeModal = () => {
        setIsOpenModal(false);
    }

    //pathname
    const pathname = usePathname()

    //return jsx to client
    return(
        pathname === '/' ? (
            <>
                <dialog id="my_modal_1" className="modal" open={isOpenModal}>
                    <div className="modal-box bg-slate-50" style={{marginTop:'-250px'}}>
                        <div className="p-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="false">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="font-semibold leading-6 text-gray-900 text-xl" id="modal-title">Note!</h3>
                                    <div className="mt-2">
                                        <p className="text-base text-gray-500">
                                            Apologies for any inconvenience caused by the beta version of this application. Some Ethereum networks may not work properly. Thank you for your understanding.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-error text-white" onClick={closeModal}>Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>

            </>
            
        ) : null
    )
}