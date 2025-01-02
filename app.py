from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

app = Flask(__name__)

# Load model and scaler (if preprocessing was used during training)
model = joblib.load('project_submarine.pkl')

@app.route('/')
def home():
    return render_template('submarine.html')

def handler(request, context):
    return app(request.environ, start_response)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        # Validate input presence
        if 'features' not in data:
            return jsonify({'error': 'Features are missing in the request'}), 400
        
        # Extract features and ensure proper input format
        features = np.array(data['features']).reshape(1, -1)


        # Get prediction from the model
        prediction = model.predict(features)[0]
        
        # Map prediction to meaningful output
        if prediction == 'R':
            result = "Rock detected"
        else:
            result = "Mine detected"
        return jsonify({'result': result})
    except Exception as e:
        # Return error message in case of unexpected issues
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
