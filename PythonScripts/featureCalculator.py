import sys
import numpy as np
import json
from scipy.optimize import minimize

# Get the arguments passed from Node.js
args_from_nodejs = sys.argv[1:]

username = args_from_nodejs[0]
userphysical = float(args_from_nodejs[1]) / 5
usercreative = float(args_from_nodejs[2]) / 5
userbrainy = float(args_from_nodejs[3]) / 5
usersocial = float(args_from_nodejs[4]) / 5
usercompetitive = float(args_from_nodejs[5]) / 5
activities = args_from_nodejs[6:]
quiznparray = np.array([userphysical, usercreative, userbrainy, usersocial, usercompetitive], dtype=np.float64)

def cost_function(user_features):
    """
    Cost function to minimize the difference between predicted and actual ratings,
    and to ensure the user features are close to the initial quiz answers.
    """
    rating_sum = 0

    # Calculate the rating prediction error
    for activity in activities:
        current_activity = json.loads(activity)
        current_activity_features = np.array(current_activity["listofFeatures"][:5], dtype=np.float64) * 0.2
        predicted_rating = user_features.dot(current_activity_features)
        actual_rating = float(current_activity["rating"])
        rating_sum += np.power(predicted_rating - actual_rating, 2)

    # Calculate the difference from the quiz answers
    quiz_diff = np.power(user_features.dot(quiznparray) - quiznparray.dot(quiznparray), 2)

    # Regularization term to penalize large feature values (L2 regularization)
    regularization_term = np.sum(np.square(user_features))

    # Combine all terms in the cost function
    return rating_sum + quiz_diff + 0.2 * regularization_term

# Optimization with bounds
bounds = [(0, 1) for _ in range(5)]

result = minimize(cost_function, quiznparray, bounds=bounds, method='SLSQP')
return_object = list(result.x)

# Multiply features by 5 to scale back to original range
return_object = [feature * 5 for feature in return_object]

# Print the result as a JSON string
print(json.dumps(return_object))
