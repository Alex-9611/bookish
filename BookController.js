import { Router } from 'express';
import passport from "passport";
import { queryForRentalList } from './bookishQueries.js';


class BookController {
    constructor() {
        this.router = Router();
        this.router.get('/:userId', passport.authenticate("jwt", { session: false }), this.getBook.bind(this));
        // this.router.post('/', passport.authenticate("jwt", { session: false }) , this.createBook.bind(this));
        // this.router.post('')
    }

    async getBook(request, response, next) {
        const userID = request.params.userId;

        const rentalList = await queryForRentalList(userID);

        console.log(rentalList)
        response.send(rentalList);
    }
}

export default new BookController().router;