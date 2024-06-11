export interface NewFormType{
    startTime?: Date,
    expiryTime?: Date,
    fields: object,
    title: string,
    description: string
}

export interface FormParticipantType{
    participant: object
}

export interface ObjectType{
    field: string,
    value: string
}