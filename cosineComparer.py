import sys
import numpy as np
import scipy as sp
import json
from scipy.optimize import minimize, LinearConstraint


# Get the arguments passed from Node.js
args_from_nodejs = sys.argv[1:]
calculatedActivityList = [];
groupVectorObject = args_from_nodejs[0];
listOfActivityObject = args_from_nodejs[1:];

for i in range(len(listOfActivityObject)):
    currentObject = json.loads(listOfActivityObject[i]);
    #This needs to be converted to NP arrays
    currentRating = json.loads(groupVectorObject) * currentObject["features"];
    #Create tuple from object


#sort list of tuples
#Create list of activity ID's 


print(result);


