import { signInModule } from '../modules/validateSigninModule';

describe("Hàm validateFormData", () => {

    it("UTCID01", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(true);
    });

    it("UTCID02", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền @nh", "036717174a", "quyenanh234@gmail.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(false);
    });

    it("UTCID03", () => {
        const result = signInModule("a", "036717174@", "quyenanh234@gmail.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(false);
    });

    it("UTCID04", () => {
        const result = signInModule("Nguyễn Thế Võ 3 Anh", "03676767676767", "quyenanh234@gmail.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(false);
    });

    it("UTCID05", () => {
        const result = signInModule("Nguyễn ... (>50 ký tự)", "1131131130", "quyenanh234@gmail.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(false);
    });

    it("UTCID06", () => {
        const result = signInModule("Ng", "0367 777777", "quyenanh234@gmail.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(false);
    });

    it("UTCID07", () => {
        const result = signInModule("a4b9C1d7E6fG8hJ2K0lPqR3sT1vU7wZxY5oM2n", "0367171742", "quyenanh234@gmail.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(true);
    });

    it("UTCID08", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "quyen3", "quyen3");
        expect(result).toBe(false);
    });

    it("UTCID09", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "036717174a", "quyenanh234@gmail.com", "quyen3", "quyen3");
        expect(result).toBe(false);
    });

    it("UTCID10", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "03676767676767", "quyenanh234@gmail.com", "quyen3", "quyen3");
        expect(result).toBe(false);
    });

    it("UTCID11", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367 777777", "quyenanh234@gmail.com", "quyen3", "quyen3");
        expect(result).toBe(false);
    });

    it("UTCID12", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "1131131130", "quyenanh234@gmail.com", "quyen3", "quyen3");
        expect(result).toBe(false);
    });

    it("UTCID13", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(false);
    });

    it("UTCID14", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(false);
    });

    it("UTCID15", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenah234@.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(false);
    });

    it("UTCID16", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(true);
    });

    it("UTCID17", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(true);
    });

    it("UTCID18", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(true);
    });

    it("UTCID19", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "quyen3", "quyen3");
        expect(result).toBe(false);
    });

    it("UTCID20", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "036717174a", "quyenanh234@gmail.com", "quyen3", "quyen3");
        expect(result).toBe(false);
    });

    it("UTCID21", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "quyen3", "quyen3");
        expect(result).toBe(false);
    });

    it("UTCID22", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(true);
    });

    it("UTCID23", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "036717174a", "quyenanh234@gmail", "Quyenanh20@4", "Quyenanh20@4");
        expect(result).toBe(false);
    });

    it("UTCID24", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenah234@.com", "quyen3", "quyen3");
        expect(result).toBe(false);
    });

    it("UTCID25", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail", "Anh200@4", "Anh200@4");
        expect(result).toBe(false);
    });

    it("UTCID26", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail", "Quyenanh20@4Zs1dRk3LvU9pTj2XwB8yJc0Fm6AqN7gV5bK0WzI1oS4QhY9tLrJ8mP3VbU2XkLwA1cD6T9sF0N", "Quyenanh20@4Zs1dRk3LvU9pTj2XwB8yJc0Fm6AqN7gV5bK0WzI1oS4QhY9tLrJ8mP3VbU2XkLwA1cD6T9sF0N");
        expect(result).toBe(true);
    });

    it("UTCID27", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "036717174a", "quyenanh234@gmail", "Anh200@4", "Anh200@4");
        expect(result).toBe(false);
    });

    it("UTCID28", () => {
        const result = signInModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail", "Quyenanh2004", "Quyenanh2004");
        expect(result).toBe(false);
    });

});
