import sys
import numpy as np
import scipy as sp
import json
from scipy.optimize import minimize, LinearConstraint

# Get the arguments passed from Node.js
args_from_nodejs = sys.argv[1:]

username = args_from_nodejs[0];
userphysical = float(args_from_nodejs[1]) / 5;
usercreative = float(args_from_nodejs[2]) / 5;
userbrainy = float(args_from_nodejs[3]) / 5;
usersocial = float(args_from_nodejs[4]) / 5;
usercompetitive = float(args_from_nodejs[5]) / 5;
activities = args_from_nodejs[6:];
quiznparray = np.array([userphysical, usercreative, userbrainy, usersocial, usercompetitive], dtype=np.float64);

def costFunction(userfeatures):
    ratingsum = 0;

    for i in range(len(activities)):
        currentActivity = json.loads(activities[i])
        currentActivityFeatures = np.array(currentActivity["listofFeatures"][0:5], dtype=np.float64);
        for j in range(5):
            currentActivityFeatures[j] *= 0.2;
        
        ratingsum += np.power((userfeatures.dot(currentActivityFeatures)) - (float(currentActivity["rating"])),2);
    
    quizdiff = np.power(userfeatures.dot(quiznparray) - quiznparray.dot(quiznparray),2);

    return (1/((len(activities)+1)*2))*(ratingsum + quizdiff);


result = minimize(costFunction, quiznparray, bounds= ((0,1),(0,1),(0,1),(0,1),(0,1)), method='SLSQP');
returnobject = list(result.x);

#Nulitply fratures by 5
for i in range(5):
    returnobject[i] *= 5;


print(json.dumps(returnobject))