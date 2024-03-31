package models

import play.api.libs.json.{Json, Reads, Writes}

case class Category(id: Int, name: String, products: Option[List[Product]])

object Category {
  implicit val categoryWrites: Writes[Category] = (category: Category) => {
    Json.obj("id" -> category.id,
      "name" -> category.name,
      "products" -> category.products
    )
  }

  implicit val categoryReads: Reads[Category] = Json.reads[Category]

}

