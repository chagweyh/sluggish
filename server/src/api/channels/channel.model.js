import mongoose from 'mongoose';
import slugify from 'slugify';

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    slug: String,
    purpose: {
      type: String,
      minlength: 5,
      maxlength: 255,
    },
    private: {
      type: Boolean,
      default: false,
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: { createdAt: true, updatedAt: false },
  },
);

channelSchema.pre('save', function slugifyChannel(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

channelSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'channel',
});

function autopopulate(next) {
  this.populate('messages createdBy');
  next();
}

channelSchema.pre('findOne', autopopulate);
channelSchema.pre('find', autopopulate);

export default mongoose.model('Channel', channelSchema);
