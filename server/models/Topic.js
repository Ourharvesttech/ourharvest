const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['general', 'sustainable', 'organic', 'crop', 'tech']
  },
  tags: [{
    type: String,
    trim: true
  }],
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  isPinned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Virtual for vote count
topicSchema.virtual('voteCount').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

// Method to check if user has voted
topicSchema.methods.hasVoted = function(userId) {
  return this.upvotes.includes(userId) || this.downvotes.includes(userId);
};

module.exports = mongoose.model('Topic', topicSchema); 