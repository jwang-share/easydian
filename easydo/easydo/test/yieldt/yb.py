import time

def foo0(num):
    print "foo0: "+str(num)
    yield "test test"

def foo1():
    for i in range(1,10):
        return foo0(i)
        
res = foo1()

substr = res.next()
print substr

"""
use this http://stackoverflow.com/questions/11197186/how-do-i-yield-results-from-a-nested-python-generator-function
to handle nested yield
"""




        