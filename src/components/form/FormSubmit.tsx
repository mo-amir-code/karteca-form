"use client"
import { FormSubmitType } from '@/utils/types/client/form'
import React from 'react'
import toast from 'react-hot-toast';
import { IoCopy } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { useAppDispatch } from '@/redux/hooks';
import { setFormSubmitStatus } from '@/redux/slices/form/formSlice';

const FormSubmit = ({ title, formId, uid }:FormSubmitType) => {
    const dispatch = useAppDispatch();

    const handleUIDCopy = () => {
        navigator.clipboard.writeText(uid).then(() => {
            toast.success("UID copied");
        }).catch((err) => {
            console.error(err);
            toast.error("Something Error Happened!");
        });
    }

    const handleShareURLCopy = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_CLIENT_ORIGIN}/form/${formId}`).then(() => {
            toast.success("URL copied");
        }).catch((err) => {
            console.error(err);
            toast.error("Something Error Happened!");
        });
    }

    const handleShareForm = async () => {
        const shareData = {
            title,
            url: `${process.env.NEXT_PUBLIC_CLIENT_ORIGIN}/form/${formId}`,
          };
          if (navigator.share) {
            try {
              await navigator.share(shareData);
            } catch (error) {
              console.error('Error sharing:', error);
              toast.error('Something Error Happened!');
            }
          } else {
            toast.error('Something went wrong');
          }
    }

    const handleClose = () => {
        dispatch(setFormSubmitStatus(false));
    }

  return (
    <article className='bg-white p-4 rounded-lg space-y-2 relative' >
        <h1 className='text-lg font-medium' >{title}</h1>
        <div className='space-y-2' >
        <p className='p-2 bg-gray-100 rounded-lg relative' >{uid}<button onClick={()=> handleUIDCopy()} className='absolute top-1/2 -translate-y-1/2 right-2' ><IoCopy className='w-4 h-4 text-black' /></button> </p>
        <p className='text-xs px-1' >Each form is assigned a unique identifier (UID). You can utilize this UID to monitor and analyze the number of responses submitted to your form.</p>
        </div>
        <div className='flex items-center gap-2' >
           <p className='w-full p-2 bg-gray-100 rounded-lg text-blue-600 relative' >{process.env.NEXT_PUBLIC_CLIENT_ORIGIN+`/form/${formId}`} <button onClick={()=> handleShareURLCopy()} className='absolute top-1/2 -translate-y-1/2 right-2' ><IoCopy className='w-4 h-4 text-black' /></button> </p>
           <button onClick={()=> handleShareForm()} className='px-5 py-2 bg-blue-600 text-white rounded-md' >Share</button>
        </div>
        <button onClick={()=> handleClose()} className='absolute top-2 right-4 text-red-600' ><IoIosCloseCircle className='w-4 h-4' /></button>
        <button onClick={()=> handleClose()} className='px-4 py-2 bg-gray-900 rounded-lg text-white font-medium' >Back To Home</button>
    </article>
  )
}

export default FormSubmit
