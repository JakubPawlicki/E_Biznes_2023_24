from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_check_product_details_in_laptops(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Laptopy')]").click()
    products = browser.find_element(By.CLASS_NAME, "product")
    product_name = products.find_element(By.TAG_NAME, 'p').text
    product_price = products.find_element(By.CLASS_NAME, 'product-price').text
    browser.find_element(By.CLASS_NAME, "product").click()
    WebDriverWait(browser, 10).until(
        EC.text_to_be_present_in_element((By.CLASS_NAME, "product-details-right"), product_name))
    product_name_in_details = browser.find_element(By.XPATH, "//*[contains(@class,'product-details-right')]//p").text
    product_price_in_details = browser.find_element(By.CLASS_NAME, "product-details-price").text
    add_to_cart_btn = browser.find_elements(By.XPATH, "//*[contains(text(),'Dodaj do koszyka')]")
    assert product_name == product_name_in_details
    assert product_price == product_price_in_details
    assert len(add_to_cart_btn) == 1


def test_check_product_details_in_smartphones(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Smartfony')]").click()
    products = browser.find_element(By.CLASS_NAME, "product")
    product_name = products.find_element(By.TAG_NAME, 'p').text
    product_price = products.find_element(By.CLASS_NAME, 'product-price').text
    browser.find_element(By.CLASS_NAME, "product").click()
    WebDriverWait(browser, 10).until(
        EC.text_to_be_present_in_element((By.CLASS_NAME, "product-details-right"), product_name))
    product_name_in_details = browser.find_element(By.XPATH, "//*[contains(@class,'product-details-right')]//p").text
    product_price_in_details = browser.find_element(By.CLASS_NAME, "product-details-price").text
    add_to_cart_btn = browser.find_elements(By.XPATH, "//*[contains(text(),'Dodaj do koszyka')]")
    assert product_name == product_name_in_details
    assert product_price == product_price_in_details
    assert len(add_to_cart_btn) == 1


def test_check_product_details_in_headphones(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Słuchawki')]").click()
    products = browser.find_element(By.CLASS_NAME, "product")
    product_name = products.find_element(By.TAG_NAME, 'p').text
    product_price = products.find_element(By.CLASS_NAME, 'product-price').text
    browser.find_element(By.CLASS_NAME, "product").click()
    WebDriverWait(browser, 10).until(
        EC.text_to_be_present_in_element((By.CLASS_NAME, "product-details-right"), product_name))
    product_name_in_details = browser.find_element(By.XPATH, "//*[contains(@class,'product-details-right')]//p").text
    product_price_in_details = browser.find_element(By.CLASS_NAME, "product-details-price").text
    add_to_cart_btn = browser.find_elements(By.XPATH, "//*[contains(text(),'Dodaj do koszyka')]")
    assert product_name == product_name_in_details
    assert product_price == product_price_in_details
    assert len(add_to_cart_btn) == 1
