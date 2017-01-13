# Programmeerproject
# convert2JSON.py
#
# Name: Lotte Slim
# Number: 10654976

import csv, json
from country_codes import *
import math

country_list = []
world_list = []
year_list = []

years = ["2010", "2014"]
population = {
    "2010": {},
    "2014": {}
}

def append_countrycode(index):
    """
    This function connects countries to countrycodes

    index: index in the row corresponding to the name of the country

    returns a dictionary where the keys are the countrycodes and the 
    values are a new dictionary including the name of the country as value
    """

    new_dict = dict()

    for country in country_codes:
        if row[index] == country[2]:
            new_dict[country[1]] = {"country": country[2]}

    return new_dict

fillkeys = ["A", "B", "C", "D", "E", "No Data"]
data = dict()

# Add countrycode, country, obesity, overweight and BMI to dictionary
with open('../data/weight.csv', 'rU') as infile:
    reader = csv.reader(infile)

    for row in reader:

        for country in country_codes:
            if row[0] == country[2]:
                numbers = [row[1].split()[0], row[7].split()[0], row[13].split()[0]]

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

                data[country[1]] = {"country": country[2],
                                    "weight": [{"category": "overweight", "number": numbers[0], 
                                                "fillKey": overweight},
                                                {"category": "obesity", "number": numbers[1],
                                                "fillKey": obesity},
                                                {"category": "BMI", "number": numbers[2],
                                                "fillKey": bmi}]}
    infile.close()

# Add GDP and population
with open('../data/GDP_school_population.csv') as infile:
    reader = csv.reader(infile)


outfile = open('../project/data.json', 'w')

json.dump(data, outfile, ensure_ascii=False)
outfile.close()

        
        

    # print data
      
#     for row in reader:            
#         # append to current dictionary
#         if row[2] in population[years[0]]:
#             for i in range(4):
#                 if row[0] == "Population ages 15-64 (% of total)":
#                     population[years[i]][row[2]]["categoryratio"] += [{"category": "15-64", "ratio": row[i+3]}]
#                 elif row[0] == "Population ages 65 and above (% of total)":
#                     population[years[i]][row[2]]["categoryratio"] += [{"category": "65+", "ratio": row[i+3]}]
#                 elif row[0] == "Population. total":
#                     population[years[i]][row[2]]["total"] = row[i+3]

#                     # fillKeys
#                     if row[i+3] == "..":
#                         population[years[i]][row[2]]["fillKey"] = 'nodata'
#                     elif int(row[i+3]) < 100000:
#                         population[years[i]][row[2]]["fillKey"] = 'A'
#                     elif int(row[i+3]) < 1000000:
#                         population[years[i]][row[2]]["fillKey"] = 'B'
#                     elif int(row[i+3]) < 10000000:
#                         population[years[i]][row[2]]["fillKey"] = 'C'
#                     elif int(row[i+3]) < 100000000:
#                         population[years[i]][row[2]]["fillKey"] = 'D'
#                     elif int(row[i+3]) < 1000000000:
#                         population[years[i]][row[2]]["fillKey"] = 'E'
#                     else:
#                         population[years[i]][row[2]]["fillKey"] = 'F'  

#         # create new dictionary
#         else:
#             for i in range(4):
#                 country = dict()
#                 country["country"] = row[1]
#                 country["categoryratio"] = [{"category": "0-14", "ratio": row[i+3]}]

#                 population[years[i]][row[2]] = country

#     infile.close()

# outfile = open('world_population.json', 'w')

# json.dump(population, outfile, ensure_ascii=False)
# outfile.close()