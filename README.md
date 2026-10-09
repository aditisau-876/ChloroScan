# 🌿 ChloroScan

### AI-Powered Plant Identification, Disease Detection & Care Assistant

ChloroScan is an AI-powered web application that helps users identify plants, detect potential plant diseases from images, and access useful plant-care guidance. By combining deep learning, plant information, weather insights, and personalized care reminders, ChloroScan aims to make plant health monitoring and everyday gardening smarter, easier, and more accessible.

From recognizing a plant to identifying potential diseases and discovering appropriate care recommendations, ChloroScan brings essential plant-care capabilities together in one platform.

## 🌱 Live Demo

* **Frontend:** [ChloroScan Web App](https://chloroscan-1-ciqc.onrender.com)
* **Backend API:** [ChloroScan API](https://chloroscan-y5cl.onrender.com)
* **Interactive API Documentation:** [API Docs](https://chloroscan-y5cl.onrender.com/docs)


---

## ✨ Features

### 🌿 AI-Powered Plant Identification

* Identify plants from uploaded images.
* Classify plants into supported categories using deep learning.
* Generate plant predictions with confidence scores.
* Display scientific names and alternative predictions where available.
* Explore similar and related plants.

### 🦠 Plant Disease Detection

* Analyze plant images to identify supported plant diseases.
* Use machine learning to recognize potential disease symptoms.
* Help users understand possible plant health issues.
* Support informed plant-care decisions through disease-related information.

*Disease detection results depend on the supported model classes, image quality, and model accuracy. Predictions should be treated as guidance rather than a guaranteed diagnosis.*

### 🪴 Plant Care Assistant

* Access useful plant-care information.
* Explore watering, sunlight, and other care recommendations where available.
* Organize plants in a personal collection.
* Set and manage plant-care reminders.
* Use weather information to support plant-care decisions.


### 👤 User Authentication

* User registration and login.
* Google OAuth integration.
* Secure authentication and protected application features.

### 🪴 Personalized Plant Collection

* Save plants to your personal collection.
* Access saved plant information from your account.
* Keep plant-related information organized in one place.


### ☀️ Weather Integration

* Retrieve weather information using the OpenWeather API.
* Provide useful weather context for plant-care decisions.

### 📱 Responsive User Interface

* Responsive layouts for desktop, tablet, and mobile.
* Dedicated pages for plant discovery, saved plants, reminders, and account management.
* Interactive interface with a clean, nature-inspired visual design.

---

## 🧠 How It Works

1. **Upload an image:** The user submits a plant image through the frontend.
2. **Category classification:** A TensorFlow classifier estimates the most likely plant category.
3. **Specialized prediction:** The appropriate category-specific model generates plant predictions.
4. **Plant information retrieval:** The backend retrieves matching plant information from the database.
5. **Related plant discovery:** Similar and related plant information is prepared for the response.
6. **Results display:** The frontend presents the identification results and available plant information.

When the classifier cannot identify a category confidently, the application can return an uncertainty response instead of forcing an unreliable identification.

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* Framer Motion
* React Router

### Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* Pydantic

### Machine Learning

* TensorFlow
* Keras
* NumPy
* Pillow

### Database and External Services

* PostgreSQL
* Neon PostgreSQL
* Cloudinary
* OpenWeather API
* Google OAuth

### Deployment

* Render — frontend
* Render — backend

---

## 🏗️ Project Architecture

```text
ChloroScan
│
├── Frontend
│   ├── React + Vite
│   ├── Responsive UI
│   ├── Authentication
│   ├── Plant Identification
│   ├── My Plants
│   └── Care Reminders
│
├── Backend
│   ├── FastAPI
│   ├── Authentication Routes
│   ├── Plant Routes
│   ├── Weather Routes
│   ├── User Plants Routes
│   ├── Reminder Routes
│   └── Machine Learning
│       ├── Category Classifier
│       ├── Fruit Predictor
│       ├── Flower Predictor
│       ├── Vegetable Predictor
│       ├── Medicinal Plant Predictor
│       └── Indoor Plant Predictor
│
├── PostgreSQL Database
├── Cloudinary Image Storage
└── External APIs
    ├── OpenWeather
    └── Google OAuth
```

*The directory names in this diagram describe the main components; the exact folder structure may differ slightly.*

---

## 🚀 Getting Started

Follow these steps to run ChloroScan locally.

### Prerequisites

Install the following:

* Node.js and npm
* Python 3.12
* Git
* PostgreSQL database access
* Required API credentials

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ChloroScan
```

### 2. Set Up the Backend

Create and activate a Python virtual environment from the project root.

**Windows PowerShell:**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```powershell
pip install -r backend/requirements.txt
```

Create a `.env` file in the location expected by your backend configuration and provide the required environment variables.

Example:

```env
DATABASE_URL=your_postgresql_connection_string
SECRET_KEY=your_secret_key
ALGORITHM=your_jwt_algorithm
ACCESS_TOKEN_EXPIRE_MINUTES=180

OPENWEATHER_API_KEY=your_openweather_api_key
GOOGLE_CLIENT_ID=your_google_client_id

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit real secrets or API credentials to GitHub.

Start the backend from the project root:

```powershell
uvicorn backend.main:app --reload
```

The API should be available at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Set Up the Frontend

Open a separate terminal:

```powershell
cd frontend
npm install
```

Configure the frontend to use your local backend URL wherever your API requests are defined.

Start the development server:

```powershell
npm run dev
```

Open the local URL displayed by Vite in your terminal.

> If your frontend folder or environment-variable configuration has a different name, adjust these commands to match your repository.

---

## 🔐 Environment Variables

The application uses environment variables to configure external services and security settings.

| Variable                      | Purpose                      |
| ----------------------------- | ---------------------------- |
| `DATABASE_URL`                | PostgreSQL connection        |
| `SECRET_KEY`                  | Authentication token signing |
| `ALGORITHM`                   | JWT signing algorithm        |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Access-token lifetime        |
| `OPENWEATHER_API_KEY`         | Weather integration          |
| `GOOGLE_CLIENT_ID`            | Google OAuth                 |
| `CLOUDINARY_CLOUD_NAME`       | Cloudinary configuration     |
| `CLOUDINARY_API_KEY`          | Cloudinary authentication    |
| `CLOUDINARY_API_SECRET`       | Cloudinary authentication    |

Configure these variables separately in the relevant deployment platform. Never publish their actual values.

---

## ☁️ Deployment

### Frontend — Render

1. Import the GitHub repository into Render.
2. Set the frontend directory as the project root if your repository contains separate frontend and backend folders.
3. Configure the required frontend environment variables, if applicable.
4. Deploy the application.
5. Update the frontend API configuration to use the deployed Railway backend URL.

### Backend — Render

1. Create a Railway project and connect the GitHub repository.
2. Configure the backend root directory to match the repository structure.
3. Install dependencies from `backend/requirements.txt`.
4. Configure the start command:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port $PORT
```

5. Add the required environment variables.
6. Generate a public domain for the backend service.
7. Configure authentication and CORS to allow requests from the deployed frontend.

> If Railway uses the `backend` folder as its root directory instead, adjust the dependency path and start command accordingly. Ensure the Python package imports and ML model paths work with the selected root directory.

---

## 🔒 Security Notes

* Keep `.env` files out of version control.
* Never expose database credentials, API secrets, or JWT signing keys.
* Configure CORS to allow only the required frontend origins.
* Restrict protected routes to authenticated users.
* Validate uploaded files before processing them.
* Keep authentication and deployment credentials private.

---

## 🌍 Project Goals

ChloroScan aims to make plant identification and everyday plant care more accessible through AI and connected web technologies.

The project combines machine learning with practical application features, helping users move from identifying a plant to discovering useful information and organizing its care.

---

## 🔮 Future Improvements

Potential future enhancements include:

* Expanded plant information and care recommendations.
* Improved prediction accuracy and confidence handling.
* Additional plant categories and model optimizations.
* More personalized plant-care reminders.
* Enhanced accessibility and user experience.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request describing your improvements.

Please avoid committing credentials, personal data, or private configuration files.

---

## 📄 License

Choose and add a suitable open-source license before presenting this project as open source. If no license has been added, all rights remain reserved by default.

---

## 🌿 ChloroScan

**Identify plants. Discover nature. Care smarter.**
