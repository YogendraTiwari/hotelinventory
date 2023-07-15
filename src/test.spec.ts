import { Calculator } from './testservice';

describe('testservice',()=> {
    it('should add 2  number ',()=>{
        const cal = new Calculator()
        expect(cal.add(2,2)).toBe(4);
    })
})