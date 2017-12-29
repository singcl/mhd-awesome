describe("main.js", function() {

    it("reverse", function() {
        // Assert (verify the result)
        expect(reverse('abcd')).toEqual('dcba');
        expect(reverse('asdf')).toEqual('fdsa');
    });

    it("isInteger", function() {
        expect(true).toEqual(isInteger(20));
        expect(false).toEqual(isInteger("20"));
        expect(false).toEqual(isInteger(0));
    })

});
