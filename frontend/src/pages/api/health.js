/**
 * Health check endpoint for container monitoring
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    service: 'frontend',
    timestamp: new Date().toISOString()
  });
} 