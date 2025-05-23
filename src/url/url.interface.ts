import mongoose, { Document } from "mongoose";

export interface UrlDocument extends Document {
    shortCode: string;
    longUrl: string;
    shortUrl: string;
    createdAt: Date;
    status: 'Active' | 'Inactive';
    stats: mongoose.Types.ObjectId;
}