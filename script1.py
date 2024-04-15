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
        ratingsum += np.power((userfeatures.dot(np.array(json.loads(activities[i])["listofFeatures"], dtype=np.int32))) - json.loads(activities[i])["rating"] * 25 ,2);
    
    quizdiff = np.power(userfeatures.dot(quiznparray) - quiznparray.dot(quiznparray),2);

    return (1/((len(activities)+1)*2))*(ratingsum + quizdiff);

cons = (LinearConstraint([1,0,0,0,0], [0], [5]),
        LinearConstraint([0,1,0,0,0], [0], [5]),
        LinearConstraint([0,0,1,0,0], [0], [5]),
        LinearConstraint([0,0,0,1,0], [0], [5]),
        LinearConstraint([0,0,0,0,1], [0], [5]))

# Your Python script logic here

result = minimize(costFunction, [2.5,2.5,2.5,2.5,2.5], bounds= ((0,5),(0,5),(0,5),(0,5),(0,5)));
returnobject = list(result.x);
print(json.dumps(returnobject))