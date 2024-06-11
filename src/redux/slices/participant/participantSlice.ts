import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { ParticipantStateType } from "./participantTypes";
import { INPUT_TYPES } from "@/utils/constants";

const initialState = {
  form: {},
  submittedFormId: []
} as ParticipantStateType;

const participantSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {
    setFormFieldsValue(state, action){
      const { field, value, type } = action.payload as { field: string, value: string, type?:string };

      if(type === INPUT_TYPES.checkbox){
        const formObj = JSON.parse(JSON.stringify(state.form));
        const existingFieldValues = formObj[field];

        if(existingFieldValues){
          const isValueExist = existingFieldValues.find((v:string) => v === value);
          if(isValueExist){
            formObj[field] = existingFieldValues.filter((v:string) => v !== value);
          }else{
            formObj[field].push(value);
          }
        }else{
          formObj[field] = [value];
        }

        state.form = formObj;

      }else{ 
        state.form[field] = value;
      }
    },
    setSubmittedFormId(state, action){
      const {formIds} = action.payload as { formIds: [string] };
      state.submittedFormId = formIds;
    }
  },
});

export const {
  setFormFieldsValue,
  setSubmittedFormId
} = participantSlice.actions;

export const selectParticipantForm = (state: RootState) => state.participant.form

export default participantSlice;
