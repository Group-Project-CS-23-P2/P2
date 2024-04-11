import sys
import numpy as np
import scipy as sp
import json

# Get the arguments passed from Node.js
args_from_nodejs = sys.argv[1:]

username = args_from_nodejs[0];
userphysical = args_from_nodejs[1];
usercreative = args_from_nodejs[2];
userbrainy = args_from_nodejs[3];
usersocial = args_from_nodejs[4];
usercompetitive = args_from_nodejs[5];
activities = args_from_nodejs[6:];
# Your Python script logic here

def costFunction(userfeatures):
    ratingsum = 0;

    for i in range(len(activities)):
        ratingsum += np.power((userfeatures.dot(np.array(json.loads(activities[i])["listofFeatures"]))) - activitiesRating,2);
    
    quizdiff = (0);
    return (1/((len(activities)+1)*2))*(ratingsum + quizdiff);

print("Arguments received from Node.js:", args_from_nodejs, costFunction(np.array([5,5,5,5,5])))