import mongoose, {Schema, models, model} from 'mongoose';

const messageTemplate = new Schema({
    message: {
        type: String,
        required: true,
    },
}, {timestamps: true, strict: false});

export const messageSchema = models?.chatdbs || model("chatdbs", messageTemplate);