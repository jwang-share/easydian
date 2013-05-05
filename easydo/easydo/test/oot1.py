
class AA():
    def __init__(self):
        self.num = 1
        pass
    def foo1(self):
        raise NotImplementedError 
    def foo2(self):
        self.foo1()
        
class BB(AA):
    def foo1(self):
        print self.num
        print "object BB calling..."
        
b = BB()
b.foo2()

"""
object BB calling...
"""