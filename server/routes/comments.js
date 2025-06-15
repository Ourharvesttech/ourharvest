const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Topic = require('../models/Topic');
const { auth } = require('../middleware/auth');

// Get comments for a topic
router.get('/topic/:topicId', async (req, res) => {
  try {
    const comments = await Comment.find({ topic: req.params.topicId })
      .populate('author', 'username avatar reputation')
      .sort('-createdAt');

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create comment
router.post('/', auth, async (req, res) => {
  try {
    const topic = await Topic.findById(req.body.topic);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    if (topic.isLocked) {
      return res.status(403).json({ error: 'Topic is locked' });
    }

    const comment = new Comment({
      ...req.body,
      author: req.user._id
    });

    await comment.save();
    await comment.populate('author', 'username avatar reputation');

    // Emit socket event for real-time updates
    req.app.get('io').to(req.body.topic).emit('comment_added', comment);

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update comment
router.patch('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    comment.content = req.body.content;
    comment.isEdited = true;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete comment
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vote on comment
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const { voteType } = req.body; // 'up' or 'down'
    const userId = req.user._id;

    // Remove existing votes
    comment.upvotes = comment.upvotes.filter(id => id.toString() !== userId.toString());
    comment.downvotes = comment.downvotes.filter(id => id.toString() !== userId.toString());

    // Add new vote
    if (voteType === 'up') {
      comment.upvotes.push(userId);
    } else if (voteType === 'down') {
      comment.downvotes.push(userId);
    }

    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark comment as solution
router.patch('/:id/solution', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const topic = await Topic.findById(comment.topic);
    if (topic.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Remove solution status from other comments
    await Comment.updateMany(
      { topic: comment.topic },
      { isSolution: false }
    );

    comment.isSolution = true;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 