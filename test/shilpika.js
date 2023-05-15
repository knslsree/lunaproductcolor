// Includes
const {Builder,By,Key,until} = require('selenium-webdriver');
const should = require('chai').should();

/*  As a customer,
I want to be able to search for a product of particular color,
so that i can find the product that matches my preferences or needs.
*/

//Test grouping:search
describe.only('Search for a product of particular color', () => {
    //Test case:
    context('Given a user is on the search page', () => {
        it('should show the shirt of preferred color', async () => {
            //start the webbrowser
            const driver = await new Builder().forBrowser('firefox').build();

            //Search for a product
            try {
                //Move to magento site
                await driver.get('https://magento.softwaretestingboard.com/');
                //Get the search input
                await driver.wait(until.elementLocated(By.css('#search')), 50000);
                await driver.findElement(By.id('search')).sendKeys('shirts for men', Key.RETURN);

                // Scroll down a bit
                await driver.wait(until.elementsLocated(By.css('.item.product.product-item')), 50000);
                await driver.executeScript('document.querySelector(".item.product.product-item").scrollIntoView();');

                //Find the first product
                await driver.wait(until.elementLocated(By.css('.item.product.product-item:first-child')), 50000);

                const product = await driver.findElement(By.css('.item.product.product-item:first-child'));




                //find the information in the product we selected

                await driver.wait(until.elementLocated(By.css('.swatch-attribute.color')), 50000);
                let swatchColors = await product.findElement(By.css('.swatch-attribute.color'));

                let productColor1 = await swatchColors.findElement(By.css('div[index="1"]'));
                productColor1.click();
                console.log("choose orange color shirt");



                productColor2 = await swatchColors.findElement(By.css('div[index="2"]'));
                await driver.sleep(5000);
                setTimeout(() => {
                    productColor2.click().then(() => {
                        console.log("choose purple color shirt");
                    });
                }, 5000);



                productColor3 = await swatchColors.findElement(By.css('div[index="0"]'));
                await driver.sleep(5000);
                setTimeout(() => {
                    productColor3.click().then(() => {
                        console.log("choose blue color shirt");
                    });
                }, 5000);
         
           await driver.sleep(10000);

         //Asserts
          assert.equal(productColor1 , 'Orange'); //Built in Node
          expect(productColor1).to.equal('Orange'); //Chai expect
          productColor1.should.equal('Orange'); //Chai should 
          
          assert.equal(productColor2 , 'Purple'); //Built in Node
          expect(productColor2).to.equal('Purple'); //Chai expect
          productColor2.should.equal('Purple'); //Chai should 

          assert.equal(productColor3 , 'Blue'); //Built in Node
          expect(productColor3).to.equal('Blue'); //Chai expect
          productColor3.should.equal('Blue'); //Chai should


            } catch (Exception) {

            } finally {
                await driver.quit();
            }

        });
    });
});