import { isDBConnected } from "@/utils/services/common";
import { FormParticipantType } from "@/utils/types/server/form";
import { NextResponse } from "next/server";
import Form from "@/models/Form.Schema";



export async function POST(req:Request,  { params } : { params: { formId:string } }){
    try {

        const { formId } = params;

        const { participant } = await req.json() as FormParticipantType;

        if(!formId || !participant){
            return NextResponse.json({
                success: false,
                message: "Required fields are missing!"
            }, { status: 400 });
        }

        await isDBConnected();

        const form = await Form.findById(formId);

        if(form.startTime > Date.now()){
            return NextResponse.json({
                success: false,
                message: "Form is not started yet"
            }, { status: 400 });
        }

        if(form.expiryTime < Date.now()){
            return NextResponse.json({
                success: false,
                message: "Form has been expired"
            }, { status: 400 });
        }

        // const participantObj = arrayToObject(participant);
        
        form.participants.push(participant);
        await form.save();

        return NextResponse.json({
            success: true,
            message: "Your response has been recorded"
        }, { status: 200 });

        
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Some Internal Error Occurred!",
        }, { status: 500 });
    }
}

export const GET = async (req:Request, { params } : { params: { formId:string } }) => {
    try {
        
        const { formId } = params;

        await isDBConnected();

        if(!formId){
            return NextResponse.json({
                success: false,
                message: "Required fields are missing!"
            }, { status: 400 });
        }

        const form = await Form.findById(formId).select("title description fields startTime expiryTime -_id");

        if(!form){
            return NextResponse.json({
                success: false,
                message: "Required information is incorrect"
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Form has been fecthed",
            data: form
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Some Internal Error Occurred!",
        }, { status: 500 });
    }
}