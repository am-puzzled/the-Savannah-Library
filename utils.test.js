
import {describe, it, expect} from "vitest";
import {normalize} from "./utils";

describe("normalize", ()=>{
    it("converts Uppercase letters to Lowercase", ()=>{
        expect(normalize("Maasai Mara")).toBe("maasaimara");
    });
    it("Removes any spaces between the letters", ()=>{
        expect(normalize("Ma asai Ma ra")).toBe("maasaimara");
    });
    it("converts input to string", ()=>{
        expect(normalize(200)).toBe("200");
    });
});