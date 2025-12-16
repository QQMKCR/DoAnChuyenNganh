from flask import Blueprint, request, jsonify
from app.models.patient import Patient
from app.utils import require_auth

patient_bp = Blueprint('patient', __name__, url_prefix='/api/patients')

@patient_bp.route('', methods=['POST'])
@require_auth
def create_patient():
    """Create new patient"""
    try:
        data = request.get_json()
        
        # Validation
        required_fields = ['citizen_id','full_name', 'gender', 'date_of_birth', 'phone', 'address']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        success = Patient.create(
            citizen_id=data['citizen_id'],
            full_name=data['full_name'],
            gender=data['gender'],
            date_of_birth=data['date_of_birth'],
            phone=data['phone'],
            address=data['address'],
            user_id=request.user['user_id']
        )
        
        if success:
            return jsonify({'message': 'Patient created successfully'}), 201
        else:
            return jsonify({'error': 'Failed to create patient'}), 500
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/<int:patient_id>', methods=['GET'])
@require_auth
def get_patient(patient_id):
    """Get patient by ID"""
    try:
        patient = Patient.get_by_id(patient_id)
        if not patient:
            return jsonify({'error': 'Patient not found'}), 404
        
        return jsonify(patient), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@patient_bp.route('', methods=['GET'])
@require_auth
def get_patients():
    try:
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('pageSize', 10))
        if request.user['role'] == 'admin':
            patients = Patient.get_all()
        else:
            patients = Patient.get_all(request.user['user_id'])
        
        # Pagination thủ công (vì DB không có OFFSET/LIMIT)
        start = (page - 1) * page_size
        end = start + page_size
        paginated = patients[start:end]
        
        return jsonify({
            'data': paginated,
            'total': len(patients),
            'page': page,
            'pageSize': page_size
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@patient_bp.route('/<int:patient_id>', methods=['PUT'])
@require_auth
def update_patient(patient_id):
    """Update patient"""
    try:
        data = request.get_json()
        
        success = Patient.update(patient_id, **data)
        if success:
            patient = Patient.get_by_id(patient_id)
            return jsonify(patient), 200
        else:
            return jsonify({'error': 'Failed to update patient'}), 500
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/<int:patient_id>', methods=['DELETE'])
@require_auth
def delete_patient(patient_id):
    """Delete patient"""
    try:
        success = Patient.delete(patient_id)
        if success:
            return jsonify({'message': 'Patient deleted successfully'}), 200
        else:
            return jsonify({'error': 'Failed to delete patient'}), 500
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
