package models

import play.api.libs.json.{Json, Reads, Writes}

case class Product(id: Int, name: String, price: Double, category: Option[Category])

object Product {
  implicit val productWrites: Writes[Product] = (product: Product) => {
    Json.obj(
      "id" -> product.id,
      "name" -> product.name,
      "price" -> product.price,
      "category" -> product.category
    )
  }
  implicit val productReads: Reads[Product] = Json.reads[Product]
}
