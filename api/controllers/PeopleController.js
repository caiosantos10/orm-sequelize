const database = require('../models');

class PeopleController {
    static async getActivePeople(req, res) {
        try {
            const people = await database.People.findAll();
            return res.status(200).json(people);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getAllPeople(req, res) {
        try {
            const people = await database.People.scope('all').findAll();
            return res.status(200).json(people);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getPersonById(req, res) {
        try {
            const { id } = req.params;
            const person = await database.People.findOne({ where: { id: Number(id) } });
            return res.status(200).json(person);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async personRegister(req, res) {
        try {
            const person = req.body;
            const newPerson = await database.People.create(person);
            return res.status(200).json(newPerson);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async updatePerson(req, res) {
        try {
            const { id } = req.params
            const person = req.body;
            await database.People.update(person, {
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).send({ message: "Pessoa atualizada com sucesso" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async deletePerson(req, res) {
        try {
            const { id } = req.params
            await database.People.destroy({ where: { id: Number(id) } });
            return res.status(200).send({ message: "Pessoa removida com sucesso" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async restorePerson(req, res) {
        try {
            const { id } = req.params
            await database.People.restore({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Pessoa restaurada com sucesso' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    // Registration methods
    static async getAllRegistrationsByPerson(req, res) {
        try {
            const { id } = req.params;
            const people = await database.People.findOne({ where: { id: Number(id) } });
            console.log(people)
            const registrations = await people.getEnrolledClasses();
            res.status(200).json(registrations);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async getRegistrationById(req, res) {
        try {
            const { id } = req.params;
            const registration = await database.Registrations.findOne({ where: { id: Number(id) } });
            res.status(200).json(registration);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async createRegistration(req, res) {
        try {
            const { id } = req.params;
            const registration = req.body;;
            const newRegistration = await database.Registrations.create({ ...registration, student_id: Number(id) });
            res.status(200).json(newRegistration);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async updateRegistration(req, res) {
        try {
            const { id } = req.params;
            const newRegistration = req.body
            await database.Registrations.update(newRegistration, { where: { id: Number(id) } });
            const registration = await database.Registrations.findOne({ where: { id: Number(id) } });

            res.status(200).json({ message: 'Matrícula atualizada com sucesso', registration });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async deleteRegistration(req, res) {
        try {
            const { id } = req.params;
            await database.Registrations.destroy({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Matrícula removida com sucesso' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async restoreRegistration(req, res) {
        try {
            const { id } = req.params
            await database.Registrations.restore({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Matrícula restaurada com sucesso' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = PeopleController;