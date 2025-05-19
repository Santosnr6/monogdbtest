import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    year : {
        type : Number,
        required : true,
    },
    category : {
        type : String,
        required : true,
        minlength : 3
    }
}, { timestamps : true });

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;