--Create Tables for each of the datasets 
CREATE TABLE heart (
	age INT,
	sex INT,
	chest_pain_type INT,
	resting_blood_pressure INT,
	cholesterol INT,
	fasting_blood_sugar INT,
	resting_ecg INT,
	max_heart_rate INT,
	exercise_angina INT,
	old_peak INT,
	slope INT,
	number_major_vessels INT,
	thalassemia int,
	diagnosis INT
);
SELECT * FROM heart

CREATE TABLE stroke (
	id INT,
	sex INT, 
	age INT,
	hypertension INT,
	heart_disease INT,
	ever_married INT,
	work_type INT,
	residence_type INT,
	avg_glucose_level INT,
	bmi INT,
	smoking_status INT,
	stroke INT
);
SELECT * FROM stroke

CREATE TABLE health_cost (
	age INT,
	sex INT,
	bmi INT,
	children INT,
	smoker INT,
	charges INT
);
SELECT * FROM health_cost