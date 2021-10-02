import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BugSchema = new Schema( {
  closed: {type: Boolean, default: false, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  priority: {type: Number, enum: [1, 2, 3, 4, 5], required: true},
  updatedAt: { type: Date},
  // creator: { type: } TODO  ask for clarification on $creator: Account on UML...
},
{ timestamps: true, toJSON: { virtuals: true } }
)
BugSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})