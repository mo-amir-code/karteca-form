import mongoose, {Schema} from "mongoose";

interface FormSchema extends Document {
    title: string,
    description: string,
    uid: string,
    fields: object,
    participants?: object[],
    startTime: number,
    expiryTime: number
}

const formSchema:Schema<FormSchema> = new Schema<FormSchema>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    fields: {type: Object, required: true},
    participants: [{type: Object}],
    startTime: { type: Number, required: true },
    expiryTime: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.models.Form || mongoose.model<FormSchema>("Form", formSchema);