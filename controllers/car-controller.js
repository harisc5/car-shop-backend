import Car from "../models/Car.js";


export const getCars = async (req, res) => {
    const cars = await Car.find().select('-__v');

    return res.status(200).send(cars);
}

export const createCar = async (req, res) => {
    const car = new Car({ ...req.body, owner: req.user.id });

    try {
        await car.save();
        return res.status(201).send(car);
    } catch (e) {
        return res.status(500).send('Could not save car');
    }
}

export const getCarById = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findById(id);
        if (car) {
            return res.status(200).send(car);
        } else {
            return res.status(404).send('Car not found');
        }
    } catch (e) {
        return res.status(404).send('Incorrect ID');
    }
}

export const updateCar = async (req, res) => {
    const { id } = req.params;

    const result = await Car.findOneAndUpdate({ _id: id, owner: req.user.id }, req.body);

    if (result) {
        return res.status(200).send(req.body);
    } else {
        return res.status(404).send('Car not found');
    }
}

export const deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Car.findOneAndDelete({ _id: id, owner: req.user.id });

        if (result) {
            return res.status(204).send();
        } else {
            return res.status(404).send('Car not found, could not delete');
        }
    } catch (e) {
        res.status(500).send('Could not delete car with id:' + id);
    }
}

export const buyCar = async (req, res) => {
    const { id } = req.params;

    const car = await Car.findById(id);

    if (car.owner !== req.user.id) {
        await Car.findByIdAndUpdate(id, { sold: true });

        res.status(200).send('Car bought successfully');
    } else {
        res.status(403).send('Cannot but your own car');
    }
}