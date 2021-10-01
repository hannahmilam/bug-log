import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema( {
body: {type: String, required: true},
bugId: { type: Schema.Types.ObjectId, ref: 'Bug', required: true },
creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
// creator: { type: } TODO  ask for clarification on $creator: Account on UML...


},
{ timestamps: true, toJSON: { virtuals: true } }
)
NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
NoteSchema.virtual('bug', {
  localField: 'bugId',
  foreignField: '_id',
  justOne: true,
  ref: 'Bug'
})