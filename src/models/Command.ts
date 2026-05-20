import mongoose, { Schema, Document } from 'mongoose';

export interface IParameterExplanation {
  param: string;
  description: string;
}

export interface IExample {
  title: string;
  command: string;
  description?: string;
}

export interface IWorkflow {
  description: string;
  content: string;
  terminalScript?: string[];
}

export interface ICommand extends Document {
  categoryId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  command: string;
  description: string;
  explanations: IParameterExplanation[];
  examples: IExample[];
  workflows?: IWorkflow[];
  tags: string[];
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CommandSchema: Schema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    command: { type: String, required: true },
    description: { type: String, required: true },
    explanations: [{
      param: { type: String, required: true },
      description: { type: String, required: true }
    }],
    examples: [{
      title: { type: String, required: true },
      command: { type: String, required: true },
      description: { type: String }
    }],
    workflows: [{
      description: { type: String, required: true },
      content: { type: String, required: true },
      terminalScript: [{ type: String }]
    }],
    tags: [{ type: String, index: true }], // Multikey index for tag filtration
    viewCount: { type: Number, default: 0, index: true }
  },
  { timestamps: true }
);

// Unified text search index with custom weights
CommandSchema.index(
  {
    title: 'text',
    command: 'text',
    tags: 'text',
    description: 'text'
  },
  {
    weights: {
      title: 10,
      command: 8,
      tags: 5,
      description: 2
    },
    name: 'CommandTextSearchIndex'
  }
);

export const Command = mongoose.models.Command || mongoose.model<ICommand>('Command', CommandSchema);
