
// Includes
const { Builder , By, Key, until} = require ('selenium-webdriver');
const should = require('chai').should();

/*  As a customer,
I want to be able to search for a product of particular color,
so that i can find the product that matches my preferences or needs.
*/

//Test grouping:search
describe.only('Search for a product of particular color', () => {
    //Test case:
    context('Given a user is on the search page',() => {
        it('should show the shirt of preferred color'), async() => {
            //start the webbrowser
            const driver = await new Builder().forBrowser('firefox').build();

            //Search for a product
           try{
            //Move to magento site
            await driver.get('https://magento.softwaretestingboard.com/');
            //Get the search input
            await driver.wait(until.elementLocated(By.css('#search')),50000);
            await driver.findElement(By.id('search')).sendKeys('shirt for men', Key.RETURN);
           
          
          

            //Find the first product
             await driver.wait(until.elementsLocated(By.css('.item.product.product-item:nth-child(3)'))),10000;
            const product= await driver.findElement(By.css('.item.product.product-item:nth-child(3)'));
            
           

            //find the information in the product we selected
             let productTitle = await product.findElement(By.css('.product-item-link'));
             let productPrice = await product.findElement(By.css('.price'))
             let productColor = await product.findElement(By.class('.swatch-option color'));
            

            // Extra text
            let productTitleText = await productTitle.getText();
            let productPriceText = await productPrice.getText();
            let productColorText = await productColor.getText();

            productTitleText.should.equal('Balboa Persistence Tee');
            productPriceText.should.equal('$29.00');
            productColorText.should.equal('green');

        
            console.log(productTitleText, productPriceText, productColorText);
          
            await driver.quit();
           } 
           finally {
           await driver.quit();
           }

        };
    });
});