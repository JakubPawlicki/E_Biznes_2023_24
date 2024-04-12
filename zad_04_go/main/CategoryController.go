package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

type CategoryController struct {
	db *gorm.DB
}

func (cc CategoryController) GetAllCategories(c echo.Context) error {
	var categories []Category
	cc.db.Find(&categories)
	return c.JSON(http.StatusOK, categories)
}

func (cc CategoryController) GetCategory(c echo.Context) error {
	var category Category
	cc.db.Scopes(CategoryByID(c.Param("id"))).First(&category)
	cc.db.Model(&category).Preload("Products").Find(&category)
	return c.JSON(http.StatusOK, category)
}

func (cc CategoryController) CreateCategory(c echo.Context) error {
	var category Category
	if err := c.Bind(&category); err != nil {
		return err
	}
	cc.db.Create(&category)
	return c.JSON(http.StatusCreated, category)
}

func (cc CategoryController) UpdateCategory(c echo.Context) error {
	var category Category
	cc.db.Scopes(CategoryByID(c.Param("id"))).First(&category)
	if err := c.Bind(&category); err != nil {
		return err
	}
	cc.db.Save(&category)
	return c.JSON(http.StatusOK, category)
}

func (cc CategoryController) DeleteCategory(c echo.Context) error {
	var category Category
	cc.db.Scopes(CategoryByID(c.Param("id"))).First(&category)
	cc.db.Delete(&category)
	return c.JSON(http.StatusOK, category)
}

func (cc CategoryController) AddProductToCategory(c echo.Context) error {
	var category Category
	var product Product
	if err := c.Bind(&category); err != nil {
		return err
	}
	cc.db.Scopes(CategoryByID(c.Param("categoryId"))).First(&category)
	cc.db.Scopes(ProductByID(c.Param("productId"))).First(&product)
	if err := cc.db.Model(&category).Association("Products").Append(&product); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, category)
}

func (cc CategoryController) RemoveProductFromCategory(c echo.Context) error {
	var category Category
	var product Product
	cc.db.Scopes(ProductByID(c.Param("productId"))).First(&product)
	cc.db.Scopes(CategoryByID(c.Param("categoryId"))).First(&category)
	if err := cc.db.Model(&category).Association("Products").Delete(&category); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, category)
}

// Scope
func CategoryByID(id string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("id = ?", id)
	}
}

