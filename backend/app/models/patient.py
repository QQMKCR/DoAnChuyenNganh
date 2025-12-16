from app.database import Database

class Patient:
    """Patient model"""
    
    @staticmethod
    def create(citizen_id, full_name, gender, date_of_birth, phone, address, user_id=None):
        """Create new patient"""
        try:
            Database.add_patient(citizen_id, full_name, gender, date_of_birth, phone, address, user_id)
            return True
        except Exception as e:
            print(f"Error creating patient: {e}")
            return False
    
    @staticmethod
    def get_by_id(patient_id):
        """Get patient by ID"""
        return Database.get_patient_by_id(patient_id)
    
    @staticmethod
    def get_all(user_id=None):
        """Get all patients or by user"""
        return Database.get_all_patients(user_id)
    
    @staticmethod
    def update(patient_id, **kwargs):
        """Update patient"""
        return Database.update_patient(patient_id, **kwargs)
    
    @staticmethod
    def delete(patient_id):
        """Delete patient"""
        return Database.delete_patient(patient_id)
