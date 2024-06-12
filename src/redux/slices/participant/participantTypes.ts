export interface ParticipantStateType{
    form: {[key:string]:string | string[]},
    submittedFormId: string[],
    isFormSubmit: boolean
}