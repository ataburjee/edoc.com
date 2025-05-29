# 📄 eDoc - Collaborative Document Platform

**eDoc** is a powerful backend system that supports creating, editing, saving, and sharing documents — similar to Google Docs. Built with **Spring Boot**, **JWT Authentication**, and **RESTful APIs**, this system allows users to collaborate securely and efficiently.

---

## 🚀 Key Features

### 🧾 Document Management
- Create, edit, and delete documents
- Auto-save and manual save options
- Track document ownership

### 🔐 Authentication & Authorization
- Secure login & registration using JWT
- Only authenticated users can create/edit documents
- Role-based access (Owner, Collaborator)

### 🔄 Collaboration (in-progress)
- Add collaborators via email
- View access or edit access for collaborators
- Real-time collaboration coming soon (via WebSocket)

### 📤 Document Sharing
- Share documents with other users
- Control access permissions (read-only/edit)
- Unique document ID and secure URLs

---

## ⚙️ Tech Stack

- **Java 17**
- **Spring Boot 3**
- **Spring Security (JWT)**
- **JPA/Hibernate** with PostgreSQL
- **Swagger for API Testing**
- **WebSocket Support** (planned for real-time collaboration)

---

## 📂 Project Structure

src/main/java/com/edoc/
│
├── controller # REST API controllers
├── model # Entity classes (User, Document, etc.)
├── repository # JPA repositories
├── service # Business logic and services
├── security # JWT token handling and filters
└── utils # Utility classes (Date, JWT, etc.)


---

## 🔐 Authentication Flow

- **Login**:  
  `POST /api/auth/login`  
  Returns a JWT token on successful authentication

- **Header for all requests**:  


- **Register**:  
`POST /api/auth/register`  
Accepts user credentials and creates a new account

---

## 📌 API Highlights

| Endpoint                        | Method | Description                       |
|--------------------------------|--------|-----------------------------------|
| `/api/docs/`                   | GET    | Fetch all documents (owned/shared) |
| `/api/docs/{id}`               | GET    | Get document by ID                |
| `/api/docs/create`             | POST   | Create a new document             |
| `/api/docs/update/{id}`        | PUT    | Update document contents          |
| `/api/docs/share`              | POST   | Share a document with another user |

> Full API reference available in Swagger UI at:  
> `http://localhost:8080/swagger-ui/`

---

## 🧪 Running Locally

### Prerequisites

- Java 17+
- Maven
- PostgreSQL (or H2 for testing)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/edoc.git
cd edoc

# Build the application
mvn clean install

# Run the application
mvn spring-boot:run

🔄 Coming Soon
🧑‍🤝‍🧑 Real-time collaborative editing with WebSockets

💬 In-document chat/comments

🌍 Document versioning and change history

🧾 PDF export of documents

👨‍💻 Author
Atabur Rahaman Mollah (Rehman)
Full Stack Developer | Java | Spring Boot | React | REST APIs
LinkedIn | Portfolio



---

Let me know if you want to:
- Add frontend instructions (if React/Next.js used)
- Include Swagger screenshots or Postman collection
- Prepare for Docker deployment or CI/CD

I'm ready when you are to keep scaling it!
