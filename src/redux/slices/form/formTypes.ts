export interface FormSliceStateType{
    isFormActive: boolean,
    form:{
        title: string,
        description: string,
        fields: [string],
        values: [ValueType]
    }
}

type ValueType = {
    type: string,
    value?: string[]
}