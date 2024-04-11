import sys
import numpy as np
import scipy as sp

# Get the arguments passed from Node.js
args_from_nodejs = sys.argv[1:]

username = args_from_nodejs[0];

# Your Python script logic here
print("Arguments received from Node.js:", args_from_nodejs)