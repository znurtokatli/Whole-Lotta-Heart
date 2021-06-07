import matplotlib.pyplot as plt
import pandas as pd
import os 
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pickle

#diagnosis prediction model
# # Read the csv file into a pandas DataFrame 
# heart = pd.read_csv('heart_clean.csv')
 
# X = heart.drop("diagnosis", axis=1)
# y = heart["diagnosis"] 


# X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)

# classifier = LogisticRegression()
 
# classifier.fit(X_train, y_train)

# predictions = classifier.predict(X_test) 


# stroke prediction
stroke = pd.read_csv('Data/stroke_clean.csv') #stroke_clean_lp
stroke = stroke[stroke.work_type != 'children']
stroke = stroke[stroke.gender != 'Other']
stroke = stroke.dropna()


X = stroke.drop("stroke", axis=1)
y = stroke["stroke"]

X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)

classifier = LogisticRegression()

classifier.fit(X_train, y_train)

predictions = classifier.predict(X_test)
# predictions[:10]
print(f"First 10 Predictions:   {predictions[:1000]}")
print(f"First 10 Actual labels: {y_test[:1000].tolist()}")
 
#creating and training a model
#serializing our model to a file called model.pkl
pickle.dump(classifier, open("model.pkl","wb"))
model = pickle.load(open('model.pkl','rb'))
print(model.predict(predictions[:1000]))
