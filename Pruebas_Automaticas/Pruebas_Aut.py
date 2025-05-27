import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC    
from selenium.webdriver.support.ui import WebDriverWait
import time
import pyautogui


ruta_descargas = r"C:/Users/Santiago/Desktop/UCompensar/Pruebas de Software/Screenshots"

# Crear la carpeta si no existe
if not os.path.exists(ruta_descargas):
    os.makedirs(ruta_descargas)

def tomar_captura(driver, nombre_paso):
    ruta_captura = os.path.join(ruta_descargas, f"{nombre_paso}.png")
    driver.save_screenshot(ruta_captura)
    print(f"Captura Guardada en: {ruta_captura}")


options = webdriver.ChromeOptions()

# Modo headless (nuevo) + tamaño de ventana
#options.add_argument("--headless")  

options.add_argument("--window-size=1370,768") 
driver = webdriver.Chrome(options=options)


try :
    driver.get("https://pruebasfrontend.netlify.app")
    driver.find_element(By.ID, "ingresar").click()
# ingreso al login
    driver.find_element(By.ID, "usuario").send_keys("pruebas")
    driver.find_element(By.ID, "contraseña").send_keys("12345")
    driver.find_element(By.ID, "Aceptar").click()
#tomar captura del login
    time.sleep(5)
    tomar_captura(driver, "Ingreso desde login" )
    time.sleep(5)

#nuevo cuestionario
    driver.find_element(By.ID,"NuevoC").click()
    time.sleep(2)
    pyautogui.click(x=578, y=311)
    pyautogui.click(x=1076, y=377)
    pyautogui.click(x=597, y=399)
    pyautogui.click(x=1076, y=377)
    time.sleep(2)
    tomar_captura(driver, "requerido")
    time.sleep(3)
    driver.find_element(By.ID,"Icuestionario").send_keys("Deportes")
    time.sleep(2)
    driver.find_element(By.ID,"Dcuestionario").send_keys("Vamos a ver que tanto sabes de deportes.")
    time.sleep(2)
    driver.find_element(By.ID,"Siguiente").click()
#validaciones   
    driver.find_element(By.ID,"agregarRespuesta").click()
    driver.find_element(By.ID,"agregarRespuesta").click()
    driver.find_element(By.ID,"pregunta").send_keys("Último cámpeon del mundo")
    driver.find_element(By.ID,"respuesta").send_keys("Argentina")
    driver.find_element(By.XPATH, "//input[@placeholder='Respuesta 2']").send_keys("España")
    driver.find_element(By.XPATH, "//input[@placeholder='Respuesta 3']").send_keys("Brazil")
    driver.find_element(By.XPATH, "//input[@placeholder='Respuesta 4']").send_keys("Alemania")
    driver.find_element(By.ID,"select").click()
    time.sleep(2)
    driver.find_element(By.ID,"agregar").click()
    time.sleep(2)
    driver.find_element(By.ID,"Mostar").click()
    time.sleep(1)
    tomar_captura(driver, "creacion de preguntas")

    time.sleep(1)
    pyautogui.click(x=1223, y=437)
    tomar_captura(driver,"minimo 2 respuestas")
    time.sleep(5)

    #finalizar cuestionario
    driver.find_element(By.ID,"finalizar").click()
    tomar_captura(driver,"Finalizado")
    time.sleep(5)

    #Cambiar password
    driver.find_element(By.ID,"cambiar").click()
    time.sleep(2)
    pyautogui.click(x=680, y=292)
    pyautogui.click(x=1074, y=321)
    pyautogui.click(x=690, y=348)
    pyautogui.click(x=1074, y=321)
    time.sleep(2)

    driver.find_element(By.ID,"anterior").send_keys("dalmata")
    driver.find_element(By.ID,"nueva").send_keys("cachorro")
    time.sleep(3)
    driver.find_element(By.ID,"Confirmar").send_keys("cachorro")

    driver.find_element(By.ID,"Aceptar").click()
    tomar_captura(driver, "Cambio contraseña")
    time.sleep(2)

    driver.find_element(By.ID,"volver").click()
    time.sleep(2)

    driver.find_element(By.ID,"logOut").click()
    

finally:
    input("presione enter para salir: ")
    driver.quit()
