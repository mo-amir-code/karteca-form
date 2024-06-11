export interface TextInputFieldType{
    type: string,
    placeholder?: string,
    register?: any,
    isDisable?: boolean,
    index?: number
}

export interface FormSubmitType{
    title: string,
    uid: string,
    formId: string
}

export interface FormDataAfterSubmitType{
    title: string,
    uid: string,
    formId: string
}