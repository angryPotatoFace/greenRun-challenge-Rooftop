import { Request, ResponseToolkit} from '@hapi/hapi'
import { getTransactionsBy } from '../api/transaction';

export const getTransactions = async (req: Request, res: ResponseToolkit) => {

    const user_id = req.query.user_id
    const category = req.query.category

    try{
        return await getTransactionsBy(user_id, category);
    }catch( err) {
        return err;
    }

}