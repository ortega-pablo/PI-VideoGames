const axios = require("axios");
const { Platform } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;




const getPlatforms = async () => {
  
  const apiPlatforms = [
    { name: 'PC' },
    { name: 'PlayStation 5' },
    { name: 'PlayStation 4' },
    { name: 'Xbox One' },   
    { name: 'Xbox Series S/X' },
    { name: 'Nintendo Switch' },
    { name: 'iOS' },        
    { name: 'Android' },    
    { name: 'Nintendo 3DS' },
    { name: 'Nintendo DS' },
    { name: 'Nintendo DSi' },
    { name: 'macOS' },      
    { name: 'Linux' },      
    { name: 'Xbox 360' },   
    { name: 'Xbox' },       
    { name: 'PlayStation 3' },
    { name: 'PlayStation 2' },
    { name: 'PlayStation' },  { name: 'PS Vita' },    
    { name: 'PSP' },        
    { name: 'Wii U' },      
    { name: 'Wii' },        
    { name: 'GameCube' },   
    { name: 'Nintendo 64' },  { name: 'Game Boy Advance' },
    { name: 'Game Boy Color' },
    { name: 'Game Boy' },   
    { name: 'SNES' },       
    { name: 'NES' },        
    { name: 'Classic Macintosh' },
    { name: 'Apple II' },   
    { name: 'Commodore / Amiga' },
    { name: 'Atari 7800' }, 
    { name: 'Atari 5200' }, 
    { name: 'Atari 2600' }, 
    { name: 'Atari Flashback' },
    { name: 'Atari 8-bit' },  { name: 'Atari ST' },   
    { name: 'Atari Lynx' }, 
    { name: 'Atari XEGS' }, 
    { name: 'Genesis' },    
    { name: 'SEGA Saturn' },  { name: 'SEGA CD' },    
    { name: 'SEGA 32X' },   
    { name: 'SEGA Master System' },
    { name: 'Dreamcast' },
    { name: '3DO' },
    { name: 'Jaguar' },
    { name: 'Game Gear' },
    { name: 'Neo Geo' }
  ]

  apiPlatforms.forEach((el) => {
    Platform.findOrCreate({
      where: {
        name: el.name,
      },
    });
  });
 return apiPlatforms;
};

const getDbPlatforms = async () => {
  return await Platform.findAll();
};

module.exports = {
  getPlatforms,
  getDbPlatforms,
};
