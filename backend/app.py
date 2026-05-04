from flask import Flask, jsonify, request
from flask_cors import CORS
from twilio.rest import Client
import time

# Your existing custom modules
from auth import verify_login
from defense_actions import trigger_defense
from attack_simulator import generate_mock_traffic
from model_loader import predict_threat

app = Flask(__name__)
CORS(app)

# ==========================================
# 🚨 TWILIO SMS CONFIGURATION 🚨
# ==========================================
# Paste your credentials from your Twilio Console here
TWILIO_ACCOUNT_SID = 'ACe65b5dea8fad54f912e5fe21cb3b2e59'
TWILIO_AUTH_TOKEN = '6a168ba533f27809bc11e7b2829a0361'
TWILIO_PHONE_NUMBER = '+14356108906' # Your Twilio phone number
YOUR_PHONE_NUMBER = '+918093041941' # Your actual Indian phone number

last_sms_time = 0 # Cooldown tracker to prevent spam

def send_sms_alert(threat_data):
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        
        # Pulling details from your generated mock traffic
        attack_type = threat_data.get('attack_type', 'Unknown Attack')
        source_ip = threat_data.get('source_ip', 'Unknown IP')
        
        msg = f"🚨 CORTEX-SHIELD ALERT 🚨\nType: {attack_type}\nSource IP: {source_ip}\nSeverity: CRITICAL\nAction: Defense Triggered."
        
        message = client.messages.create(
            body=msg,
            from_=TWILIO_PHONE_NUMBER,
            to=YOUR_PHONE_NUMBER
        )
        print("✅ SMS Alert Sent Successfully!")
    except Exception as e:
        print(f"❌ SMS Failed (Check Twilio credentials): {e}")

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if verify_login(data.get('email'), data.get('password')):
        return jsonify({"status": "success", "token": "soc-auth-token-123"}), 200
    return jsonify({"status": "error", "message": "Invalid credentials"}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    # Simple validation
    if not email or not password or len(password) < 6:
        return jsonify({"status": "error", "message": "Invalid input. Password must be at least 6 characters."}), 400
    
    # For now, just verify it's a valid email and return success
    # In production, you'd save to a database
    if '@' in email:
        return jsonify({"status": "success", "message": "Account created successfully", "token": "soc-auth-token-123"}), 200
    return jsonify({"status": "error", "message": "Invalid email format"}), 400

@app.route('/api/threats/current', methods=['GET'])
def get_current_threats():
    global last_sms_time
    
    traffic_data = generate_mock_traffic()
    prediction = predict_threat(traffic_data)
    
    # Combine the simulated traffic with the AI prediction
    full_threat_data = {**traffic_data, **prediction}
    
    if full_threat_data.get("severity") == "CRITICAL":
        # 1. Trigger your existing automated defense
        trigger_defense(full_threat_data)
        
        # 2. Check cooldown, then trigger SMS Alert
        current_time = time.time()
        if current_time - last_sms_time > 60: 
            print("CRITICAL THREAT: Triggering SMS Alert...")
            send_sms_alert(full_threat_data)
            last_sms_time = current_time
            
    return jsonify(full_threat_data)

if __name__ == '__main__':
    print("FORCING SERVER START ON PORT 5005...")
    app.run(host='127.0.0.1', port=5005, debug=False)