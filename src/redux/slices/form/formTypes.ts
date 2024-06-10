export interface FormSliceStateType{
    isFormActive: boolean,
    form:{
        title: string,
        description: string,
        fields: [string],
        values: [ValueType],
        startTime?: Date | undefined,
        expiryTime?: Date | undefined
    }
}

type ValueType = {
    type: string,
    value?: string[]
}