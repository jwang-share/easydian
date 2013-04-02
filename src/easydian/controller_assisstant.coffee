Shop_Schema = require "model/shop_schema"
Userinfo_Schema = require "model/userinfo_schema"

class Controller_Assisstant
  constructor: ()->
  	@ss = Shop_Schema();
    @cs = Comment_Schema();

  validate_category: (category) ->
    return true if category in ShopCategory 
    return false

  validate_username: (name) ->
    @cs.get_user_by_name name, "username", (doc) ->
      return true if not doc?
      return false

  validate_comment: (comment) ->
    return true if comment.shopid? and comment.comment?
    return false

  validate_shop: (shop) ->	
    return true if shop.shopname? and shop.shoptype? and shop.shoplogo?
    return false
  
  validate_field: (table, field, value) ->
    switch table
      when "shop"
        switch field
          when "shopname"
            @ss.get_shop_by_name value, "shopname", (doc) ->
              if doc?
                return {validation:"failed", "description":"This name is already exist"}
              else
                return {validation:"success", "description":"Cong! This name is valid"}
          when "shoptype"
              if not (@validate_category value)
                return {validation:"failed", "description":"It is invalid shop type"}
              else
                return {validation:"success", "description":"Cong! This type is valid"}
          when "shoplogo", "shopcover"
              if not value?
                return {validation:"failed", "description":"It must not be empty"}
              else
                return {validation:"success", "description":"Cong! It is ok"}
          else
            return {validation:"failed", "description":"We can not verify this Field"}
      when "user"
        switch field
          when "username", 
            if not @validate_username value
              return {validation:"failed", "description":"This name is already exist"}
            else
              return {validation:"success", "description":"Cong! This name is valid"}
          else
            return {validation:"failed", "description":"We can not verify this Field"}
      else 
        return {validation:"failed", "description":"We can not verify this Table"}




 module.exports = Controller_Assisstant