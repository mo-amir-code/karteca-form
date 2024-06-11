import { NewFormType } from "@/utils/types/server/form";
import { NextResponse } from "next/server";
import { uid } from "uid";
import Form from "@/models/Form.Schema";
import { isDBConnected } from "@/utils/services/common";



export async function POST(req:Request){
    try {

        await isDBConnected()

        const { expiryTime, startTime, fields, title, description } = await req.json() as NewFormType;

        if(!fields || !title || !description){
            return NextResponse.json({
                success: true,
                message: "Required fields are missing!"
            }, { status: 400 });
        }

        const uniqueId = await uid(25);   

        let intStartTime = undefined;
        let intExpiryTime = undefined;

        if(startTime){
            intStartTime = (new Date(startTime)).getTime();
        }
        if(expiryTime){
            intExpiryTime = (new Date(expiryTime)).getTime();
        }

        // const fieldsObj = arrayToObject(fields);

        const newFormData = {
            title,
            description,
            uid: uniqueId,
            fields,
            startTime: intStartTime,
            expiryTime: intExpiryTime
        }


        const newForm = await Form.create(newFormData);

        return NextResponse.json({
            success: true,
            message: "Form has been created",
            data:{
                uid: uniqueId,
                formId: newForm._id,
                title
            }
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Some Internal Error Occurred!"
        }, { status: 500 });
    }
}

export async function GET(req:Request){
    try {

        await isDBConnected()

        const formUID = (new URLSearchParams((new URL(req.url)).searchParams)).get("formUID");

        if(!formUID){
            return NextResponse.json({
                success: true,
                message: "Required fields are missing!"
            }, { status: 400 });
        }

        const form = await Form.findOne({ uid: formUID }).select("participants title description");

        return NextResponse.json({
            success: true,
            message: "Form data fetched",
            data: form
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Some Internal Error Occurred!"
        }, { status: 500 });
    }
}