import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parentId?: mongoose.Types.ObjectId | null;
  icon?: string;
  color?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    description: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null, index: true },
    icon: { type: String },
    color: { type: String },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Compound index for hierarchical navigation rendering
CategorySchema.index({ parentId: 1, order: 1 });

export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
