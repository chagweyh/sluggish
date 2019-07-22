import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    channel: {
      type: mongoose.Schema.ObjectId,
      ref: 'Channel',
      required: true,
    },
    readBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

function autopopulate(next) {
  // this.populate('createdBy', 'username _id gravatar');
  this.populate('createdBy');
  next();
}

messageSchema.pre('findOne', autopopulate);
messageSchema.pre('find', autopopulate);

export default mongoose.model('Message', messageSchema);
