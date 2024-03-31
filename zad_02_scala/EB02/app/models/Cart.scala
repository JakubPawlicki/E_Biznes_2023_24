package models

import play.api.libs.json.{Json, Reads, Writes}

case class Cart(id: Int, products: Option[List[Product]])

object Cart {
  implicit val cartWrites: Writes[Cart] = (cart: Cart) => {
    Json.obj(
      "id" -> cart.id,
      "products" -> cart.products
    )
  }
  implicit val cartReads: Reads[Cart] = Json.reads[Cart]
}
