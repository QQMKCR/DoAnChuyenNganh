# Heart Risk Backend API

Python backend API cho hệ thống dự đoán bệnh tim.

## Cài đặt

### 1. Tạo virtual environment
```bash
python -m venv venv
venv\Scripts\activate
```

### 2. Cài đặt dependencies
```bash
pip install -r requirements.txt
```

### 3. Cấu hình environment
Sao chép `.env.example` thành `.env` và cập nhật các giá trị:
```bash
cp .env.example .env
```

Cấu hình database SQL Server:
```
DB_SERVER=localhost
DB_DATABASE=HeartCareDB
DB_USER=sa
DB_PASSWORD=YourPassword123
DB_DRIVER=ODBC Driver 17 for SQL Server
```

### 4. Chạy script database
Chạy `data.sql` trên SQL Server Management Studio để tạo database và tables.

### 5. Chạy development server
```bash
python run.py
```

Server sẽ chạy tại `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/verify` - Xác minh token

### Patients
- `GET /api/patients` - Lấy danh sách bệnh nhân
- `POST /api/patients` - Tạo bệnh nhân mới
- `GET /api/patients/<id>` - Lấy thông tin bệnh nhân
- `PUT /api/patients/<id>` - Cập nhật bệnh nhân
- `DELETE /api/patients/<id>` - Xóa bệnh nhân

### Heart Risk Prediction
- `POST /api/heart-risk/predict` - Dự đoán nguy cơ bệnh tim
- `GET /api/heart-risk/patient/<patient_id>` - Lấy tất cả dự đoán của bệnh nhân
- `GET /api/heart-risk/patient/<patient_id>/latest` - Lấy dự đoán mới nhất
- `GET /api/heart-risk` - Lấy tất cả dự đoán

### Health Check
- `GET /api/health` - Kiểm tra trạng thái server
- `GET /api/` - Thông tin API

## Cấu trúc Project

```
backend/
├── app/
│   ├── __init__.py        # Flask app factory
│   ├── database.py        # Database connection
│   ├── utils.py           # Authentication utilities
│   ├── models/
│   │   ├── user.py        # User model
│   │   ├── patient.py     # Patient model
│   │   └── heart_risk.py  # Heart Risk model
│   └── routes/
│       ├── auth.py        # Auth endpoints
│       ├── patient.py     # Patient endpoints
│       ├── heart_risk.py  # Heart Risk endpoints
│       └── health.py      # Health check endpoints
├── config.py              # Configuration
├── run.py                 # Entry point
├── requirements.txt       # Dependencies
└── .env.example          # Environment variables template
```

## Requirements

- Python 3.8+
- Flask 3.0.0
- Flask-CORS 4.0.0
- pyodbc 4.0.39
- PyJWT 2.8.1
- scikit-learn 1.3.2 (cho ML predictions)

## Notes

- API sử dụng JWT token cho authentication
- Token phải được gửi trong header: `Authorization: Bearer <token>`
- Database sử dụng SQL Server
- CORS được bật cho http://localhost:5173 (frontend)
