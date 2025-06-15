const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isSolution: {
    type: Boolean,
    default: false
  },
  isEdited: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Virtual for vote count
commentSchema.virtual('voteCount').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

// Method to check if user has voted
commentSchema.methods.hasVoted = function(userId) {
  return this.upvotes.includes(userId) || this.downvotes.includes(userId);
};

module.exports = mongoose.model('Comment', commentSchema); 