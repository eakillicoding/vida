import joblib
import numpy as np
from sklearn.tree import DecisionTreeClassifier

# Training data (Healthy individuals vs Unhealthy individuals)
X_train = np.array([
    [150, 2700, 12, 8, 10000],  
    [165, 2900, 14, 9, 11000],  
    [180, 2750, 11, 7.5, 9500],  
    [170, 2600, 13, 8, 12000],  
    [155, 2800, 10, 7, 8700],  
    [144, 2500, 15, 9, 10500],  
    [190, 3000, 12, 7.5, 8000],  
    [175, 2850, 13, 8.5, 9800],  
    [200, 3500, 5, 5, 2000],  
    [220, 1800, 6, 6, 4000],  
    [230, 4000, 4, 4, 1000],  
    [210, 3200, 7, 6.5, 3500],  
    [195, 2800, 8, 5, 5000],  
    [205, 3300, 5, 6, 3000],  
    [225, 2500, 6, 5.5, 4500]
])

# Labels (1 = Healthy, 0 = Unhealthy)
y_train = np.array([1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0])

# Train the Decision Tree Model
model = DecisionTreeClassifier(max_depth=5, random_state=42)
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, "vida_decision_tree_model.pkl")

print("Model trained and saved successfully.")