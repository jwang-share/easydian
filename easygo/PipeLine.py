

"""
! Author: jwang
!this class is used to write content to DB, MongoDB
"""
import time

class PipeLine(object):
	def __init__(self):
		pass
    		
	def save_to_db(self,db,colname,content):
		try:
			col = db[colname]
			col.insert(content)
		except Exception, e:
			print e
			return False
		else:
			return True

	def clean_context(self,db,colname):
		try:
			db[colname].remove()
		except Exception, e:
			print e
			return False
		else:
			return True

	def rewrite_db_context(self,db,colname,content):
		ret = self.clean_context(db,colname)
		if not ret:
			return False
		time.sleep(3)
		ret = self.save_to_db(db,colname,content)
		if not ret:
			return False
		return True
			
		


