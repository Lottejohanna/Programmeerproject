# Programmeerproject
# convert2JSON.py
#
# Name: Lotte Slim
# Number: 10654976

import csv, json, math
from country_codes import *

years = ["2014", "2010"]
fillkeys = ["A", "B", "C", "D", "E", "No Data"]
data = {
    "2010": {},
    "2014": {}
}

# Add countrycode, country, obesity, overweight and BMI to dictionary
with open('../data/weight.csv', 'rU') as infile:
    reader = csv.reader(infile)

    for row in reader:
        for country in country_codes:
            if row[0] == country[2]:

                for i in range(len(years)):
                    #2010: 2,4,6 2014: 1,3,5
                    numbers = [row[i+1].split()[0], row[i+3].split()[0], row[i+5].split()[0]]

                    # make the fillkeys
                    # use try and except because of points with no data
                    try:
                        overweight = fillkeys[int(float(numbers[0])/20)]
                        obesity = fillkeys[int(float(numbers[1])/10)]
                        bmi = fillkeys[int((float(numbers[2]) - 20) / 2.4)]
                    except ValueError:
                        overweight = fillkeys[5]
                        obesity = fillkeys[5]
                        bmi = fillkeys[5]

                    data[years[i]][country[1]] = {"country": country[2],
                                        "weight": [{"category": "overweight", "number": numbers[0], 
                                                    "fillKey": overweight},
                                                    {"category": "obesity", "number": numbers[1],
                                                    "fillKey": obesity},
                                                    {"category": "BMI", "number": numbers[2],
                                                    "fillKey": bmi}]}
    infile.close()

# Add GDP and population
with open('../data/GDP_school_population2.csv', 'rU') as infile:
    reader = csv.reader(infile)

    for row in reader:
        # check if countrycode is in dictionary
        if row[1] in data[years[0]]:
            
            for i in range(len(years)):
            # append to current dictionary
                if row[2] == "GDP per capita (current US$)":
                    data[years[i]][row[1]]["GDP"] = row[4-i]
                elif row[2] == "Population. total":
                    data[years[i]][row[1]]["population"] = row[4-i]

    infile.close()
            
# Add Happiness
with open('../data/happiness.csv', 'rU') as infile:
    reader = csv.reader(infile)

    for row in reader:
        for country in country_codes:
            # check if country exists in happiness file and in dictionary
            if (row[0] == country[2]) and (country[1] in data[years[0]]):
                for i in range(len(years)):
                    # get only 2010 and 2014 from csv
                    if row[1] == years[i]:
                        data[years[i]][country[1]]["happiness"] = row[2]

    infile.close()

outfile = open('../project/data.json', 'w')

json.dump(data, outfile, ensure_ascii=False)
outfile.close()


# def append_countrycode(index):
#     """
#     This function connects countries to countrycodes

#     index: index in the row corresponding to the name of the country

#     returns a dictionary where the keys are the countrycodes and the 
#     values are a new dictionary including the name of the country as value
#     """

#     new_dict = dict()

#     for country in country_codes:
#         if row[index] == country[2]:
#             new_dict[country[1]] = {"country": country[2]}

#     return new_dict
