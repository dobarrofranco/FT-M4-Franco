const { db, Character, Ability, Role } = require("../db");

describe("Ejercicio 2 | Modelos DB", () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  describe("Character", () => {
    test("Debe existir", () => {
      const Character = db.models.Character;
      expect(Character).toBeDefined();
    });

    test("Debe tener las propiedades correctas", async () => {
      const character = await Character.build({
        code: "12345",
        name: "Franco",
        age: 30,
        hp: 100.0,
        mana: 150.0,
      });
      const keys = ['race', 'code', 'name', 'age', 'hp', 'mana'];
      expect(Object.keys(character.toJSON())).toEqual(keys);
    });

    test("La propiedad code no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Character.create({
          age: 25, 
          name: "Dai",
          hp: 128.0,
          mana: 112.0
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    test("La propiedad name no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Character.create({
          age: 25, 
          code: "12345",
          hp: 128.0,
          mana: 112.0
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    test("La propiedad hp no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Character.create({
          age: 25, 
          code: "12345",
          name: "Tincho",
          mana: 112.0
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    test("La propiedad mana no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Character.create({
          age: 25, 
          code: "12345",
          hp: 128.0,
          name: "Nacho"
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });

  describe("Ability", () => {
    test("Debe existir", () => {
      const Ability = db.models.Ability;
      expect(Ability).toBeDefined();
    });

    test("Debe tener las propiedades correctas", async () => {
      const ability = await Ability.build({
        name: "Auri",
        description: "Que buena habilidad",
        mana_cost: 500.99
      })
      const keys = ['id', 'name', 'description', 'mana_cost'];
      console.log(ability.toJSON());
      expect(Object.keys(ability.toJSON())).toEqual(keys);
    });

    test("La propiedad name no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Character.create({
          description: "create ability",
          mana_cost: 133.0
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    test("La propiedad mana_cost no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Character.create({
          description: "create ability",
          name: "power"
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });

  describe("Role", () => {
    test("Debe existir", () => {
      const Role = db.models.Ability;
      expect(Role).toBeDefined();
    });

    test("La propiedad name no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Character.create({
          description: "role"
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })

  afterAll(async () => {
    await db.sync({ force: true });
    db.close();
  });
});
