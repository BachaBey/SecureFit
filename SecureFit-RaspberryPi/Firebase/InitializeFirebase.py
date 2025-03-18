import firebase_admin
from firebase_admin import credentials

# Initialize Firebase
def initialize_firebase():
    if not firebase_admin._apps:
        cred = credentials.Certificate("Firebase/FirebaseKey.json")  # Update path if needed
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://fit-fe30b-default-rtdb.europe-west1.firebasedatabase.app/'
        })
initialize_firebase()