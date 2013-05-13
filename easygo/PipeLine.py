
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
		pass
	def delete_db_item(self,db,colname,name):
		pass


