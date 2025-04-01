import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Label } from "../ui/label"

function AddressCard({addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId}) {
    return(
        <Card onClick={setCurrentSelectedAddress ? ()=>setCurrentSelectedAddress(addressInfo) : null } className={`cursor-pointer border-red ${selectedId?._id === addressInfo?._id ? '  border-2 border-lime-500' : 'border-black'}`}>
            <CardContent className={`${selectedId === addressInfo?._id ? 'border-black' : ''} grid p-4 gap-4`}>
                <Label>Address: {addressInfo?.address}</Label>
                <Label>City: {addressInfo?.city}</Label>
                <Label>Pincode: {addressInfo?.pincode}</Label>
                <Label>Phone: {addressInfo?.phone}</Label>
                <Label>Notes: {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className="flex p-3 justify-between">
                <Button onClick={()=> handleEditAddress(addressInfo)}>Edit</Button>
                <Button onClick={()=> handleDeleteAddress(addressInfo)}>Delate</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard