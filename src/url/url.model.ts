import mongoose, { Schema, Model } from 'mongoose';
import { UrlDocument } from './url.interface';

const UrlSchema: Schema<UrlDocument> = new Schema(
  {
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    longUrl: {
        type: String,
        required: true,
    },
    visits: {
        type: Number,
        required: false,
        default: 0,
    },
    status: {
        type: String,
        enum: ['Active',  'Inactive'],
        default: 'Active',
        required: false,
    },
  },
  {
    timestamps: true, 
    collection: 'url',
  }
);

const Url: Model<UrlDocument> = mongoose.model<UrlDocument>('Url', UrlSchema);

export default Url;
