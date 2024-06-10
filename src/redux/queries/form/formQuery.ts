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
        })
    })
});

export const { useCreateFormMutation } = formAPI;

export default formAPI;