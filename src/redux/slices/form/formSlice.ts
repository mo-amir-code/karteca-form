import { createSlice } from "@reduxjs/toolkit";
import { FormSliceStateType } from "./formTypes";
import { RootState } from "@/redux/store";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, INPUT_TYPES } from "@/utils/constants";

const initialState = {
  isFormActive: false,
  form: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    fields: ["Question"],
    values: [
      {
        type: INPUT_TYPES.text,
        value: [],
      },
    ],
    startTime: undefined,
    expiryTime: undefined,
    isFormSubmit: false
  },
} as FormSliceStateType;

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    toggleFormActive(state, action) {
      state.isFormActive = action.payload;
    },
    updateFormValueType(state, action) {
      const { index, newType } = action.payload;
      state.form.values[index].type = newType;
    },
    updateFormValue(state, action) {
      const { index, valueIndex, newValue} = action.payload;
      state.form.values[index].value?.splice(valueIndex, 1, newValue);
    },
    deleteFormValue(state, action) {
      const { index, valueIndex } = action.payload;
      let newValues = JSON.parse(
        JSON.stringify(state.form.values[index].value)
      );
      newValues = newValues.filter(
        (v: string, idx: number) => idx !== valueIndex
      );
      state.form.values[index].value = newValues;
    },
    updateFormField(state, action) {
      const { index, newValue } = action.payload;
      state.form.fields[index] = newValue;
    },
    createNewFieldInForm(state, action) {
      const { index } = action.payload;
      state.form.fields.splice(index + 1, 0, "Question");
      state.form.values.splice(index + 1, 0, { type: INPUT_TYPES.text, value:[] });
    },
    deleteFormField(state, action) {
      const { index } = action.payload;
      let fields = JSON.parse(JSON.stringify(state.form.fields));
      let values = JSON.parse(JSON.stringify(state.form.values));
      fields = fields.filter((item: string, idx: number) => idx !== index);
      values = values.filter((item: any, idx: number) => idx !== index);
      console.log(fields, values);
      state.form.fields = fields;
      state.form.values = values;
    },
    updateFormTitleAndDescription(state, action){
      const {title, description} = action.payload;
      state.form.title = title;
      state.form.description = description;
    },
    setFormTime(state, action){
      const {startTime, expiryTime} = action.payload;
      if(startTime){
        state.form.startTime = startTime;
      }
      if(expiryTime){
        state.form.expiryTime = expiryTime;
      }
    },
    setFormSubmitStatus(state, action){
      state.form.isFormSubmit = action.payload;
    },
    resetFormInfo(state, action){
      state.form = initialState.form;
    }
  },
});

export const {
  toggleFormActive,
  updateFormValueType,
  createNewFieldInForm,
  deleteFormField,
  updateFormField,
  updateFormValue,
  deleteFormValue,
  updateFormTitleAndDescription,
  setFormTime,
  setFormSubmitStatus,
  resetFormInfo
} = formSlice.actions;

export const selectForm = (state: RootState) => state.form.form;
export const selectIsFormActive = (state: RootState) => state.form.isFormActive;

export default formSlice;
