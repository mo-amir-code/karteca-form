export interface NewFormType{
    startTime: Date,
    expiryTime: Date,
    fields: [ObjectType]
}

export interface FormParticipantType{
    formId: string,
    participant: [ObjectType]
}

export interface ObjectType{
    field: string,
    value: string
}