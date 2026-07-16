import {  useState } from "react";
import { Button } from "../Buttons/SubmitBtn";
import { Modal } from "../global/Modals";
import { CancelBtn } from "../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { InputField } from "../Fields/InputField";
import { ErrorHandler } from "../../utils/ErrorHandler";
import {useCreateCurrencyMutation}  from "../../services/currency/currencyMutation"
interface AddCurrencyModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddCurrencyModal = ({ open, onClose }: AddCurrencyModalProps) => {

const [currency,setCurrency]=useState({
 currencyName: "",
  symbol: ""
})

 const [createCurr,{isLoading}]=useCreateCurrencyMutation()
 const handleAddCurrency = async () => {
  try {
    
   const res=  await createCurr(currency).unwrap();
      console.log(currency)
    toast.success("Added Successfully");

   setCurrency({
    currencyName: "",
    symbol: ""
   })
    onClose();
  } catch (err) {
   ErrorHandler.show(err)
  }
}
    return (
 <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Add New Currency
    </h2>
   <div className="flex flex-col align-center ">
    <div>

   
    </div>
    <div className="flex-col">
 
<InputField
  label="Currency Name"

  value={currency.currencyName}
  onChange={(e) => setCurrency({ ...currency, currencyName: e.target.value })}
/>
<InputField
  label="Symbol"
  value={currency.symbol}
  onChange={(e) => setCurrency({ ...currency, symbol: e.target.value })}
/>



 
   </div>
  
    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={ isLoading ? "Adding...": "Add Currency"}
          onClick={handleAddCurrency}
        />
      </div>

      <div className="flex-1">
        <CancelBtn
          name="Cancel"
          onClick={onClose}
        />
      </div>
     

    </div>

  </div>
   </div>
</Modal>
    );}
