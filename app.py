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

 
app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/chart1')
def chart1():
    return render_template("java.html")   #java

@app.route('/chart2')
def chart2():
    return render_template("ml.html")   #machine learning data

@app.route('/chart3')
def chart3():
    return render_template("tableau.html")   #tableau charts

# @app.route('/api/data')
# def api():
#     return TBD


if __name__ == '__main__':
    app.run(debug = True)
 