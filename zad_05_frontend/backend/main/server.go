package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"net/http"
)

func connectToDB() *gorm.DB {
	db, _ := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err := db.AutoMigrate(&Product{}); err != nil {
		panic("Error")
	}
	if err := db.AutoMigrate(&Cart{}); err != nil {
		panic("Error")
	}
	if err := db.AutoMigrate(&Category{}); err != nil {
		panic("Error")
	}
	return db
}

func main() {
	db := connectToDB()
	pc := ProductController{db: db}
	cc := CartController{db: db}
	catcontroller := CategoryController{db: db}
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	//Products routing
	e.GET("/products", pc.getProducts)
	e.GET("/products/:id", pc.getProductById)
	e.POST("/products", pc.addProduct)
	e.PUT("/products/:id", pc.updateProduct)
	e.DELETE("products/:id", pc.deleteProduct)
	//Cart routing
	e.GET("/carts", cc.getCarts)
	e.GET("/carts/:id", cc.getCart)
	e.POST("/carts", cc.addCart)
	e.DELETE("/carts/:id", cc.deleteCart)
	e.POST("/carts/:cartId/:productId", cc.addProductToCart)
	e.DELETE("/carts/:cartId/:productId", cc.deleteProductFromCart)
	//Category routing
	e.GET("/categories", catcontroller.GetAllCategories)
	e.GET("/categories/:id", catcontroller.GetCategory)
	e.POST("/categories", catcontroller.CreateCategory)
	e.PUT("/categories/:id", catcontroller.UpdateCategory)
	e.DELETE("/categories/:id", catcontroller.DeleteCategory)
	e.POST("/categories/:categoryId/:productId", catcontroller.AddProductToCategory)
	e.DELETE("/categories/:categoryId/:productId", catcontroller.RemoveProductFromCategory)

	e.Logger.Fatal(e.Start(":9000"))
}
