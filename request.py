import requests

url = 'http://localhost:5000/predict_api'

r = requests.post(url,json={'gender': 1, 
                            'age': 67, 
                            'hypertension': 0,
                            'heart_disease': 1,
                            'ever_married': 1,
                            'work_type': 1,
                            'Residence_type': 1,
                            'smoking_status': 1  })

print(r.json())  