import { APIRequestType } from "@/redux/reduxTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewFormType } from "./formTypes";


const formAPI = createApi({
    reducerPath: "formAPI",
    baseQuery: fetchBaseQuery({baseUrl: "/api/form"}),
    endpoints: (builder) => ({
        createForm: builder.mutation<APIRequestType, NewFormType>({
            query: (data) => ({
                url: '',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
                credentials: "include"
            })
        }),
        participantFormSubmit: builder.mutation<APIRequestType, {formId:string, participant: object}>({
            query: ({formId, participant}) => ({
                url: formId,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { participant },
                credentials: "include"
            })
        }),
        getForm: builder.query<APIRequestType, string>({
            query: (formId) => ({
                url: formId,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
        }),
        getFormInfo: builder.query<APIRequestType, string>({
            query: (formUID) => ({
                url: `?formUID=${formUID}`,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
        }),
    })
});

export const { useCreateFormMutation, useGetFormQuery, useParticipantFormSubmitMutation, useGetFormInfoQuery } = formAPI;

export default formAPI;