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
    shortUrl: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ['Active',  'Inactive'],
        default: 'Active',
        required: false,
    },
    stats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Statistic',
        required: true,
    },
  },
  {
    timestamps: true, 
    collection: 'url',
  }
);

UrlSchema.virtual('statistic', {
    ref: 'Statistic',
    localField: '_id',
    foreignField: 'urlId',
});

const Url: Model<UrlDocument> = mongoose.model<UrlDocument>('Url', UrlSchema);

export default Url;
