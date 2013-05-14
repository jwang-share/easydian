
import pymongo

"""
! Author: jwang
!this class is used to write content to DB, MongoDB
"""

class PipeLine(object):
	@classmethod
	def instance(cls):
		if not hasattr(cls,"_instance"):
			cls._instance = cls()
		return cls._instance
    		
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
			db.[colname].remove()
		except Exception, e:
			print e
			return False
		else:
			return True
		


