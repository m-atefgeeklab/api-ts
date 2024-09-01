import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  year: number;
}

const bookSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  author: {
    type: String,
    required: true,
    minlength: 1
  },
  year: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

export default Book;
