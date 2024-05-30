package main

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	Products []*Product `gorm:"many2many:cart_products;"`
}
