import os
import joblib
from sklearn.ensemble import RandomForestClassifier

# Create the folder if it doesn't exist
os.makedirs('ml_models', exist_ok=True)

# Create a dummy scikit-learn model
print("Training AI Threat Detection Model...")
clf = RandomForestClassifier()
# Dummy training data (X: packet size, Y: 0 for normal, 1 for attack)
X = [[1024], [4096], [256], [1500], [64]]
y = [0, 1, 1, 0, 1]
clf.fit(X, y)

# Save the model as a .pkl file
joblib.dump(clf, 'ml_models/threat_model.pkl')
print("Model saved successfully to ml_models/threat_model.pkl!")