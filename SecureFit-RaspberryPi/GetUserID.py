from firebase_admin import db
from Firebase.InitializeFirebase import initialize_firebase

initialize_firebase()

def get_user_by_lock_id():
    """Find the UserID that matches the given LockID."""
    lock_id = "L1" # Lock ID
    users_ref = db.reference("/BuyingSide/")
    users_data = users_ref.get()

    if users_data:
        for user_id, details in users_data.items():
            if details.get("LockID") == lock_id:
                return user_id
    
    return None  # No matching user found

