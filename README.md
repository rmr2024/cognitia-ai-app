# Cognitia AI App

A production-ready full-stack conversational AI web application powered by Groq's LLaMA model and MongoDB Atlas.

## 🚀 Live Demo

- **Frontend**: [Deploy to Vercel](https://vercel.com)
- **Backend**: [Deploy to Render](https://render.com)

## 📋 Overview

Cognitia AI is a simple, single-turn question-answer application. Users enter a question, receive an instant response from the AI, and the conversation is stored in MongoDB Atlas.

### ✨ Key Features

- Single question, single response (no multi-turn conversation)
- Real-time AI response using Groq API (LLaMA 3.1 8B Instant)
- Persistent storage in MongoDB Atlas
- Clean, modern UI with loading states
- Production-ready deployment on Render + Vercel
- Rate limiting and CORS protection
- Error handling and validation

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **AI**: Groq SDK (llama-3.1-8b-instant)
- **Security**: CORS, Rate Limiting, Input Validation

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS (custom)

## 📁 Folder Structure

```
cognitia-ai-app/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── queryController.js # Query processing logic
│   ├── models/
│   │   └── Query.js           # Mongoose schema
│   ├── routes/
│   │   └── queryRoutes.js     # API routes
│   ├── server.js              # Express app entry
│   ├── .env.example           # Environment template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main component
│   │   ├── main.jsx           # React entry
│   │   └── index.css          # Styles
│   ├── .env.example           # Environment template
│   ├── vite.config.js
│   ├── vercel.json            # Vercel config
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI/CD
├── render.yaml                # Render deployment config
├── DEPLOYMENT.md              # Detailed deployment guide
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account
- Groq API key

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/cognitia-ai-app.git
cd cognitia-ai-app
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your credentials:

```env
PORT=5000
NODE_ENV=development
GROQ_API_KEY=your_groq_api_key_here
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cognitia
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

Install dependencies and start:

```bash
npm install
npm start
```

### 3. Frontend Setup

```bash
cd frontend
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Install dependencies and start:

```bash
npm install
npm run dev
```

### 4. Access Application

Open http://localhost:5173 in your browser.

## 🌐 Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step deployment instructions.

### Quick Deploy

#### Backend → Render
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

#### Frontend → Vercel
1. Push code to GitHub
2. Import project to Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy

## 📡 API Documentation

### POST /api/ask

Submit a question and receive an AI response.

**Request:**
```json
{
  "question": "What is the capital of France?"
}
```

**Response:**
```json
{
  "response": "The capital of France is Paris."
}
```

**Error Response:**
```json
{
  "error": "Question is required and must be a non-empty string"
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## 🔐 Environment Variables

### Backend

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment | No (default: development) |
| `GROQ_API_KEY` | Groq API key | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `ALLOWED_ORIGINS` | CORS allowed origins | Yes |

### Frontend

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |

## 🧪 Testing

### Backend Health Check
```bash
curl http://localhost:5000/api/health
```

### Test AI Endpoint
```bash
curl -X POST http://localhost:5000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What is AI?"}'
```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Auto-restart on file changes
```

### Frontend Development
```bash
cd frontend
npm run dev  # Hot module replacement
```

## 📦 Build

### Frontend Production Build
```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

## 🛡 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable allowed origins
- **Input Validation**: Question length and type validation
- **Error Handling**: Comprehensive error handling middleware
- **Environment Variables**: Sensitive data in environment variables

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Verify `MONGO_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Confirm database user credentials

**Groq API Error**
- Verify `GROQ_API_KEY` is valid
- Check API rate limits
- Ensure no extra spaces in environment variable

**CORS Error**
- Add frontend URL to `ALLOWED_ORIGINS`
- Ensure no trailing slash in URLs
- Restart backend after changes

## 📈 Performance

- **Backend**: Express.js with async/await
- **Frontend**: React with Vite for fast builds
- **Database**: MongoDB Atlas with connection pooling
- **AI**: Groq's ultra-fast LLaMA inference

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

R Meenakshi Reddy

## 🙏 Acknowledgments

- [Groq](https://groq.com) for ultra-fast AI inference
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Render](https://render.com) for backend hosting
- [Vercel](https://vercel.com) for frontend hosting

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review API documentation above

---

**Made with ❤️ using Groq, MongoDB, React, and Express**
