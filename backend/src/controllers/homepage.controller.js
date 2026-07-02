// main logic that routes are meant to do is in controller.js:
// for homepage.controller.js


export const homePage= async (req, res) =>{
  
  res.send("welcome to the home page!!");
  res.json(
    {
      message:'Home Page',      
    }
  );
};
