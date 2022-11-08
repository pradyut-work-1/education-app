import { supabase } from "../../utils/supabaseClient";

export default function handler(req, res) {
    const fetch = async (date) => {
        try 
        {
            let { data, error, status } = await supabase
                .from('Schedule')
                .select('info')
                .eq('on', date )

                if (error && status !== 406) {
                    throw error
                }
    
                res.status(200).json({ data });
        } 
        catch (error) 
        {
            res.status(500).send({ error: error.message })
        } 
        finally 
        {
        }
    }
    const { date } = req.query
    fetch(date);
}