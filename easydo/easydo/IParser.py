

"""
! Author: jwang
"""
class IParser:
    def __init__(self,engine):
        self.engine = engine
        self.encoding = "utf-8"
        
    #override this function to cover your request
    def get_encoding(self,result):
        return "utf-8"
        
    def send_request(self):
        result = self.engine.send_requests()
        result.encoding = self.get_encoding(result)
        #handler yield here
        while True:
            try:
                keyname,content = result.next()
            except StopIteration: # StopIteration
                break
            except:
                continue
            else:
                yield self.handle_data(keyname, content)
                  
    
    def handle_data(self,keyname,content):      
        raise NotImplementedError
        
    
    
        
        
            
    
        