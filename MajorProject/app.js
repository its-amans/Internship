const express=require("express");
const app=express();
const path=require("path");
const Listing=require("./models/listing.js");
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate);

const methodOverride=require("method-override");

app.use(methodOverride("_method"));

const mongoose =require("mongoose");
const { constants } = require("fs/promises");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

main().then((res)=>{
    console.log("Succesful");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/",(req,res)=>{
    res.send("Working Well");
});

// app.get("/testListings",async (req,res)=>{
//     const listingSample= new Listing({
//         title:"Chandigarh Villa",
//         description:"Near the Beach",
//         price:120000000,
//         location:"Gudgaon",
//         country:"India",
//     });

//     await listingSample.save();
//     console.log("Sample was Saved");
//     res.send("Successful Listing");
// });

app.get("/listings",async (req,res)=>{
    let allListings=await Listing.find({});

    // console.log(allListings);
    // res.send("Working Well");
    res.render("listings/index.ejs",{allListings});
});

// create List
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

app.post("/listings",async (req,res,next)=>{

    //1.either this 
    try{
        const newListing=new Listing(req.body.listing);
    
        await newListing.save();
        res.redirect("/listings");
    }
    catch(err){
        next(err);
    }

    //2.oR this one

    // const { title, description, price, location, country } = req.body.listing;
    // const { filename, url } = req.body.listing.image || {}; // avoid crash if image is undefined

    // let newListing= new Listing({
    //     title,
    //     description,
    //     image: {
    //         filename,
    //         url,
    //     },
    //     price,
    //     location,
    //     country,
    // });

    // await newListing.save().then((savedListing) => { console.log(savedListing);})
    // .catch((err)=>{console.log(err)});
    // console.log(newListing);
    // res.redirect("/listings");
});

//show 

app.get("/listings/:id",async (req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    // console.log(listing);
    // res.send("well");
    res.render("listings/show.ejs",{listing});
});

//Update List
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} =req.params;
    const listing=await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit.ejs",{listing});
});

app.put("/listings/:id",async (req,res)=>{
    const {id}=req.params;

    const updateList=req.body.listing;
    const listing=await Listing.findById(id);
    await Listing.findByIdAndUpdate(id,updateList);

    //In place of upper three lines we can directly write.
    //await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    res.redirect(`/listings/${id}`);
});

//Delete List
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    //console.log("Deleting listing:", listing);

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
});

//Hnadling error

app.use((err,req,res,next)=>{
    res.send("Something Went Wrong");
})

app.listen(8080,()=>{
    console.log("Server is Listening to port 8080");
});

