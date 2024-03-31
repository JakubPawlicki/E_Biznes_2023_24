package controllers

import models.Category
import play.api.libs.json.{JsError, JsValue, Json}
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}

import javax.inject.Inject
import scala.collection.mutable.ListBuffer

class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  private val categories = ListBuffer(Category(1, "Category 1", None))

  def getAllCategories: Action[AnyContent] = Action {
    Ok(Json.toJson(categories))
  }

  def getCategoryById(categoryId: Int): Action[AnyContent] = Action {
    categories.find(c => c.id == categoryId) match {
      case Some(category) =>
        Ok(Json.toJson(category))
      case None =>
        NotFound("Category not found")
    }
  }

  def updateCategory(categoryId: Int): Action[JsValue] = Action(parse.json) { implicit request =>
    val category = request.body.validate[Category]
    category.fold(
      errors => BadRequest(Json.obj("message" -> JsError.toJson(errors))),
      updatedCategory => {
        categories.indexWhere(_.id == categoryId) match {
          case -1 => NotFound("Category not found")
          case index => categories.update(index, updatedCategory)
            Ok(Json.toJson(updatedCategory))
        }
      })
  }

  def deleteCategory(categoryId: Int): Action[AnyContent] = Action {
    categories.indexWhere(c => c.id == categoryId) match {
      case -1 => NotFound("Category not found")
      case index => categories.remove(index)
        Ok("Category deleted")
    }
  }

  def addCategory: Action[JsValue] = Action(parse.json) { implicit request =>
    val category = request.body.validate[Category]
    category.fold(
      errors => BadRequest(Json.toJson("message" -> JsError.toJson(errors))),
      addedCategory => {
        categories += addedCategory
        Ok("Category added")
      }
    )
  }

}
