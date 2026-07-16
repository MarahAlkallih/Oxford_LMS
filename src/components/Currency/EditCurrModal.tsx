import {  useEffect, useState } from "react";
import { Button } from "../Buttons/SubmitBtn";
import { Modal } from "../global/Modals";
import { CancelBtn } from "../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { InputField } from "../Fields/InputField";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { useGetOneCurrencyQuery } from "../../services/currency/currencyQuery";
import { useEditCurrencyMutation } from "../../services/currency/currencyMutation";
interface EditCurrencyModalProps {
    open: boolean;
    onClose: () => void;
    currencyId: number;
}

export const EditCurrencyModal = ({ open, onClose, currencyId }: EditCurrencyModalProps) => {

const [currency,setCurrency]=useState({
 currencyName: "",
  symbol: ""
})
const [originalCurrency, setOriginalCurrency] = useState({
  currencyName: "",
  symbol: "",
});
const { data: fetchedCurrency } = useGetOneCurrencyQuery({ id: currencyId }, {
  skip: !currencyId,
});
useEffect(() => {
  if (fetchedCurrency) {
    const data = {
      currencyName: fetchedCurrency.currencyName,
      symbol: fetchedCurrency.symbol,
    };

    setCurrency(data);
    setOriginalCurrency(data);
  }
}, [fetchedCurrency]);
 const [editCurr,{isLoading}]=useEditCurrencyMutation()
 const handleAddCurrency = async () => {
  try {
    const payload: Partial<typeof currency> = {};

    if (currency.currencyName !== originalCurrency.currencyName) {
      payload.currencyName = currency.currencyName;
    }

    if (currency.symbol !== originalCurrency.symbol) {
      payload.symbol = currency.symbol;
    }

    if (Object.keys(payload).length === 0) {
      toast.info("No changes detected");
      return;
    }

    await editCurr({
      id: currencyId,
      data: payload,
    }).unwrap();

    toast.success("Updated Successfully");
    onClose();
  } catch (err) {
    ErrorHandler.show(err);
  }
};
    return (
 <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Edit Currency
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
          name={ isLoading ? "Editing...": "Edit Currency"}
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
