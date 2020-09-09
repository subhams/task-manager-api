const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math')



test('Should calculate tip with total',() => {
    const total = calculateTip(10,30)
    expect(total).toEqual(13)

//     if(total !== 13){
//         throw new Error('Total Tip should be 13. Got '+ total)
//     }
})

test('should calculate total with default tip',()=>{
    const total = calculateTip(100)
    expect(total).toEqual(125)
})

test('should convert 0 degree Celsius to 0 degree Fahrenheit',()=>{
    const fahrenheitTemp = celsiusToFahrenheit(0)
    expect(fahrenheitTemp).toEqual(32)
})

test('should convert 32 degrees Fahrenheit to 0 degree Celsius',()=>{
    const celsiusTemp = fahrenheitToCelsius(32)
    expect(celsiusTemp).toEqual(0)
})



// test('Async test demo', (done)=> {
//     setTimeout(()=> {
//         expect(1).toBe(2)
//         done()
//     }, 2000) 
// })

test('Should add two numbers',(done)=> {
    add(2,3).then((sum)=> {
        expect(sum).toBe(5)
        done()  
    })
})

test('Should add two numbers async/await',async ()=> {
    const sum = await add(24,34)
        expect(sum).toBe(58)
})