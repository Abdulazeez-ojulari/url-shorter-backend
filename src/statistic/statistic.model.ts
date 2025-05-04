import mongoose, { Schema, Model } from 'mongoose';
import { StatisticDocument } from './statistic.interface';

const StatisticSchema: Schema<StatisticDocument> = new Schema(
  {
    clicksByDate: { 
      type: Map, 
      of: Number, 
      default: {} 
    },
    countries: { 
      type: Map, 
      of: Number, 
      default: {} 
    },
    totalClicks: { 
      type: Number, 
      default: 0 
    },
    browsers: { 
      type: Map, 
      of: Number, 
      default: {} 
    },
    os: { 
      type: Map, 
      of: Number, 
      default: {} 
    },
  
  },
  {
    timestamps: true, 
    collection: 'statistic',
  }
);

const Statistic: Model<StatisticDocument> = mongoose.model<StatisticDocument>('Statistic', StatisticSchema);

export default Statistic;
