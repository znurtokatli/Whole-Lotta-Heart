from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy import engine
from sqlalchemy import log
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, Table
from sqlalchemy.sql.schema import MetaData
import pandas as pd
from flask import Blueprint, render_template, Flask, jsonify
# ml dependencies
import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.metrics import confusion_matrix
import statsmodels.api as sm
from sklearn import linear_model
  
app = Flask(__name__)
model = pickle.load(open('trained_model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/page_js')
def page_js():
    return render_template("java.html")   #js graphics

# @app.route('/page_ml')
# def page_ml():
#     return render_template("ml.html")   #machine learning data

@app.route('/page_tableau')
def page_tableau():
    return render_template("tableau.html")   #tableau charts
 
@app.route('/page_ml', methods=['POST'])
def page_ml():

    int_features = [int(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    prediction = model.predict(final_features)
    output = round(prediction[0], 2)

    return render_template("ml.html", prediction_text='Your predicted is {}'.format(output))

@app.route('/results',methods=['POST'])
def results():

    data = request.get_json(force = True)
    prediction = model.predict([np.array(list(data.values()))])

    output = prediction[0]
    return jsonify(output)
 
if __name__ == '__main__':
    app.run(debug = True)
 