from flask import Flask, request
import joblib

app = Flask(__name__)
model = joblib.load(open('model_joblib2', 'rb'))


@app.route('/predict', methods=['POST'])
def predict():
    input = request.args.get('url')
    prediction = model.predict([str(input)])
    return str(prediction[0])


if __name__ == "__main__":
    app.run(debug=True)
