

export const register = async (req, res) => {
    // const {email, password, name, role, gender, photo } = req.body

    try {

        res.status(200).json({message: 'You are registered in successefully'})

    } catch (error) {
        res.status(400).json({message: "Something went wrong"})
    }
}

export const login = async (req, res) => {
    try {
        res.status(200).json({message:"You are successfully loged in"})
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})

    }
}