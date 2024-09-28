import { Request, Response, } from "express";
import { prisma } from "../prisma";

class CustomerController {
    async create(req: Request, res: Response) {
        try {
            const { name, email, document } = req.body;

            const customer = await prisma.customer.create({
                data: {
                    name,
                    document,
                    email
                }
            });
            return res.status(201).json(customer);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const { name, email, document } = req.body;

            const customerUpdated = await prisma.customer.update({
                where: { id },
                data: {
                    name,
                    email,
                    document
                }
            });
            return res.status(200).json(customerUpdated);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;

            await prisma.customer.delete({
                where: { id }
            });
            return res.status(204).json();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const customers = await prisma.customer.findMany();
            return res.status(200).json(customers);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const customer = await prisma.customer.findUnique({
                where: { id }
            });
            if (customer == null) {
                return res.status(404).json({ msg: "Not found." });
            }
            return res.status(200).json(customer);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    async verifyIfExist(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const customer = await prisma.customer.findUnique({
                where: { id }
            });
            if (customer == null) {
                return res.status(404).json({ msg: "Not found." });
            }
            return next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}

export { CustomerController };
