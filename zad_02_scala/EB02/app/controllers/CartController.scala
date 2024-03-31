package controllers

import models.Cart
import play.api.libs.json.{JsError, JsValue, Json}
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}

import javax.inject.Inject
import scala.collection.mutable.ListBuffer

class CartController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  private val carts = ListBuffer(Cart(1, None))

  def getAllCarts: Action[AnyContent] = Action {
    Ok(Json.toJson(carts))
  }

  def getCartById(cartId: Int): Action[AnyContent] = Action {
    carts.find(_.id == cartId) match {
      case Some(cart) =>
        Ok(Json.toJson(cart))
      case None =>
        NotFound("Cart not found")
    }
  }

  def updateCart(cartId: Int): Action[JsValue] = Action(parse.json) { implicit request =>
    val category = request.body.validate[Cart]
    category.fold(
      errors => BadRequest(Json.obj("message" -> JsError.toJson(errors))),
      updatedCart => {
        carts.indexWhere(_.id == cartId) match {
          case -1 => NotFound("Cart not found")
          case index =>
            carts.update(index, updatedCart)
            Ok(Json.toJson(updatedCart))
        }
      }
    )
  }

  def deleteCart(cartId: Int): Action[AnyContent] = Action {
    carts.indexWhere(_.id == cartId) match {
      case -1 => NotFound("Cart not found")
      case index =>
        carts.remove(index)
        Ok("Cart deleted")
    }
  }

  def addCart(): Action[JsValue] = Action(parse.json) { implicit request =>
    val cart = request.body.validate[Cart]
    cart.fold(
      errors => BadRequest(Json.obj("message" -> JsError.toJson(errors))),
      addedCart => {
        carts += addedCart
        Ok("Cart added")
      }
    )
  }
}



