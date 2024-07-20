from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_add_and_remove_laptop_to_cart(browser):
    
    browser.find_element(By.XPATH, "//*[contains(text(),'Laptopy')]").click()
    browser.find_element(By.CLASS_NAME, "product").click()
    product_name = browser.find_element(By.XPATH, "//*[contains(@class,'product-details-right')]//p").text
    product_price = browser.find_element(By.CLASS_NAME, "product-details-price").text
    browser.find_element(By.XPATH, "//*[contains(text(),'Dodaj do koszyka')]").click()
    cart = browser.find_element(By.XPATH, "//*[contains(@class,'nav-cart')]")
    assert "1" in cart.text
    cart.click()
    WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Całkowita kwota to zapłaty:')]")))
    product_name_in_cart = browser.find_element(By.CLASS_NAME, "cart-item-name").text
    product_price_in_cart = browser.find_element(By.CLASS_NAME, "cart-item-price").text.split(' ')[0]
    product_quantity = browser.find_element(By.XPATH, "//*[contains(@class,cart-item-quantity)]//input").get_attribute(
        "value")
    assert product_name_in_cart == product_name
    assert product_price_in_cart == product_price
    assert product_quantity == '1'
    browser.find_element(By.CLASS_NAME, "cart-item-remove").click()
    assert "0" in cart.text


def test_add_and_remove_smartphone_to_cart(browser):
    
    browser.find_element(By.XPATH, "//*[contains(text(),'Smartfony')]").click()
    browser.find_element(By.CLASS_NAME, "product").click()
    product_name = browser.find_element(By.XPATH, "//*[contains(@class,'product-details-right')]//p").text
    product_price = browser.find_element(By.CLASS_NAME, "product-details-price").text
    browser.find_element(By.XPATH, "//*[contains(text(),'Dodaj do koszyka')]").click()
    cart = browser.find_element(By.XPATH, "//*[contains(@class,'nav-cart')]")
    assert "1" in cart.text
    cart.click()
    WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Całkowita kwota to zapłaty:')]")))
    product_name_in_cart = browser.find_element(By.CLASS_NAME, "cart-item-name").text
    product_price_in_cart = browser.find_element(By.CLASS_NAME, "cart-item-price").text.split(' ')[0]
    product_quantity = browser.find_element(By.XPATH, "//*[contains(@class,cart-item-quantity)]//input").get_attribute(
        "value")
    assert product_name_in_cart == product_name
    assert product_price_in_cart == product_price
    assert product_quantity == '1'
    browser.find_element(By.CLASS_NAME, "cart-item-remove").click()
    assert "0" in cart.text


def test_add_and_remove_headphones_to_cart(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Słuchawki')]").click()
    browser.find_element(By.CLASS_NAME, "product").click()
    product_name = browser.find_element(By.XPATH, "//*[contains(@class,'product-details-right')]//p").text
    product_price = browser.find_element(By.CLASS_NAME, "product-details-price").text
    browser.find_element(By.XPATH, "//*[contains(text(),'Dodaj do koszyka')]").click()
    cart = browser.find_element(By.XPATH, "//*[contains(@class,'nav-cart')]")
    assert "1" in cart.text
    cart.click()
    WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Całkowita kwota to zapłaty:')]")))
    product_name_in_cart = browser.find_element(By.CLASS_NAME, "cart-item-name").text
    product_price_in_cart = browser.find_element(By.CLASS_NAME, "cart-item-price").text.split(' ')[0]
    product_quantity = browser.find_element(By.XPATH, "//*[contains(@class,cart-item-quantity)]//input").get_attribute(
        "value")
    assert product_name_in_cart == product_name
    assert product_price_in_cart == product_price
    assert product_quantity == '1'
    browser.find_element(By.CLASS_NAME, "cart-item-remove").click()
    assert "0" in cart.text


def test_buy_product(browser):
    
    browser.find_element(By.XPATH, "//*[contains(text(),'Laptopy')]").click()
    browser.find_element(By.CLASS_NAME, "product").click()
    browser.find_element(By.XPATH, "//*[contains(text(),'Dodaj do koszyka')]").click()
    cart = browser.find_element(By.XPATH, "//*[contains(@class,'nav-cart')]")
    cart.click()
    WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Całkowita kwota to zapłaty:')]")))
    browser.find_element(By.CLASS_NAME, "buy-btn").click()
    assert "/procesowanie" in browser.current_url
    header = browser.find_element(By.TAG_NAME, "h1")
    assert "Dziękujemy za dokonanie zakupów w naszym sklepie!" in header.text
    assert "0" in cart.text
    assert "/dziekujemy" in browser.current_url
