import { supabase } from "../../utils/supabaseClient";

export default function handler1(req, res) {
    // const body = req.body
    const data1 = {
        expiry : '2022-10-17',
        for : 123,
        subject: 1,
        title : 'something',
        description : 'something',
        upload: []
      }

    const fetch = async () => {
        try {
            let { data, error, status } = await supabase
                .from('Assignments')
                .insert([data1])

                if (error && status !== 406) {
                    console.log(error);
                    res.status(500).json({ error: error.message, fetch: false })
                } else {
                    res.status(200).json({ fetch: true })
                }
        }
        catch (error) {
            res.status(500).json({ error: error.message, fetch: false  })
        }
        finally {
            
        }
    }

    const {  } = req.query;

    fetch();
}