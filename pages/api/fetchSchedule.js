import React from 'react'
import { useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

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
                    res.status(500).send({ error: error.message })
                }
    
                res.status(200).json({ data });
            
        } 
        catch (error) 
        {
            res.status(500).send({ error: error.message })
        } 
        finally 
        {
            res.status(200).send('Fetch Completed');
        }
    }
    const { date } = req.query
    fetch(date);
}