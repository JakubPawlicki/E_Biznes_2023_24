package main

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name       string
	Price      float64
	CategoryID uint
}