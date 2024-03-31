package controllers

import models.Product
import play.api.libs.json.Format.GenericFormat
import play.api.libs.json.{JsError, JsValue, Json}
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}

import javax.inject.Inject
import scala.collection.mutable.ListBuffer

class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  private val products = ListBuffer(
    Product(1, "Product 1", 10, None),
    Product(2, "Product 2", 20, None),
    Product(3, "Product 3", 30, None)
  )

  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(products))
  }

  def getById(productId: Int): Action[AnyContent] = Action {
    products.find(p => p.id == productId) match {
      case Some(product) =>
        Ok(Json.toJson(product))
      case None =>
        NotFound("Product not found")
    }
  }

  def updateProduct(id: Int): Action[JsValue] = Action(parse.json) { request =>
    val productResult = request.body.validate[Product]
    productResult.fold(
      errors => BadRequest(Json.obj("message" -> JsError.toJson(errors))),
      updatedProduct => {
        products.indexWhere(_.id == id) match {
          case -1 => NotFound("Product not found")
          case index =>
            products.update(index, updatedProduct)
            Ok(Json.toJson(updatedProduct))
        }
      }
    )
  }

  def deleteProduct(productId: Int): Action[AnyContent] = Action {
    products.indexWhere(p => p.id == productId) match {
      case -1 => NotFound("Product with given id not found")
      case index => products.remove(index)
        Ok("Product deleted")
    }
  }

  def addProduct: Action[JsValue] = Action(parse.json) { implicit request =>
    val product = request.body.validate[Product]
    product.fold(
      errors => BadRequest(Json.obj("message" -> JsError.toJson(errors))),
      addedProduct => {
        products += addedProduct
        Created("Product added")
      }
    )
  }
}
