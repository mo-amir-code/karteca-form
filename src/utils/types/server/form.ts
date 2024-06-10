export interface NewFormType{
    startTime?: Date,
    expiryTime?: Date,
    fields: object,
    title: string,
    description: string
}

export interface FormParticipantType{
    formId: string,
    participant: [ObjectType]
}

export interface ObjectType{
    field: string,
    value: string
}