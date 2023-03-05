/* eslint-disable node/no-unsupported-features/es-syntax */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const URLSchema = new Schema(
    {
        originalURL: {
            type: String,
            required: [true, 'Enter a valid URL'],
            trim: true
        },
        shortUrl: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, 'Enter a short URL'],
            unique: [true, 'This short URL already exists']
        },
        link: {
            type: String,
            required: [true, 'Enter a short URL'],
            lowercase: true,
            unique: [true, 'This short URL already exists'],
            trim: true
        },
        read_Count: {
            type: Number,
            default: 0,
            trim: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('URL', URLSchema);
