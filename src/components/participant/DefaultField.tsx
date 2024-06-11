import { INPUT_TYPES } from '@/utils/constants'
import { DefaultFieldType } from '@/utils/types/client/form'
import React from 'react'
import TextField from './fields/TextField'
import RadioField from './fields/RadioField'
import CheckboxField from './fields/CheckboxField'
import SelectField from './fields/SelectField'
import DateField from './fields/DateField'

const DefaultField = ({ field, values }:DefaultFieldType) => {

  return (
    <div className='p-4 space-y-2 bg-white rounded-lg' >
        <h2>{field}</h2>
        {
            (()=>{
                switch(values.type){
                    case INPUT_TYPES.text:
                        return <TextField field={field} />;
                    case INPUT_TYPES.radio:
                        return <RadioField field={field} values={values.value!} />;
                    case INPUT_TYPES.checkbox:
                        return <CheckboxField field={field} values={values.value!} />;
                    case INPUT_TYPES.select:
                        return <SelectField field={field} values={values.value!} />;
                    case INPUT_TYPES.date:
                        return <DateField field={field} />;
                }
            })()
        }
    </div>
  )
}

export default DefaultField
