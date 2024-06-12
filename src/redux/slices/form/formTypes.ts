export interface FormSliceStateType{
    isFormActive: boolean,
    isGetFormActive: boolean,
    form:{
        title: string,
        description: string,
        fields: [string],
        values: [ValueType],
        startTime?: Date | undefined,
        expiryTime?: Date | undefined,
        isFormSubmit: boolean
    }
}

type ValueType = {
    type: string,
    value?: string[]
}