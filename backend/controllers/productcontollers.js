const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const Apifeatures= require("../utils/apifeatures");

// --------------- Get All Product -------------

exports.getAllProducts =catchAsyncErrors(async (req,res)=>{
    
    const resultPerPage=8;
    // for Dashboard
    const productCount = await Product.countDocuments();
    
    const apiFeature = new Apifeatures(Product.find(),req.query)
    .search()
    .filter().pagination(resultPerPage);
    const products= await apiFeature.query ;    // for particular keyword
    // const products= await Product.find(); // for all
    
    res.status(200).json({
        success:true,
        products,
        productCount
    });
});

// --------------- Get Product Details -------------

exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product =await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        product
    });
});

// -------------- getAllReviews --------------

exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews,
    });
    
});


// -------------- DeleteReview --------------

exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    const reviews = product.reviews.filter(rev=>rev._id.toString()!= req.query.id.toString());
    let avg=0;
    reviews.forEach(rev=>{
        avg+=rev.rating
    });

    const ratings = avg/reviews.length;

    const numOfReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,
    },{new:true,runValidators:true,useFindAndModify:false})

    res.status(200).json({
        success:true,
    })
});

// -------------- Create New Review or Update the review ------------

exports.createProductReview= catchAsyncErrors(async(req,res,next)=>{

    const {rating,comments,productId} = req.body

    const review = {
        user:req.user.id,
        name:req.user.name,
        rating:Number(rating),
        comments,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user.id.toString());

    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user.id.toString()){
                rev.rating=rating,
                rev.comments=comments
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg=0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating
    });
    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })
});


// *************************** Admin Rights Section ********************

// -------------- Admin: Create Product --------------
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    req.body.user = req.user.id;
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    });
})


// --------------- Admin: Update Product ----------------

exports.updateProduct =catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({
        success:true,
        product
    });
});

// ------------- Admin: deleteProduct ---------------

exports.deleteProduct =catchAsyncErrors(async(req,res,next)=>{
    const product =await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product deleted Successfully"
    })  
});

