import logging
from datetime import datetime

logging.basicConfig(filename='logs/security_events.log', level=logging.INFO)

def trigger_defense(threat_data):
    ip = threat_data.get('source_ip')
    attack = threat_data.get('attack_type')
    action_taken = f"BLOCKED IP {ip} due to {attack} behavior."
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logging.info(f"[{timestamp}] CRITICAL THREAT: {action_taken}")
    print(f"DEFENSE TRIGGERED: {action_taken}")
    return action_taken