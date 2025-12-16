from app.database import Database

class HeartRisk:
    """Heart Risk Prediction model"""
    
    @staticmethod
    def create(patient_id, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, prediction, prediction_date=None):
        """Create heart risk prediction record"""
        try:
            Database.add_prediction(patient_id, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, prediction)
            return True
        except Exception as e:
            print(f"Error creating heart risk prediction: {e}")
            return False
    
    @staticmethod
    def get_by_patient(patient_id):
        """Get all predictions for a patient"""
        return Database.get_predictions_by_patient(patient_id)
    
    @staticmethod
    def get_latest_by_patient(patient_id):
        """Get latest prediction for a patient"""
        return Database.get_latest_prediction(patient_id)
    
    @staticmethod
    def get_all():
        """Get all predictions"""
        return Database.get_all_predictions()
    
    @staticmethod
    def get_by_id(prediction_id):
        """Get prediction by ID"""
        predictions = Database.get_all_predictions()
        for pred in predictions:
            if pred['prediction_id'] == prediction_id:
                return pred
        return None
