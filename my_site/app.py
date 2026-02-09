from flask import Flask, render_template, request, jsonify
from cryptography.fernet import Fernet
import string

app = Flask(__name__)

# encryption
key = Fernet.generate_key()
cipher = Fernet(key)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/encrypt", methods=["POST"])
def encrypt_text():
    data = request.get_json()
    text = data.get("text", "")
    encrypted = cipher.encrypt(text.encode()).decode()
    return jsonify({"encrypted": encrypted})

@app.route("/decrypt", methods=["POST"])
def decrypt_text():
    data = request.get_json()
    encrypted = data.get("encrypted", "")
    try:
        decrypted = cipher.decrypt(encrypted.encode()).decode()
    except:
        decrypted = "Invalid encrypted text!"
    return jsonify({"decrypted": decrypted})

@app.route("/ai_security", methods=["POST"])
def ai_security():
    text = request.get_json().get("text", "")
    score, tips = analyze_security(text)
    tips_text = "\n".join(tips) if tips else "Looks strong!"
    return jsonify({"analysis": f"Security Score: {score}/100\nTips:\n{tips_text}"})

@app.route("/ai_explain", methods=["POST"])
def ai_explain():
    text = request.get_json().get("text", "")
    return jsonify({"explanation": explain_text(text)})

# local scoring
def analyze_security(text):
    tips = []
    score = 0

    length = len(text)
    if length > 12:
        score += 30
    elif length > 8:
        score += 20
    else:
        tips.append("- Increase the length.")

    if any(c.islower() for c in text):
        score += 10
    else:
        tips.append("- Add lowercase letters.")

    if any(c.isupper() for c in text):
        score += 10
    else:
        tips.append("- Add uppercase letters.")

    if any(c.isdigit() for c in text):
        score += 20
    else:
        tips.append("- Add numbers.")

    if any(c in string.punctuation for c in text):
        score += 30
    else:
        tips.append("- Add symbols (!@#$%^&*).")

    return min(score, 100), tips

def explain_text(text):
    if not text:
        return "Nothing to explain."
    result = []
    result.append(f"Length: {len(text)}")
    if text.isalpha(): result.append("Text looks like a phrase.")
    if text.isdigit(): result.append("Text looks like a number code.")
    return " ".join(result)

if __name__ == "__main__":
    app.run(debug=True)
