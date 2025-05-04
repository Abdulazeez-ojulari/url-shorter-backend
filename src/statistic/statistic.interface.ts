import { Document } from "mongoose";

export interface StatisticDocument extends Document {
    clicksByDate: Map<{}, number>;
    countries: Map<{}, number>;
    totalClicks: number;
    browsers: Map<{}, number>;
    os: Map<{}, number>;
}