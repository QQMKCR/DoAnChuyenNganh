import pymysql
import os
from datetime import datetime
from config import get_config

CFG = get_config()

def _get_conn():
    conn = pymysql.connect(
        host=CFG.DB_SERVER,
        port=CFG.DB_PORT,
        user=CFG.DB_USER,
        password=CFG.DB_PASSWORD,
        database=CFG.DB_DATABASE,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )
    return conn

def _ensure_tables():
    conn = _get_conn()
    cur = conn.cursor()

    cur.execute('''
    CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        role VARCHAR(50),
        phone VARCHAR(20),
        created_at DATETIME
    )
    ''')

    cur.execute('''
    CREATE TABLE IF NOT EXISTS patients (
        patient_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        phone VARCHAR(20),
        date_of_birth DATE,
        gender VARCHAR(10),
        medical_history TEXT,
        bhytId VARCHAR(50),
        province VARCHAR(100),
        created_by INT,
        created_at DATETIME
    )
    ''')

    cur.execute('''
    CREATE TABLE IF NOT EXISTS predictions (
        prediction_id INT AUTO_INCREMENT PRIMARY KEY,
        patient_id INT,
        age INT,
        sex INT,
        cp INT,
        trestbps FLOAT,
        chol FLOAT,
        fbs INT,
        restecg INT,
        thalach FLOAT,
        exang INT,
        oldpeak FLOAT,
        slope INT,
        ca INT,
        thal INT,
        prediction INT,
        prediction_date DATETIME
    )
    ''')

    conn.commit()
    conn.close()


_ensure_tables()


def _row_to_dict(row):
    return row


class Database:
    """SQLite-backed Database operations with same API as previous in-memory class."""

    @staticmethod
    def add_user(email, password_hash, full_name, role, phone):
        conn = _get_conn()
        cur = conn.cursor()
        created_at = datetime.now()
        cur.execute('''INSERT INTO users (email, password_hash, full_name, role, phone, created_at)
                       VALUES (%s, %s, %s, %s, %s, %s)''',
                    (email, password_hash, full_name, role, phone, created_at))
        conn.commit()
        user_id = cur.lastrowid
        conn.close()
        return user_id

    @staticmethod
    def get_user_by_email(email):
        conn = _get_conn()
        cur = conn.cursor()
        cur.execute('SELECT * FROM users WHERE email = %s', (email,))
        row = cur.fetchone()
        conn.close()
        return _row_to_dict(row)

    @staticmethod
    def get_user_by_id(user_id):
        conn = _get_conn()
        cur = conn.cursor()
        cur.execute('SELECT * FROM users WHERE user_id = %s', (user_id,))
        row = cur.fetchone()
        conn.close()
        return _row_to_dict(row)

    @staticmethod
    def get_all_users():
        conn = _get_conn()
        cur = conn.cursor()
        cur.execute('SELECT * FROM users')
        rows = cur.fetchall()
        conn.close()
        return [ _row_to_dict(r) for r in rows ]

    @staticmethod
    def add_patient(citizen_id, full_name, gender , date_of_birth, phone, address, province, condition, user_id):
        conn = _get_conn()
        cur = conn.cursor()
        created_at = datetime.now()
        cur.execute('''INSERT INTO patients (citizen_id, full_name, gender, date_of_birth, phone, `address`, province, `condition`, created_by, created_at)
                       VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''',
                    (citizen_id, full_name, gender, date_of_birth, phone, address, province, condition, user_id, created_at))
        conn.commit()
        patient_id = cur.lastrowid
        conn.close()
        return patient_id

    @staticmethod
    def get_patient_by_id(patient_id):
        conn = _get_conn()
        cur = conn.cursor()
        cur.execute('SELECT * FROM patients WHERE patient_id = %s', (patient_id,))
        row = cur.fetchone()
        conn.close()
        return _row_to_dict(row)

    @staticmethod
    def get_all_patients(user_id=None):
        conn = _get_conn()
        cur = conn.cursor()
        if user_id:
            cur.execute('SELECT * FROM patients WHERE created_by = %s', (user_id,))
        else:
            cur.execute('SELECT * FROM patients')
        rows = cur.fetchall()
        conn.close()
        return [ _row_to_dict(r) for r in rows ]

    @staticmethod
    def update_patient(patient_id, **kwargs):
        if not kwargs:
            return False
        allowed = ['citizen_id','full_name','gender','date_of_birth','phone','address', 'province', 'condition', 'created_by']
        sets = []
        params = []
        for k, v in kwargs.items():
            if k in allowed:
                sets.append(f"`{k}` = %s")
                params.append(v)

        if not sets:
            return False

        params.append(patient_id)
        sql = f"UPDATE patients SET {', '.join(sets)} WHERE patient_id = %s"
        conn = _get_conn()
        cur = conn.cursor()
        cur.execute(sql, params)
        conn.commit()
        changed = cur.rowcount > 0
        conn.close()
        return changed

    @staticmethod
    def delete_patient(patient_id):
        conn = _get_conn()
        cur = conn.cursor()
        cur.execute('DELETE FROM patients WHERE patient_id = %s', (patient_id,))
        conn.commit()
        deleted = cur.rowcount > 0
        conn.close()
        return deleted

    @staticmethod
    def add_prediction(patient_id, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, prediction):
        conn = _get_conn()
        cur = conn.cursor()
        prediction_date = datetime.now()
        cur.execute('''INSERT INTO predictions (patient_id, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, prediction, prediction_date)
                       VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''',
                    (patient_id, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, prediction, prediction_date))
        conn.commit()
        prediction_id = cur.lastrowid
        conn.close()
        return prediction_id

    @staticmethod
    def get_predictions_by_patient(patient_id):
        conn = _get_conn()
        cur = conn.cursor()
        cur.execute('SELECT * FROM predictions WHERE patient_id = %s ORDER BY prediction_date DESC', (patient_id,))
        rows = cur.fetchall()
        conn.close()
        return [ _row_to_dict(r) for r in rows ]

    @staticmethod
    def get_latest_prediction(patient_id):
        preds = Database.get_predictions_by_patient(patient_id)
        return preds[0] if preds else None

    @staticmethod
    def get_all_predictions():
        conn = _get_conn()
        cur = conn.cursor()
        cur.execute('SELECT * FROM predictions ORDER BY prediction_date DESC')
        rows = cur.fetchall()
        conn.close()
        return [ _row_to_dict(r) for r in rows ]

