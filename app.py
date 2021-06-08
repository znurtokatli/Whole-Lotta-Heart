# ml dependencies
import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy 
import pickle   

from config import db_pwd
 
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = f'postgresql://postgres:{db_pwd} .\
                @https://uncc-datavizbc-finalproject-data.s3.us-east-2.amazonaws.com/:5432/postgres'

db = SQLAlchemy(app) 
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/page_js')
def page_js():
    return render_template("java.html")   #js graphics

@app.route('/page_ml')
def page_ml():
    return render_template("ml.html")   #machine learning data

@app.route('/page_tableau')
def page_tableau():
    return render_template("tableau.html")   #tableau charts
   

@app.route('/predict', methods=['POST'])
def predict():
    
    int_features = [int(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    prediction = model.predict(final_features)

    output = round(prediction[0], 2)

    return render_template('ml.html', prediction_text='Not Likely Stroke Predicted {}'.format(output))

# @app.route('/predict_api', methods=['POST'])
# def predict_api(): 

#     data = request.get_json(force = True)
#     prediction = model.predict([np.array(list(data.values()))])

#     output = prediction[0]
#     return jsonify(output)

if __name__ == '__main__':
    app.run(debug = True)
 