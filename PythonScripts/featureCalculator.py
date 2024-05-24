import sys
import numpy as np
import scipy as sp
import json
from scipy.optimize import minimize, LinearConstraint


# Get the arguments passed from Node.js
args_from_nodejs = sys.argv[1:]

username = args_from_nodejs[0];
userphysical = int(args_from_nodejs[1]);
usercreative = int(args_from_nodejs[2]);
userbrainy = int(args_from_nodejs[3]);
usersocial = int(args_from_nodejs[4]);
usercompetitive = int(args_from_nodejs[5]);
activities = args_from_nodejs[6:];
quiznparray = np.array([userphysical, usercreative, userbrainy, usersocial, usercompetitive], dtype=np.int32);

def costFunction(userfeatures):
    ratingsum = 0;

    for i in range(len(activities)):
        currentActivity = json.loads(activities[i])
        ratingsum += np.power((userfeatures.dot(np.array(currentActivity["listofFeatures"][0:5], dtype=np.int32))) - ((currentActivity["rating"] / 5) * np.dot(np.array(currentActivity["listofFeatures"][0:5], dtype=np.int32),np.array(currentActivity["listofFeatures"][0:5], dtype=np.int32))),2);
    
    quizdiff = np.power(userfeatures.dot(quiznparray) - quiznparray.dot(quiznparray),2);

    return (1/((len(activities)+1)*2))*(ratingsum + quizdiff);


result = minimize(costFunction, quiznparray, bounds= ((1,5),(1,5),(1,5),(1,5),(1,5)));
returnobject = list(result.x);

print(json.dumps(returnobject))