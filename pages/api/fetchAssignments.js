import React from 'react'
import { useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

export default function handler(req, res) {
    
    const { subject } = req.query;

    const subjectArray = subject.split(',');

    const fetch = async () => {
        try 
        {
            
            let { data, error, status } = await supabase
                .from('Assignments')
                .select(`id, by ( Name ), title, description, expiry, subject `)
                .eq('batch', 1234)
                .in('subject', subjectArray)

                if (error && status !== 406) {
                    throw error
                    res.status(500).send({ error: error.message })
                }
    
            if (data) {
                res.status(200).json({ data });
            }
        } 
        catch (error) 
        {
            res.status(500).send({ error: error.message })
        } 
        finally 
        {
        }
    }

    fetch();
}