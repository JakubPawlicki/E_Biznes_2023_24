package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

type ProductController struct {
	db *gorm.DB
}

func (pc ProductController) getProductById(c echo.Context) error {
	var product Product
	pc.db.Scopes(ProductByID(c.Param("id"))).First(&product)
	return c.JSON(http.StatusOK, product)
}

func (pc ProductController) getProducts(c echo.Context) error {
	var products []Product
	min, max := c.QueryParam("min"), c.QueryParam("max")
	if min == "" || max == "" {
		pc.db.Find(&products)
	} else {
		pc.db.Scopes(ProductsWithinRange(min, max)).Find(&products)
	}
	return c.JSON(http.StatusOK, products)
}

func (pc ProductController) addProduct(c echo.Context) error {
	var product Product
	if err := c.Bind(&product); err != nil {
		return err
	}
	pc.db.Create(&product)
	return c.JSON(http.StatusOK, product)
}

func (pc ProductController) updateProduct(c echo.Context) error {
	var product Product
	pc.db.Scopes(ProductByID(c.Param("id"))).First(&product)
	if err := c.Bind(&product); err != nil {
		return err
	}
	pc.db.Save(&product)
	return c.JSON(http.StatusOK, product)
}

func (pc ProductController) deleteProduct(c echo.Context) error {
	var product Product
	pc.db.Scopes(ProductByID(c.Param("id"))).First(&product)
	pc.db.Delete(&product)
	return c.JSON(http.StatusOK, product)
}

func (pc ProductController) GetProductsWithinRange(c echo.Context) error {
	var products []Product
	pc.db.Scopes(ProductsWithinRange(c.QueryParam("min"), c.QueryParam("max"))).Find(&products)
	return c.JSON(http.StatusOK, products)
}

func ProductByID(id string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("id = ?", id)
	}
}

func ProductsWithinRange(min string, max string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price > ? and price < ?", min, max)
	}
}
