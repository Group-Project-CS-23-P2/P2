import sys
import numpy as np
import scipy as sp
import json
from scipy.optimize import minimize, LinearConstraint


# Get the arguments passed from Node.js
args_from_nodejs = sys.argv[1:]
calculatedActivityList = [];
feature1 = int(args_from_nodejs[0]);
feature2 = int(args_from_nodejs[1]);
feature3 = int(args_from_nodejs[2]);
feature4 = int(args_from_nodejs[3]);
feature5 = int(args_from_nodejs[4]);

featureVector = np.array([feature1, feature2, feature3, feature4, feature5]);

listOfActivityObject = args_from_nodejs[5:];

for i in range(len(listOfActivityObject)):
    currentObject = json.loads(listOfActivityObject[i]);
    currentObjectNParray = np.array(currentObject["listofFeatures"])
    #This needs to be converted to NP arrays
    cosineSimilarity = np.dot(featureVector, currentObjectNParray) / (np.linalg.norm(featureVector) * np.linalg.norm(currentObjectNParray));
    #Create tuple from object
    addedTuple = tuple((currentObject["id"], cosineSimilarity));
    calculatedActivityList.append(addedTuple);

#sort list of tuples
calculatedActivityList.sort(key = lambda x: x[1]);

ReturnObject = {"ListOfObjectIDs": calculatedActivityList}
listOfIds = [(calculatedActivityList[i])[0] for i in range(5)];
ReturnObject["ListOfObjectIDs"] = listOfIds;


print(json.dumps(ReturnObject));

#print(json.dumps(ReturnObject, indent = 4));
#Create list of activity ID's 




