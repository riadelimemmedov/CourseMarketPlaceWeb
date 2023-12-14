//!Custom components
import { Button, Modal } from "@components/ui/common"
import { useEffect, useState } from "react"


//!Helpers methods
import convert from "utils/convert_eth"


//defaultOrder
const defaultOrder = {
    price:"",
    email:"",
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const _createFormState = (isDisabled=false,message="") => ({isDisabled,message})
const createFormState = ({price,email},hasAgreedTOS) => {
    if(!price || Number(price) <= 0){
        return _createFormState(true,"Price is not valid.")
    }
    else if(!emailRegex.test(email)){
        return _createFormState(true,"Invalid email address.")
    }
    else if(!hasAgreedTOS){
        return _createFormState(true,"You need to agree with terms of service for order process.")
    }
    return _createFormState()
}


//*OrderModal
export default function OrderModal({course,eth,onClose,onSubmit}){
    const [isOpen, setIsOpen] = useState(false)
    const [order,setOrder] = useState(defaultOrder)
    const [formState,setFormState] = useState({})
    const [hasAgreedTOS,setHasAgreedTOS] = useState(false)


    //closeModal
    const closeModal = () => {
        setIsOpen(false)
        setOrder(defaultOrder)
        setHasAgreedTOS(false)
        onClose()
    }

    //useEffect
    useEffect(() => {
        if(!!course){//If course not null convert to true or if course is null pass the if condition
            let price = convert(eth,course)
            setIsOpen(true)
            setOrder({
                ...defaultOrder,
                price: price
            })
        }
    },[course,eth.data])
    

    //createOrder
    const createOrder = () => {
        let form_state = createFormState(order,hasAgreedTOS)
        setFormState(form_state)
        onSubmit(order,course)
        order.email = ''
    }


    //setOrderBtnDisabled
    const setOrderBtnDisabled = (order) => {
        return Object.values(order).some((value) => value === '');
    };



    //return jsx to client
    return (
        <>
            <Modal isOpen={isOpen}>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="mb-7 text-sm font-bold leading-6 text-blue-500" id="modal-title">
                                    {course.title}
                                </h3>
                                <hr />
                        <div className="mt-2 relative rounded-md">
                            <div className="mb-1">
                                <label className="mb-2 font-bold">Price(eth)</label>
                                <div className="text-xs text-gray-700 flex">
                                </div>
                            </div>
                            <input
                                value={order.price}
                                type="text"
                                name="price"
                                id="price"
                                disabled={true}
                                className="disabled:opacity-50 focus:outline-none w-80 mb-1 text-red-900 font-bold focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 border rounded-md"
                            />
                            <p className="text-xs text-gray-700 mt-2">
                                Price will be verified at the time of the order. If the price will be lower, order can be declined (+- 2% slipage is allowed)
                            </p>
                        </div>
                        <div className="mt-5 relative rounded-md">
                            <div className="mb-1">
                                <label className="mb-2 font-bold">Email</label>
                            </div>
                            <input
                                onChange={({target:{value}}) => {
                                    setOrder({
                                        ...order,
                                        email:value.trim()
                                    })
                                }}
                                type="email"
                                name="email"
                                id="email"
                                className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 border rounded-md"
                                placeholder="x@y.com"
                            />
                            <p className="text-xs text-gray-700 mt-2">
                                It&apos;s important to fill a correct email, otherwise the order cannot be verified. We are not storing your email anywhere
                            </p>
                        </div>
                        <div className="text-xs text-gray-700 flex mt-3">
                            <label className="flex items-center mr-2">
                                <input
                                    checked={hasAgreedTOS}
                                    onChange={({target:{checked}}) => {
                                        setHasAgreedTOS(checked)
                                    }}
                                    type="checkbox"
                                    className="form-checkbox" />
                            </label>
                            <span className="mt-2">I accept Eincode &apos;terms of service&apos; and I agree that my order can be rejected in the case data provided above are not correct</span>
                        </div>
                            
                        {formState.message && 
                            <div className="p-4 my-3 text-red-700 bg-red-200 rounded-lg text-sm">
                                {formState.message}
                            </div>
                        }

                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
                    <Button disabled={setOrderBtnDisabled(order)} onClick={createOrder}>
                        Submit 
                    </Button>
                        <Button onClick={closeModal} variant="red">
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}