export interface TextInputFieldType {
  type: string;
  placeholder?: string;
  register?: any;
  isDisable?: boolean;
  index?: number;
}

export interface FormSubmitType {
  title: string;
  uid: string;
  formId: string;
}

export interface FormDataAfterSubmitType {
  title: string;
  uid: string;
  formId: string;
}

export interface ParticipantHeroType {
  title: string;
  description: string;
}

export interface ParticipantGetFormAPIType {
  data: {
    success: boolean;
    message: string;
    data: {
      title: string;
      description: string;
      fields: {
        fields: [string],
        values: [{
            type: string,
            value?: [string]
        }]
      };
      startTime: number;
      expiryTime: number;
    };
  };
  isError: boolean,
  isSuccess: boolean,
  isFetching: boolean,
  isLoading: boolean,
}

export interface DefaultFieldType{
    field: string,
    values: {
        type: string,
        value?: [string]
    }
}