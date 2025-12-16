from flask import Blueprint, request, jsonify
from app.models.heart_risk import HeartRisk
from app.utils import require_auth
import random

heart_risk_bp = Blueprint('heart_risk', __name__, url_prefix='/api/heart-risk')


def predict_risk(age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal):
    """Simple heart risk prediction logic"""
    risk_score = 0

    if age > 55:
        risk_score += 3
    elif age > 45:
        risk_score += 2
    elif age > 35:
        risk_score += 1

    if chol > 240:
        risk_score += 2
    elif chol > 200:
        risk_score += 1

    if trestbps > 140:
        risk_score += 2
    elif trestbps > 120:
        risk_score += 1

    if thalach < 60 or thalach > 100:
        risk_score += 1

    risk_score += random.randint(0, 2)

    return 1 if risk_score >= 5 else 0


@heart_risk_bp.route('/predict', methods=['POST'])
@require_auth
def predict_heart_risk():
    """Predict heart risk for patient"""
    try:
        data = request.get_json() or {}

        # 🔹 Validation tối thiểu (KHÔNG đổi cấu trúc)
        required_fields = ['patient_id', 'age', 'sex']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # 🔹 BỔ SUNG DEFAULT CHO CÁC FEATURE ML
        cp = data.get('cp', 0)
        trestbps = data.get('trestbps', 120)
        chol = data.get('chol', 200)
        fbs = data.get('fbs', 0)
        restecg = data.get('restecg', 0)
        thalach = data.get('thalach', 75)
        exang = data.get('exang', 0)
        oldpeak = data.get('oldpeak', 0)
        slope = data.get('slope', 0)
        ca = data.get('ca', 0)
        thal = data.get('thal', 0)

        # 🔹 Make prediction (KHÔNG đổi hàm)
        prediction = predict_risk(
            data['age'],
            data['sex'],
            cp,
            trestbps,
            chol,
            fbs,
            restecg,
            thalach,
            exang,
            oldpeak,
            slope,
            ca,
            thal
        )

        # 🔹 Save prediction to database (KHÔNG đổi model)
        success = HeartRisk.create(
            patient_id=data['patient_id'],
            age=data['age'],
            sex=data['sex'],
            cp=cp,
            trestbps=trestbps,
            chol=chol,
            fbs=fbs,
            restecg=restecg,
            thalach=thalach,
            exang=exang,
            oldpeak=oldpeak,
            slope=slope,
            ca=ca,
            thal=thal,
            prediction=prediction
        )

        if success:
            return jsonify({
                'prediction': int(prediction),
                'risk_level': 'High' if prediction == 1 else 'Low',
                'message': 'Prediction saved successfully'
            }), 200
        else:
            return jsonify({'error': 'Failed to save prediction'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@heart_risk_bp.route('/patient/<int:patient_id>', methods=['GET'])
@require_auth
def get_patient_predictions(patient_id):
    """Get all predictions for a patient"""
    try:
        predictions = HeartRisk.get_by_patient(patient_id)
        return jsonify(predictions), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@heart_risk_bp.route('/patient/<int:patient_id>/latest', methods=['GET'])
@require_auth
def get_latest_prediction(patient_id):
    """Get latest prediction for a patient"""
    try:
        prediction = HeartRisk.get_latest_by_patient(patient_id)
        if not prediction:
            return jsonify({'error': 'No predictions found'}), 404
        return jsonify(prediction), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@heart_risk_bp.route('', methods=['GET'])
@require_auth
def get_all_predictions():
    """Get all predictions"""
    try:
        predictions = HeartRisk.get_all()
        return jsonify(predictions), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
