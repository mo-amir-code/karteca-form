"use client"
import { useAppDispatch } from '@/redux/hooks'
import { updateFormField } from '@/redux/slices/form/formSlice'
import { TextInputFieldType } from '@/utils/types/client/form'
import React, { useEffect, useState } from 'react'

const TextField = ({type, placeholder, register, isDisable, index}:TextInputFieldType) => {
  const [value, setValue] = useState<string>((placeholder !== "Question"? placeholder : "") || "");
  const disptach = useAppDispatch();

  const handleOnChange = (value:string) => {
    setValue(value)
    disptach(updateFormField({index:index, newValue:value}));
  }

  useEffect(() => {
    if(placeholder !== "Question"){
      setValue(placeholder!);
    }
  }, [placeholder, setValue]);


  return (
    <div className='flex border-b w-full' >
        <input onChange={(e)=>handleOnChange(e.target.value)} value={value} disabled={isDisable} type={type} {...register} placeholder={placeholder} className='outline-none w-full' />
    </div>
  )
}

export default TextField
