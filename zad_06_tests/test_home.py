from selenium.webdriver.common.by import By


def test_home_title(browser):
    assert "Sklep" in browser.title


def test_nav_content(browser):
    nav = browser.find_elements(By.XPATH, "//nav//li")
    assert "Laptopy" in nav[0].text
    assert "Smartfony" in nav[1].text
    assert "Słuchawki" in nav[2].text


def test_footer_content(browser):
    footer = browser.find_elements(By.XPATH, "//*[contains(@class,'footer-links')]//li")
    assert "O nas" in footer[0].text
    assert "Sklepy" in footer[1].text
    assert "Praca" in footer[2].text


def test_nav_links(browser):
    nav = browser.find_elements(By.XPATH, "//nav//li//a")
    assert "/laptopy" in nav[0].get_attribute("href")
    assert "/smartfony" in nav[1].get_attribute("href")
    assert "/sluchawki" in nav[2].get_attribute("href")


def test_empty_cart(browser):
    cart_link = browser.find_element(By.XPATH, "//*[contains(@class,'nav-cart')]//a")
    cart_count = browser.find_element(By.XPATH, "//*[contains(@class,'nav-cart')]")
    assert "/koszyk" in cart_link.get_attribute("href")
    assert "0" in cart_count.text
