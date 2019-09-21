import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser('')

WebUI.navigateToUrl('http://192.241.158.156/#/')

WebUI.click(findTestObject('Page_front/form_carrera'))

WebUI.setText(findTestObject('Page_front/input_Nombre completo_input-1'), 'Pedro Perez')

WebUI.setText(findTestObject('Page_front/input_RUT_input-2'), '12.231.123-2')

WebUI.setText(findTestObject('Page_front/input_Fecha de nacimiento_input-3'), '12/02/1990')

WebUI.selectOptionByValue(findTestObject('Object Repository/Page_front/select_carrera'), 'Ingenieria Civil en Obras Civiles', 
    true)

WebUI.click(findTestObject('Object Repository/Page_front/button_Registrar'))

WebUI.closeBrowser()

