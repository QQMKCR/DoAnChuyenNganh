# Hướng dẫn Cài đặt và Chạy Project

## Cấu trúc Project

```
DoAnChuyenNganh/
├── MHS/                    # Frontend (React + TypeScript)
│   └── package.json
├── backend/                # Backend (Python + Flask)
│   ├── requirements.txt
│   ├── run.py
│   └── config.py
└── data.sql               # Database script
```

## Yêu cầu

- **Node.js** 18+ (cho frontend)
- **Python** 3.8+ (cho backend)
- **MySQL** 8.0+ (cho database)
- **MySQL Connector/Python** (cài qua pip)

## Cài đặt MySQL Database

### 1. Cài đặt MySQL Server
- Tải và cài đặt MySQL từ https://dev.mysql.com/downloads/mysql/
- Hoặc dùng XAMPP/WAMP nếu trên Windows

### 2. Tạo database
- Mở MySQL Command Line hoặc MySQL Workbench
- Chạy script `backend/data/create_mysql_db.sql` để tạo database và tables

### 3. Cập nhật connection string (nếu cần)
- Mở `.env` trong folder `backend/`
- Cập nhật `DB_SERVER`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`

```
DB_SERVER=localhost
DB_PORT=3306
DB_DATABASE=HeartCareDB
DB_USER=root
DB_PASSWORD=your-password
```

## Setup Frontend (React)

### 1. Vào folder frontend
```bash
cd MHS
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Chạy development server
```bash
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:5173**

## Setup Backend (Python/Flask)

### 1. Vào folder backend
```bash
cd backend
```

### 2. Tạo virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Cài đặt dependencies
```bash
pip install -r requirements.txt
```

### 4. (Optional) Huấn luyện ML Model
```bash
python models/train_model.py
```

Điều này sẽ tạo `models/heart_risk_model.pkl`

### 5. Chạy development server
```bash
python run.py
```

Backend sẽ chạy tại: **http://localhost:5000**

## Chạy toàn bộ project

### Terminal 1 - Frontend
```bash
cd MHS
npm install  # Lần đầu
npm run dev
```

### Terminal 2 - Backend
```bash
cd backend
source venv/bin/activate  # hoặc venv\Scripts\activate trên Windows
pip install -r requirements.txt  # Lần đầu
python run.py
```

## API Endpoints

### Authentication
```
POST   /api/auth/register     - Đăng ký tài khoản
POST   /api/auth/login        - Đăng nhập
GET    /api/auth/verify       - Xác minh token
```

### Patients
```
GET    /api/patients          - Lấy danh sách bệnh nhân
POST   /api/patients          - Tạo bệnh nhân mới
GET    /api/patients/<id>     - Lấy thông tin bệnh nhân
PUT    /api/patients/<id>     - Cập nhật bệnh nhân
DELETE /api/patients/<id>     - Xóa bệnh nhân
```

### Heart Risk Prediction
```
POST   /api/heart-risk/predict                      - Dự đoán
GET    /api/heart-risk/patient/<id>                 - Tất cả dự đoán
GET    /api/heart-risk/patient/<id>/latest          - Dự đoán mới nhất
GET    /api/heart-risk                              - Tất cả dự đoán
```

### Health Check
```
GET    /api/health            - Kiểm tra trạng thái
GET    /api/                  - Thông tin API
```

## Test API bằng Postman hoặc cURL

### 1. Đăng ký tài khoản
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "password": "password123",
    "full_name": "Dr. John Doe",
    "role": "doctor"
  }'
```

### 2. Đăng nhập
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "password": "password123"
  }'
```

Coppy token từ response

### 3. Tạo bệnh nhân (cần token)
```bash
curl -X POST http://localhost:5000/api/patients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "name": "Nguyen Van A",
    "email": "patient@example.com",
    "phone": "0901234567",
    "date_of_birth": "1980-01-15",
    "gender": "M",
    "medical_history": "Hypertension"
  }'
```

## Troubleshooting

### 1. Lỗi kết nối database
- Kiểm tra MySQL server có đang chạy không
- Kiểm tra DB_SERVER, DB_PORT, DB_USER, DB_PASSWORD trong .env
- Đảm bảo database HeartCareDB đã được tạo

### 2. Lỗi pymysql
```bash
pip install pymysql
```

### 2. Lỗi CORS
- Kiểm tra CORS_ORIGINS trong .env backend
- Phải chứa `http://localhost:5173` (hoặc port frontend của bạn)

### 3. Lỗi Python modules
```bash
pip install -r requirements.txt --upgrade
```

### 4. Frontend không kết nối backend
- Kiểm tra backend có chạy không
- Kiểm tra VITE_API_BASE_URL trong .env frontend

## Cấu hình Production

### Backend
1. Thay đổi FLASK_ENV thành `production`
2. Cập nhật SECRET_KEY và JWT_SECRET_KEY
3. Cập nhật database connection string
4. Deploy lên server (Heroku, Azure, AWS, v.v.)

### Frontend
1. Build production version: `npm run build`
2. Deploy `dist/` folder lên CDN hoặc web server

## Liên hệ

Nếu gặp vấn đề, vui lòng kiểm tra:
- Backend README: `backend/README.md`
- Frontend README: `MHS/README.md`
