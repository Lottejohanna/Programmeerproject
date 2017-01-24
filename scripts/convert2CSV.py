import csv, json, math
from country_codes import *

# Add Happiness

# with open ('../data/happiness3.csv', 'w+') as outfile:
years = ['2014', '2013', '2012', '2011', '2010', '2009', '2008']
years2 = ['2008', '2009', '2010', '2011', '2012', '2013', '2014']

data = []
with open('../data/BMI2.csv', 'rU') as infile:
    reader = csv.reader(infile)

    for row in reader:
        for country in country_codes:
            # check if country exists in happiness file and in dictionary
            if (row[0] == country[2]):
            	

            	for i in range(1, len(row)):
            		row[i] = float(row[i].split()[0])
	            	print row[i]
            	temp_list = [row[0], country[1]]

            	for i in range(1, len(row), 2):
            		bmi = (row[i] + row[i+1]) / 2.0
            		temp_list.append(bmi)
            		
            	data.append(temp_list)
    print data


                # for i in range(len(years)):
                #     for j in range(len(weight_categories)):
                #         # get only 2010 and 2014 from csv
                #         if row[1] == years[i]:
                #             data[years[i]][weight_categories[j]][country[1]]["Happiness"] = row[2]

    infile.close()

# outfile = open('../project/data.json', 'w')

# json.dump(data, outfile, ensure_ascii=False)
# outfile.close()