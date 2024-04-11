package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

type CartController struct {
	db *gorm.DB
}

func (cc CartController) getCart(c echo.Context) error {
	var cart Cart
	cc.db.Scopes(CartByID(c.Param("id"))).First(&cart)
	cc.db.Model(&cart).Preload("Products").Find(&cart)
	return c.JSON(http.StatusOK, cart)
}

func (cc CartController) getCarts(c echo.Context) error {
	var carts []Cart
	cc.db.Find(&carts).Preload("Products").Find(&carts)
	return c.JSON(http.StatusOK, carts)
}

func (cc CartController) addCart(c echo.Context) error {
	var cart Cart
	if err := c.Bind(&cart); err != nil {
		return err
	}
	cc.db.Create(&cart)
	return c.JSON(http.StatusOK, cart)
}

func (cc CartController) deleteCart(c echo.Context) error {
	var cart Cart
	cc.db.Scopes(CartByID(c.Param("id"))).First(&cart)
	cc.db.Delete(&cart)
	return c.JSON(http.StatusOK, cart)
}

func (cc CartController) addProductToCart(c echo.Context) error {
	var cart Cart
	var product Product
	if err := c.Bind(&cart); err != nil {
		return err
	}
	cc.db.Scopes(CartByID(c.Param("cartId"))).First(&cart)
	cc.db.Scopes(ProductByID(c.Param("productId"))).First(&product)
	if err := cc.db.Model(&cart).Association("Products").Append(&product); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, cart)
}

func (cc CartController) deleteProductFromCart(c echo.Context) error {
	var cart Cart
	var product Product
	cc.db.Scopes(CartByID(c.Param("cartId"))).First(&cart)
	cc.db.Scopes(ProductByID(c.Param("productId"))).First(&product)
	if err := cc.db.Model(&cart).Association("Products").Delete(&product); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, cart)
}

func CartByID(id string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("id = ?", id)
	}
}
