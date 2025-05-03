import { Document } from "mongoose";

export interface UrlDocument extends Document {
    shortCode: string;
    longUrl: string;
    createdAt: Date;
    visits: number;
    status: 'Active' | 'Inactive';
}