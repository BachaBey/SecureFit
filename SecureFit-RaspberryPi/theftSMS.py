from Firebase.InitializeFirebase import initialize_firebase
from firebase_admin import db
from twilio.rest import Client
from GetUserID import get_user_by_lock_id


initialize_firebase()

# Twilio setup
TWILIO_SID = "AC487448a7ccaac58413bfb12e6b6e0471"
TWILIO_AUTH_TOKEN = "f71f7fcb19564cc1ae26b2007f30d179"
TWILIO_PHONE_NUMBER = "+18289444921"

UserID = get_user_by_lock_id()
def send_sms(to_number, message):
    """Send an SMS using Twilio"""
    client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)
    client.messages.create(
        body=message,
        from_=TWILIO_PHONE_NUMBER,
        to=to_number
    )

def alert_on_change(event):
    """Callback function triggered when database value changes"""
    print("Database updated:", event.data)

    # Fetch the latest values
    phone_ref = db.reference("BuyingSide/"+UserID+"/UserData/PhoneNumber")
    theft_ref = db.reference("BuyingSide/"+UserID+"/BikeState/TheftState/State")

    phone_number = phone_ref.get()
    theft_state = theft_ref.get()

    if theft_state == "notsafe":
        if phone_number:
            print(f"Sending SMS to {phone_number}...")
            send_sms(phone_number, "Your bike is not secure, Check it Please.")
        else:
            print("Phone number not found in the database.")
    else:
        print("No alert needed.")

# Set up real-time listener
theft_state_ref = db.reference("BuyingSide/"+UserID+"/BikeState/TheftState/State")
theft_state_ref.listen(alert_on_change)

# Keep the script running
while True:
    pass
