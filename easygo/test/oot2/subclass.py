
import base

class subclass(base.base):
    def __init_(self,str1):
        super(subclass,self).__init_(str1)
        
    def printsub(self):
        print "sub call base"
        self.printstr()