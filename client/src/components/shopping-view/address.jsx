import { addressFormControls } from "@/config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData ={
    address : '',
    city : '',
    phone : '',
    pincode : '',
    notes : '',
}


function Address({setCurrentSelectedAddress, selectedId}) {

    const [formData, setFormData] = useState(initialAddressFormData)
    const [currentEditId, setCurrentEditId] = useState(null)
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {addressList} = useSelector(state => state.shopAddress)
    const { toast } = useToast()

    function handleManageAddress(event){
        event.preventDefault();

        if(addressList.length >= 3 && currentEditId === null){
                setFormData(initialAddressFormData)
            toast({
                title: "You can add max 3 addresses",
                variant: "destructive"
            })

            return;
        }

        currentEditId !== null ? 
        
        dispatch(editaAddress({
            userId: user?.id, 
            addressId: currentEditId, 
            formData
        })).then((data) => {
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id));
                setCurrentEditId(null);
                setFormData(initialAddressFormData);
                toast({
                    title: "Address Edited",
                })
            }
        }) : dispatch(addNewAddress({
            ...formData,
            userId: user?.id
        })).then(data =>{
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id));
                setFormData(initialAddressFormData);
                toast({
                    title: "Address Added Succesfully",
                })
            }
        })
    }

    function handleDeleteAddress(getCurrentAddress){
        dispatch(deleteAddress({userId : user?.id, addressId:getCurrentAddress._id})).then(data => {
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id))
                toast({
                    title: "Address Deleted",
                })
            }
        })
    }

    function handleEditAddress(getCurrentAddress){
        setCurrentEditId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address : getCurrentAddress?.address,
            city : getCurrentAddress?.city,
            phone : getCurrentAddress?.phone,
            pincode : getCurrentAddress?.pincode,
            notes : getCurrentAddress?.notes,
        })
    }

    function isFormValid(){
        return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item)
    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id))
    },[dispatch])

    console.log(addressList, "ADDRESS LIST")

    return(
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {
                    addressList && addressList.length > 0 ? addressList.map(singleAddressItem => <AddressCard selectedId = {selectedId} handleDeleteAddress={handleDeleteAddress} addressInfo={singleAddressItem} handleEditAddress={handleEditAddress} setCurrentSelectedAddress={setCurrentSelectedAddress}></AddressCard>) : null
                }
            </div>
            <CardHeader>
                <CardTitle>{currentEditId !== null? 'Edit Address' : 'Add New Address'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttonText={currentEditId !== null? 'Edit' : 'Add'} onSubmit={handleManageAddress} isBtnDisabled={!isFormValid()}/>
            </CardContent>
        </Card>
    )
}

export default Address;