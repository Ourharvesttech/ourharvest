const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const { auth, checkRole } = require('../middleware/auth');

// Get all topics with pagination and filters
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;
    const sort = req.query.sort || '-createdAt';

    const query = {};
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const topics = await Topic.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'username avatar')
      .lean();

    const total = await Topic.countDocuments(query);

    res.json({
      topics,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTopics: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single topic
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id)
      .populate('author', 'username avatar reputation')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username avatar reputation'
        }
      });

    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    // Increment views
    topic.views += 1;
    await topic.save();

    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create topic
router.post('/', auth, async (req, res) => {
  try {
    const topic = new Topic({
      ...req.body,
      author: req.user._id
    });

    await topic.save();
    await topic.populate('author', 'username avatar');

    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update topic
router.patch('/:id', auth, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    if (topic.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    Object.assign(topic, req.body);
    await topic.save();

    res.json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete topic
router.delete('/:id', auth, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    if (topic.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await topic.remove();
    res.json({ message: 'Topic deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vote on topic
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    const { voteType } = req.body; // 'up' or 'down'
    const userId = req.user._id;

    // Remove existing votes
    topic.upvotes = topic.upvotes.filter(id => id.toString() !== userId.toString());
    topic.downvotes = topic.downvotes.filter(id => id.toString() !== userId.toString());

    // Add new vote
    if (voteType === 'up') {
      topic.upvotes.push(userId);
    } else if (voteType === 'down') {
      topic.downvotes.push(userId);
    }

    await topic.save();
    res.json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Lock/Unlock topic (admin/moderator only)
router.patch('/:id/lock', auth, checkRole(['admin', 'moderator']), async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    topic.isLocked = !topic.isLocked;
    await topic.save();

    res.json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 