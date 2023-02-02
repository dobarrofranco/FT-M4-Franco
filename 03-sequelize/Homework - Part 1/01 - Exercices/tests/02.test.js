const { db, Character } = require("../db");

describe("Ejercicio 2 | Modelos DB", () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  describe("Character", () => {
    test("Debe existir", () => {
      const Character = db.models.Character;
      expect(Character).toBeDefined();
    });

    test("Debe tener las propiedades correctas", () => {
      const character = Character.build({
        code: "1123asfg",
        name: "Franco",
        age: 30,
        hp: 100.0,
        mana: 150.0,
      });
      console.log(character.toJSON());
    });
  });

  afterAll(async () => {
    await db.sync({ force: true });
    db.close();
  });
});
