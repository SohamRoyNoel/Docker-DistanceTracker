const Location = require("../models/Location");
const geocoder = require('../utils/geocoder');
const asyncHandler = require("../middleware/async");
const geolib = require('geolib');
const ErrorResponse = require("../utils/errorResponse");

// @desc    Accept default location by ADMIN
// @route   POST /api/v1/location/city/:city [DELHI, IN]
// @access  Private(Admin)
exports.location = asyncHandler(async (req, res, next) => {

    try {
        const { city } = req.params;
        const geoLocation = await geocoder.geocode(city);

        const cityLocation = {
            type: 'Point',
            coordinates: [geoLocation[0].longitude, geoLocation[0].latitude]
        }

        let adminLocationCount = await Location.find();
        if(adminLocationCount.length >= 1){
            return next(new ErrorResponse('One location is allowed at a time. Please reset to add a new one'));
        }    

        await Location.create({ location: cityLocation });

        res.status(201).json({
            success: true,
            status: "Default city created"
        });
    } catch (error) {
        return next(new ErrorResponse('Something went wrong please try again'));
    }
});

// @desc    Get distance by Co-ordinates by USER
// @route   GET /api/v1/location/city/:city 
// @access  Private(Admin, User)
exports.getConfirmationIfInRadius = asyncHandler(async (req, res, next) => {
    
    // Default Location
    try {
        const { city } = req.params;
    
        // User's Location
        const geoLocation = await geocoder.geocode(city);  
        const receivedLat = geoLocation[0].latitude;
        const receivedLng = geoLocation[0].longitude;        

        const defaultLocation = await Location.findOne();
        if(!defaultLocation){
            return next(new ErrorResponse('Default Location is not set, Please contact admin team'));
        }
        const defaultLat = defaultLocation.location.coordinates[1];
        const defaultLng = defaultLocation.location.coordinates[0];  
        
        const d = distanceCalculator(defaultLat,defaultLng,receivedLat,receivedLng);

        // Calculate Distance
        const distance = d < 100 ? "Yes" : "No";
        
        res.status(200).json({
            success: true,
            distance: distance
        }) 
    } catch (error) {
        return next(new ErrorResponse('Something went wrong please try again'));
    }
       
});

function distanceCalculator(rLat, rLon2, dLat1, dLon2){
    const R = 6371e3; // metres
    const φ1 = rLat * Math.PI/180; // φ, λ in radians
    const φ2 = dLat1 * Math.PI/180;
    const Δφ = (dLat1-rLat) * Math.PI/180;
    const Δλ = (dLon2-rLon2) * Math.PI/180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // in metres

    return d / 1000; // in km
}