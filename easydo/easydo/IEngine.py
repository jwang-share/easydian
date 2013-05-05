

"""
! Author: jwang
"""
import simplejson as json

class IEngine:
    def __init__(self): 
        self.resultnum = 20
        self.timeout = 5
        self.lastkw = ""
        self.lastpreurl = ""
        pass
    
    #in the future, we don't want to restart the spider when the cfg is changed
    def get_keywords(self):
        kwpath = "./cfg/keywords.json"   
        try:        
            f = file(kwpath)
            kw = json.load(f)
        except:
            return self.lastkw          
        else:
            self.lastkw = kw
            return kw
           
    def get_preURL(self,name):
        pupath = "./cfg/preurl.json"
        try:
            f = file(pupath)
            pu = json.load(f)
        except:
            return self.lastpu
        else:
            self.lastpu = pu[name]
            return pu[name]
        
    def set_timeout(self,ntime_s):
        self.timeout = ntime_s
        return self.timeout
         
    def get_timeout(self):
        return self.timeout
               
    def send_requests(self):
        allkws = self.get_keywords()
        for majorkey, subdict in allkws.iteritems():
            print "send requests of " + majorkey
            for subkey,value in subdict.iteritems():
                yield self.send_request(subkey,value)
    
    def send_request(self,keyname,kws):
        raise NotImplementedError 
    
        
    
        
        
