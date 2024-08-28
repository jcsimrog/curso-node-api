const testAuthLogin = {
    email: "test@test.com",
    password: "12345678",
  };
  
  const testAuthRegister = {
    name: "User test",
    age: 20,
    email: "test@test.com",
    password: "12345678",
  };

  const testAuthRegisterAdmin = {
    name: "User test",
    age: 20,
    email: "test@test.com",
    role: ["admin"],
    password: "12345678",
  };

  const testStorageRegister = {
    url: "http://localhost:3001/node-logo.png",
    filename: "node-logo.png"
  };

  const testDataTrack = {
    name: "La buena",
    album: "El mejor Album",
    cover: "http://jc-rojas.com",
    artist: {
        name: "JUAN",
        nickname: "ROJAS",
        nationality: "MX"
    },
    duration: {
        start: 5,
        end: 7
    },
    mediaId: ""
};
  

  module.exports = {
    testAuthRegister,
    testAuthLogin,
    testAuthRegisterAdmin,
    testStorageRegister,
    testDataTrack
  }