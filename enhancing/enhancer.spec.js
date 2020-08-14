const enhancer = require('./enhancer.js');
// test away!
describe("Enhancer Tests", () => {
    test("test a successful item enhancement", () => {
        const item = {
            name: "Sword",
            durability: 100,
            enhancement: 0
        }

        enhancer.success(item);

        expect(item.enhancement).toBe(1);
    });

    test("test a failed item enhancement", () => {
        const item = {
            name: "Sword",
            durability: 100,
            enhancement: 4
        }
        
        enhancer.fail(item);

        // enhancement < 15, durability - 5, enhancement does not decrease
        expect(item.durability).toBe(95);
        expect(item.enhancement).toBe(4);

        // enhancement >= 15 but equal to 16, durability - 10, enhancement does not decrease
        item.enhancement = 16; 

        enhancer.fail(item);

        expect(item.durability).toBe(85);
        expect(item.enhancement).toBe(16);

        // enhancement >= 15 but equal to 16, durability - 10, enhancement does not decrease
        item.enhancement = 18; 
        enhancer.fail(item);

        expect(item.durability).toBe(75);
        expect(item.enhancement).toBe(17);
    });

    test("Gets name of item including a '+' modifier if enhancement > 0", () => {
        const item = {
            name: "Sword",
            durability: 100,
            enhancement: 4
        }

        enhancer.get(item);

        expect(item.name).toBe("[+4] Sword");

        item.name = "Sword";
        item.enhancement = 0;        
        enhancer.get(item);

        expect(item.name).toBe("Sword");
    });

    test("test repairing an item", () => {
        let item = {
            name: "Sword",
            durability: 50,
            enhancement: 0
        }
        item = enhancer.repair(item);

        expect(item.durability).toBe(100);
    });
})