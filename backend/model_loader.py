import random

def predict_threat(traffic_data):
    if traffic_data['attack_type'] == 'Normal':
        return {"threat_score": round(random.uniform(0.01, 0.2), 2), "severity": "LOW"}
    
    score = round(random.uniform(0.7, 0.99), 2)
    severity = "CRITICAL" if score > 0.9 else "HIGH"
    
    return {"threat_score": score, "severity": severity}