import random
import time

def generate_mock_traffic():
    attack_types = ['Normal', 'DDoS', 'Phishing', 'Ransomware', 'Botnet', 'Port Scan']
    sources = ['192.168.1.50', '45.22.11.9', '10.0.0.5', '114.55.20.1']
    countries = ['Russia', 'China', 'USA', 'Brazil', 'India']
    
    # 80% chance of normal traffic, 20% chance of attack
    is_attack = random.random() > 0.8
    
    return {
        "timestamp": time.time(),
        "source_ip": random.choice(sources),
        "origin_country": random.choice(countries),
        "attack_type": random.choice(attack_types[1:]) if is_attack else 'Normal',
        "packet_size": random.randint(64, 1500),
        "protocol": random.choice(['TCP', 'UDP', 'HTTP'])
    }