import { useState } from "react";
import { Button } from "../../components/Buttons/SubmitBtn"
import { AddCurrencyModal } from "../../components/Currency/AddCurrencyModal"
import { useGetCurrenciesQuery } from "../../services/currency/currencyQuery";
import { Edit,Delete } from "@mui/icons-material";
import { EditCurrencyModal } from "../../components/Currency/EditCurrModal";
import { DeleteCurrModal } from "../../components/Currency/DeleteCurrencyModal";
import { DeleteIcon, EditIcon } from "../../components/Icons";
export const CurrencyPage=()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [currencyId, setCurrencyId] = useState(0);
    const {data:curr,isLoading}=useGetCurrenciesQuery(undefined);
    return(
        <div>
            <div className="flex justify-between align-middle items-center">
                <h1 className="text-2xl">
                    Currency 
                </h1>
                <div>
                    <Button name="Add Currency" onClick={()=>{setIsModalOpen(true)}}/>
                </div>
            </div>
            <div>
                {isLoading? <div>Loading....</div> : null}
                {curr?.length === 0 ? <div>No currencies found.</div> : curr?.map((c) => (
                    <div className="flex justify-between border rounded-2xl m-2 p-2   w-1/5">
                       <div className="">
                        <p>Name : {c.currencyName}</p>
                        <p>Symbol : {c.symbol}</p>

                    </div>
                    <div className="flex gap-2">
                         <button 
                         onClick={()=>{setIsModalEdit(true)
                            setCurrencyId(c.id)
                         }}
                         className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition">
                         <EditIcon size={24}  color="#ff4d1c" />
                     </button>
                     <button 
                       onClick={()=>{setIsModalDelete(true)
                            setCurrencyId(c.id)
                         }}
                     className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition">
                         <DeleteIcon size={24}  color="#ff4d1c" />
                     </button>
                    </div>
                     
                    </div>
                   
                ))}
            </div>
            <AddCurrencyModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <EditCurrencyModal open={isModalEdit} onClose={() => setIsModalEdit(false)}
                 currencyId={currencyId} />
                    <DeleteCurrModal open={isModalDelete} onClose={() => setIsModalDelete(false)}
                 id={currencyId} />
        </div>
    )
}