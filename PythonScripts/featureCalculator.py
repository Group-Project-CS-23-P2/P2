import sys
import numpy as np
import scipy as sp
import json
from scipy.optimize import minimize, LinearConstraint


# Get the arguments passed from Node.js
args_from_nodejs = sys.argv[1:]

username = args_from_nodejs[0];
userphysical = (args_from_nodejs[1]) / 5;
usercreative = (args_from_nodejs[2]) / 5;
userbrainy = (args_from_nodejs[3]) / 5;
usersocial = (args_from_nodejs[4]) / 5;
usercompetitive = (args_from_nodejs[5]) / 5;
activities = args_from_nodejs[6:];
quiznparray = np.array([userphysical, usercreative, userbrainy, usersocial, usercompetitive], dtype=np.int32);

def costFunction(userfeatures):
    ratingsum = 0;

    for i in range(len(activities)):
        currentActivity = json.loads(activities[i])
        for j in range(5):
            currentActivity["listofFeatures"][j] /= 5;
        ratingsum += np.power((userfeatures.dot(np.array(currentActivity["listofFeatures"][0:5], dtype=np.int32))) - (currentActivity["rating"]) ,2);
    
    quizdiff = np.power(userfeatures.dot(quiznparray) - quiznparray.dot(quiznparray),2);

    return (1/((len(activities)+1)*2))*(ratingsum + quizdiff);


result = minimize(costFunction, quiznparray, bounds= ((0,1),(0,1),(0,1),(0,1),(0,1)));
returnobject = list(result.x);

#Nulitply fratures by 5
for i in range(5):
    returnobject[i] *= 5;


print(json.dumps(returnobject))