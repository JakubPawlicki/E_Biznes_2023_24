from selenium.webdriver.common.by import By


def test_go_to_laptops_section(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Laptopy')]").click()
    chosen_nav_el = browser.find_element(By.CLASS_NAME, "chosen").text
    assert "Laptopy" in chosen_nav_el


def test_go_to_smartphones_section(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Smartfony')]").click()
    chosen_nav_el = browser.find_element(By.CLASS_NAME, "chosen").text
    assert "Smartfony" in chosen_nav_el


def test_go_to_headphones_section(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Słuchawki')]").click()
    chosen_nav_el = browser.find_element(By.CLASS_NAME, "chosen").text
    assert "Słuchawki" in chosen_nav_el


def test_laptops_content(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Laptopy')]").click()
    products = browser.find_elements(By.CLASS_NAME, "product")
    assert len(products) > 0
    nav = browser.find_elements(By.XPATH, "//nav//li")
    assert "Laptopy" in nav[0].text
    assert "Smartfony" in nav[1].text
    assert "Słuchawki" in nav[2].text


def test_smartphones_content(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Smartfony')]").click()
    products = browser.find_elements(By.CLASS_NAME, "product")
    assert len(products) > 0
    nav = browser.find_elements(By.XPATH, "//nav//li")
    assert "Laptopy" in nav[0].text
    assert "Smartfony" in nav[1].text
    assert "Słuchawki" in nav[2].text


def test_headphones_content(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Słuchawki')]").click()
    products = browser.find_elements(By.CLASS_NAME, "product")
    assert len(products) > 0
    nav = browser.find_elements(By.XPATH, "//nav//li")
    assert "Laptopy" in nav[0].text
    assert "Smartfony" in nav[1].text
    assert "Słuchawki" in nav[2].text


def test_product_tiles_in_laptops(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Laptopy')]").click()
    products = browser.find_elements(By.CLASS_NAME, "product")
    for product in products:
        product_name = product.find_element(By.TAG_NAME, 'p').text
        assert len(product_name) > 0
        product_price = product.find_element(By.CLASS_NAME, 'product-price').text
        assert len(product_price) > 0


def test_product_tiles_in_smartphones(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Smartfony')]").click()
    products = browser.find_elements(By.CLASS_NAME, "product")
    for product in products:
        product_name = product.find_element(By.TAG_NAME, 'p').text
        assert len(product_name) > 0
        product_price = product.find_element(By.CLASS_NAME, 'product-price').text
        assert len(product_price) > 0


def test_product_tiles_in_headphones(browser):
    browser.find_element(By.XPATH, "//*[contains(text(),'Słuchawki')]").click()
    products = browser.find_elements(By.CLASS_NAME, "product")
    for product in products:
        product_name = product.find_element(By.TAG_NAME, 'p').text
        assert len(product_name) > 0
        product_price = product.find_element(By.CLASS_NAME, 'product-price').text
        assert len(product_price) > 0
