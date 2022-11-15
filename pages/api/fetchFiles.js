import React from 'react'
import { useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

export default function handler(req, res) {

    const fetch = async () => {
        try 
        {
            
            let { data, error, status } = await supabase
                .from('Files')
                .select(`teacher_id ( name ), url, type, on, name`)
                .eq('batch_id', 1234)

                if (error && status !== 406) {
                    throw error
                    res.status(500).send({ error: error.message })
                }
    
                res.status(200).json({ data });
        } 
        catch (error) 
        {
            res.status(500).send({ error: error })
        } 
        finally 
        {
        }
    }

    fetch();
}