

class Controller_Assisstant
  constructor: ()->
  	
  validate_category: (category) ->
    return true if category in ShopCategory 
    return false

  validate_comment: (comment) ->
    return true if comment.shopid? and comment.comment?
    return false

  validate_shop: (shop) ->	
    return true if shop.shopname? and shop.shoptype? and shop.shoplogo?
    return false



 module.exports = Controller_Assisstant