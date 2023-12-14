import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserGroupSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  }
}, {
  timestamps: true,
});

const UserGroup = mongoose.model('UserGroup', UserGroupSchema);

export default UserGroup;
