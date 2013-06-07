import time

def foo0(num):
    print "foo0: "+str(num)
    for x in range(1,5):
        yield "test test x:" +str(x) + " >>> num:"+ str(num)

def foo1():
    for i in range(1,10):
        yield foo0(i).next()
            
def foo2():
    for item in foo0(10):
        yield item

def foo3():
    for item in foo2():
        item.next()
        
            
def foo4():
    res = foo2()
    while True:
        try:
            tmp = res.next()
        except: 
            break
        else:
            yield "foo4 ", tmp
            
            
res = foo4()
while True:
    try:
        t1, t2 = res.next()
    except:
        break
    else:
        print t1
        print t2







"""
use this http://stackoverflow.com/questions/11197186/how-do-i-yield-results-from-a-nested-python-generator-function
to handle nested yield
"""




        