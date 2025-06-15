import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { topicsAPI } from '../../services/api'
import './Forumns.css'

const Forums = () => {
  const navigate = useNavigate()
  const [showNewTopicForm, setShowNewTopicForm] = useState(false)
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    sort: '-createdAt'
  })

  const [newTopic, setNewTopic] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: []
  })

  // Socket.IO connection
  useEffect(() => {
    const socket = io('http://localhost:5000')
    
    socket.on('comment_added', (comment) => {
      // Update topics if needed
      setTopics(prevTopics => 
        prevTopics.map(topic => 
          topic._id === comment.topic 
            ? { ...topic, replies: topic.replies + 1 }
            : topic
        )
      )
    })

    return () => socket.disconnect()
  }, [])

  // Fetch topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true)
        const response = await topicsAPI.getAll({
          page,
          ...filters
        })
        setTopics(response.data.topics)
        setTotalPages(response.data.totalPages)
        setError(null)
      } catch (err) {
        setError('Failed to fetch topics')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTopics()
  }, [page, filters])

  const handleNewTopicSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await topicsAPI.create(newTopic)
      setTopics(prevTopics => [response.data, ...prevTopics])
      setShowNewTopicForm(false)
      setNewTopic({
        title: '',
        content: '',
        category: 'general',
        tags: []
      })
    } catch (err) {
      setError('Failed to create topic')
      console.error(err)
    }
  }

  const handleVote = async (topicId, voteType) => {
    try {
      const response = await topicsAPI.vote(topicId, voteType)
      setTopics(prevTopics =>
        prevTopics.map(topic =>
          topic._id === topicId ? response.data : topic
        )
      )
    } catch (err) {
      setError('Failed to vote')
      console.error(err)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
    setPage(1) // Reset to first page when filters change
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="forums-container">
      <div className="forums-header">
        <h1>Farming Discussion Forum</h1>
        <button 
          className="new-topic-btn"
          onClick={() => setShowNewTopicForm(!showNewTopicForm)}
        >
          {showNewTopicForm ? 'Cancel' : 'Start New Discussion'}
        </button>
      </div>

      <div className="filters">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          <option value="general">General Discussion</option>
          <option value="sustainable">Sustainable Farming</option>
          <option value="organic">Organic Farming</option>
          <option value="crop">Crop Management</option>
          <option value="tech">Farming Technology</option>
        </select>

        <input
          type="text"
          name="search"
          placeholder="Search topics..."
          value={filters.search}
          onChange={handleFilterChange}
        />

        <select
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
        >
          <option value="-createdAt">Newest First</option>
          <option value="createdAt">Oldest First</option>
          <option value="-replies">Most Replies</option>
          <option value="-views">Most Views</option>
        </select>
      </div>

      {showNewTopicForm && (
        <form className="new-topic-form" onSubmit={handleNewTopicSubmit}>
          <input
            type="text"
            placeholder="Topic Title"
            value={newTopic.title}
            onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
            required
          />
          <select
            value={newTopic.category}
            onChange={(e) => setNewTopic({...newTopic, category: e.target.value})}
          >
            <option value="general">General Discussion</option>
            <option value="sustainable">Sustainable Farming</option>
            <option value="organic">Organic Farming</option>
            <option value="crop">Crop Management</option>
            <option value="tech">Farming Technology</option>
          </select>
          <textarea
            placeholder="Write your post here..."
            value={newTopic.content}
            onChange={(e) => setNewTopic({...newTopic, content: e.target.value})}
            required
          />
          <button type="submit" className="submit-btn">Post Discussion</button>
        </form>
      )}
      
      <div className="topics-list">
        {topics.map(topic => (
          <div key={topic._id} className="topic-card">
            <div className="topic-main">
              <div className="topic-header">
                <h3 onClick={() => navigate(`/topics/${topic._id}`)}>{topic.title}</h3>
                <span className="category-tag">{topic.category}</span>
              </div>
              <p className="topic-content">{topic.content}</p>
              <div className="topic-meta">
                <span>Posted by {topic.author.username}</span>
                <div className="topic-tags">
                  {topic.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="topic-stats">
              <div className="vote-count">
                <button onClick={() => handleVote(topic._id, 'up')}>↑</button>
                <span>{topic.upvotes.length - topic.downvotes.length}</span>
                <button onClick={() => handleVote(topic._id, 'down')}>↓</button>
              </div>
              <span>{topic.replies} replies</span>
              <span>{topic.views} views</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Forums
