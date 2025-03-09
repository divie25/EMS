const Resource = require('../models/Resource');
const User = require('../models/User');
const { sendincidentResourceEmail } = require('../utils/email');


async function getLocationName(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.display_name) {
            console.log(`Location Name: ${data.display_name}`);
            return data.display_name;
        } else {
            console.error('Location not found.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
    }
}

// Example Usage



// Create a new resource
exports.createResource = async (req, res) => {
    try {
        let fdata = req.body
        let locationString = fdata.location;
        if (locationString.includes("Lat")) {
            let [lat, lng] = locationString.split(", ").map(item => parseFloat(item.split(": ")[1]));
            console.log("Latitude:", lat);
            console.log("Longitude:", lng);
            const location = await getLocationName(lat, lng);
            console.log(location);
            fdata.location = location
        }
        const resource = new Resource(fdata);

        await resource.save();


        // sendincidentResourceEmail

        const users=await User.find()
         
        users.map( async(user)=>{
            
            await sendincidentResourceEmail(user.email,resource)

        })




        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all resources
exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getParkAllResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        const parkresources = resources.filter(resorce => resorce.type === req.params.id)
        res.status(200).json(parkresources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a resource by ID
exports.getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a resource by ID
exports.updateResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a resource by ID
exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};