import { db } from "./connectDb.js"
const coll = db.collection("cars");
const carsArray = (collection) => collection.docs.map(doc => ({id: doc.id, ...doc.data() }))

export async function getCars (req, res) {
    const cars = await coll.get()
    res.send(carsArray(cars))
        .catch(err => {
            res.status(500).send({ success: false, message: err })
            return
                    })
}

export async function addNewCars(req, res) {
    const newCars = req.body
    db.collection('cars').add(newCars)
    .catch(err => {
        res.status(500).send({ success: false, message: err })
        return
    })
    getCars(req, res)
}

export async function updateCarsById (req,res) {
    try {
        const {carsId} = req.params;
        const updatedInfo = req.body;
        await coll.doc(carsId).update(updatedInfo);
        getCars(req, res);
    } catch(err) {
        res.status(500).send(err);
    }
}

