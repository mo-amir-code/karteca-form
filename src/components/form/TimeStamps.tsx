"use client"

import { useAppDispatch } from "@/redux/hooks"
import { setFormTime } from "@/redux/slices/form/formSlice";

const TimeStamps = () => {
    const dispatch = useAppDispatch();

    const handleOnStartDateChange = (newDate:Date) => {
        dispatch(setFormTime({startTime:newDate}));
    }
    
    const handleOnExpireDateChange = (newDate:Date) => {
        dispatch(setFormTime({expireTime:newDate}));
    }


  return (
    <div className="p-4 space-y-2 rounded-lg bg-white" >
        <div className="flex items-center gap-2" >
            <h3>Start Time</h3>
            <input onChange={(e:any)=> handleOnStartDateChange(e.target.value)} type="date" className="border-2" />
        </div>
        <div className="flex items-center gap-2" >
            <h3>Expire Time</h3>
            <input type="date" onChange={(e:any) => handleOnExpireDateChange(e.target.value)} className="border-2"/>
        </div>
        <p className="text-xs mt-4" >You can set a start time for form submission and an expiration time to stop accepting form submissions.</p>
    </div>
  )
}

export default TimeStamps
