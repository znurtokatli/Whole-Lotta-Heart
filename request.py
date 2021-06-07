import requests

url = 'http://localhost:5000/predict_api'

#sample request link 
#http://127.0.0.1:5000/page_ml?gender=1&hyptertension=1&heart+disease=1&married=1&work=1&residence=1&smoking=1
#renamed file as clean_zt
#http://127.0.0.1:5000/page_ml?gender=1&hyptertension=1&heartdisease=1&married=1&work=1&residence=1&smoking=1

r = requests.post(url,json={'gender': 1,  
                            'hypertension': 0,
                            'heartdisease': 1,
                            'married': 1,
                            'work': 1,
                            'residence': 1,
                            'smokings': 1  })
print('prediction place holder')
print('prediction test')
print(r.json())  