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



#connect to database
# engine = create_engine("postgres://postgres:welcome1$@localhost:5432/aviation")

# DATABASE_URL = f'postgresql://postgres:welcome1@localhost:5432/aviation'
#conn = create_engine(f'postgresql://postgres:{sqlkey}@localhost:5432/aviation').connect()


#################################################
# Database Setup
#################################################
# engine = create_engine(DATABASE_URL)


# flight_details = pd.read_sql_query('SELECT * FROM flight_details', engine.connect()).to_dict()

# Create app

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
 