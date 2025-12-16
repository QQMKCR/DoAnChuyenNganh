"""
Script để huấn luyện và lưu ML model
Chạy script này để tạo heart_risk_model.pkl
"""

import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import os

def train_heart_risk_model():
    """Train and save heart risk prediction model"""
    
    # Sample training data (thay thế bằng data thực tế)
    # Features: age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal
    X_train = np.array([
        [63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1],
        [37, 1, 2, 130, 250, 0, 1, 187, 0, 3.5, 0, 0, 2],
        [41, 0, 1, 130, 204, 0, 0, 172, 0, 1.4, 2, 0, 2],
        [56, 1, 1, 120, 236, 0, 1, 178, 0, 0.8, 2, 0, 2],
        [57, 0, 0, 120, 354, 0, 1, 163, 1, 0.6, 2, 0, 2],
        [57, 1, 0, 140, 260, 1, 0, 140, 0, 2.6, 1, 0, 2],
        [56, 0, 0, 140, 294, 0, 0, 153, 0, 1.3, 1, 0, 2],
        [44, 1, 1, 120, 263, 0, 1, 173, 0, 0.0, 2, 0, 2],
        [52, 1, 2, 172, 199, 1, 1, 162, 0, 5.4, 0, 0, 3],
        [57, 1, 2, 150, 168, 0, 1, 174, 0, 1.6, 2, 0, 2],
    ])
    
    # Labels: 0 = Low risk, 1 = High risk
    y_train = np.array([1, 1, 0, 1, 1, 1, 1, 0, 1, 1])
    
    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Save model
    model_path = os.path.join(os.path.dirname(__file__), 'heart_risk_model.pkl')
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")
    
    return model

if __name__ == '__main__':
    train_heart_risk_model()
