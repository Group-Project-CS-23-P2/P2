import sys
import numpy as np
import scipy as sp
import json
from scipy.optimize import minimize, LinearConstraint


# Get the arguments passed from Node.js
args_from_nodejs = sys.argv[1:]
calculatedActivityList = [];
feature1 = float(args_from_nodejs[0]);
feature2 = float(args_from_nodejs[1]);
feature3 = float(args_from_nodejs[2]);
feature4 = float(args_from_nodejs[3]);
feature5 = float(args_from_nodejs[4]);

featureVector = np.array([feature1, feature2, feature3, feature4, feature5]);

listOfActivityObject = args_from_nodejs[5:];

for i in range(len(listOfActivityObject)):
    currentObject = json.loads(listOfActivityObject[i]);
    currentObjectNParray = np.array(currentObject["listofFeatures"][0:5]);
    #This needs to be converted to NP arrays
    cosineSimilarity = np.dot(featureVector, currentObjectNParray) / (np.linalg.norm(featureVector) * np.linalg.norm(currentObjectNParray));
    #Create tuple from object
    addedTuple = tuple((currentObject["id"], cosineSimilarity));
    calculatedActivityList.append(addedTuple);

#sort list of tuples
calculatedActivityList.sort(key = lambda x: x[1]);

ReturnObject = {"ListOfObjectIDs": calculatedActivityList}

listOfReturnedActivities = [(calculatedActivityList[-5:])];
listOfIds = [];

for i in range(5):
    currentTuple = listOfReturnedActivities[0][i]
    listOfIds.append(currentTuple[0])
    
ReturnObject["ListOfObjectIDs"] = listOfIds;


print(json.dumps(ReturnObject));

#print(json.dumps(ReturnObject, indent = 4));
#Create list of activity ID's 




