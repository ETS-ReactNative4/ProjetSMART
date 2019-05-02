from math import *


def distance_projection(x1, y1, x2, y2, x, y):
    # ax+by+c = 0
    a = (y2 - y1) / (x2 - x1)
    c = y1 - a * x1
    b = -1
    return abs(a * x + b * y + c) / sqrt(a * a + b * b)


x1 = 2
y1 = 4
x2 = 4
y2 = 4
x = 3
y = 3
print(distance_projection(x1, y1, x2, y2, x, y))
