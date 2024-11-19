import jwt from 'jsonwebtoken'




export const verifyToken = (req, res, next) => {

    const token = req.header('authorization')?.replace('Bearer ', '')
  
    if (!token) {
        return res.status(401).json({success: false, message: 'No token provided, authorization denied.' })
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = decoded.id
        req.role = decoded.role
        next()

    } catch (error) {
        // 401 Unauthorized
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({success: false, message: "Expired token."})
        }
        return res.status(401).json({success: false, message: 'Invalid token.' })
    }
  }



